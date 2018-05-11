'use strict'

import { h, app } from 'hyperapp'
import {fetchApi} from './api'

import loginStyles from './css/login.css'
import dashboardStyles from './css/dashboard.css'
import errorStyles from './css/error.css'

const styles = {
  login: loginStyles,
  dashboard: dashboardStyles,
  error: errorStyles
}

const savedToken = localStorage.getItem('Token')
const state = {
  errors: [],
  data: {
    classroom_list: [],
    lottery_list: []
  },
  submission: {
    credentials: {
      password: '',
      username: '',
      token: savedToken || '',
      status: {}
    },
    classroom: 1,
    lottery: 1
  }
}

const actions = {
  getState: () => state => state,
  logError: error => state => ({ errors: state.errors.concat(error.response ? error.response.data : (error.request ? error.request : error.message))}),
  submission: {
    credentials: {
      setPassword: text => ({ password: text }),
      clearPassword: () => ({ password: '' }),
      setUsername: text => ({ username: text }),
      setToken: text => {
        localStorage.setItem('Token', text)
        return { token: text }
      },
      login: () => (state, actions) =>
        fetchApi('auth/', {
          method: 'post',
          headers: {
            'Content-Type': 'application/json'
          },
          data: {
            password: state.password,
            username: state.username
          }
        }).then(async (response) => {
          const json = response.data
          if ('token' in json) {
            actions.setToken(json.token)
            actions.clearPassword()
            await actions.fetchStatus()
          } else { throw Error('Invalid response returned') }
        }),
      logout: () => (state, actions) => actions.setToken(''),
      setStatus: status => ({status}),
      fetchStatus: () => (state, actions) =>
        fetchApi(`api/status`, {
          method: 'get',
          headers: {
            'Authorization': 'Bearer ' + state.token
          }
        })
          .then(response => {
            actions.setStatus(response.data.status)
          })
    },
    setClassroom: id => ({classroom: id}),
    setLottery: id => ({lottery: id}),
    cancelWithId: (id) => (state, actions) =>
      fetchApi(`api/lotteries/${id}/apply`, {
        method: 'delete',
        headers: {
          'Authorization': 'Bearer ' + state.credentials.token
        }
      })
        .then((/* response */) => {
          actions.credentials.fetchStatus()
        }),
    apply: () => (state, actions) =>
      fetchApi(`api/lotteries/${state.lottery}/apply`, {
        method: 'put',
        headers: {
          'Authorization': 'Bearer ' + state.credentials.token
        }
      })
        .then(async (/* response */) => {
          await actions.credentials.fetchStatus()
        }),
    draw: () => (state, actions) =>
      fetchApi(`api/lotteries/${state.lottery}/draw`, {
        method: 'get',
        headers: {
          'Authorization': 'Bearer ' + state.credentials.token
        }
      })
        .then((response) => {
          alert(response.data.chosen)
        })
  },
  data: {
    setLotteryList: list => ({ lottery_list: list }),
    fetchLotteryList: () => (state, actions) =>
      fetchApi('api/lotteries', {})
        .then(response => {
          actions.setLotteryList(response.data.lotteries)
        }),
    setClassroomList: list => ({ classroom_list: list }),
    fetchClassroomList: () => (state, actions) =>
      fetchApi('api/classrooms', {})
        .then(response => {
          actions.setClassroomList(response.data.classrooms)
        })
  }
}

const LotterySelect = ({classroom}) => (state, actions) => (
  <div class={styles.dashboard.dropwrap}>
    <select name="lotteries"
      class={styles.dashboard.dropdown}
      oninput={e => actions.submission.setLottery(e.target.value)}>
      {
        state.data.lottery_list
          .filter(c => c.classroom_id === Number(classroom))
          .map(c =>
            <option value={c.id}>第{c.index + 1}公演</option>
          )
      }
    </select>
  </div>
)

const loginView = (state, actions) => (
  <div class={styles.login.container}>
    <input
      class={styles.login.text}
      autofocus
      placeholder="username"
      value={state.submission.credentials.username}
      oninput={e => actions.submission.credentials.setUsername(e.target.value)}
    />
    <input
      class={styles.login.text}
      autofocus
      autofocus
      placeholder="password"
      value={state.submission.credentials.password}
      oninput={e => actions.submission.credentials.setPassword(e.target.value)}
    />
    <div class={styles.login.buttonContainer}>
      <button class={styles.login.button} onclick={() => { actions.submission.credentials.login().catch(actions.logError) }}>Login</button>
    </div>
  </div>
)

const ApplicationList = ({list, oncancel}) => (
  <div>
    {
      list ? list.map(c =>
        <div class={styles.dashboard.appcard}>
          {JSON.stringify(c)}
          <button class={styles.dashboard.cancelButton} onclick={() => oncancel(c.lottery_id)}>Cancel</button>
        </div>
      ) : null
    }
  </div>
)

const loggedinView = (state, actions) => (
  <div class={styles.dashboard.container}>
    <h1>Logged in as {state.submission.credentials.status.username}</h1>
    <button class={styles.dashboard.button} onclick={actions.submission.credentials.logout}>Logout</button>
    <h2 class={styles.dashboard.heading}>Apply</h2>
    <div class={styles.dashboard.dropwrap}>
      <select name="classrooms"
        class={styles.dashboard.dropdown}
        value={state.submission.classroom}
        oncreate={() => {
          actions.data.fetchClassroomList().catch(actions.logError)
          actions.data.fetchLotteryList().catch(actions.logError)
        }}
        oninput={e => actions.submission.setClassroom(e.target.value)}>
        {
          state.data.classroom_list.map(c =>
            <option value={c.id}>{c.grade} {c.name}</option>
          )
        }
      </select>
    </div>
    <LotterySelect classroom={state.submission.classroom} />
    <button class={styles.dashboard.button} onclick={actions.submission.apply}>Apply</button>
    <h2 class={styles.dashboard.heading}>Your Applications</h2>
    <ApplicationList list={state.submission.credentials.status.applications} oncancel={actions.submission.cancelWithId} />
  </div>
)

const ErrorView = ({errors}) => (
  <div class={styles.error.container}>
    {
      errors.map(e =>
        <div class={styles.error.card}>{JSON.stringify(e)}</div>
      )
    }
  </div>
)

const view = (state /*, actions */) => (
  <div>
    {state.submission.credentials.token ? loggedinView : loginView}
    <ErrorView errors={state.errors} />
  </div>
)

const main = app(state, actions, view, document.body)

const update = () => {
  const state = main.getState()
  if (state.submission.credentials.token) { main.submission.credentials.fetchStatus().catch(main.logError) }
}
update()
setInterval(update, 10000)
