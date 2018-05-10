import { h, app } from "hyperapp"
import {fetch_api} from "./api"

const savedToken = localStorage.getItem('Token')
const state = {
  data: {
    classroom_list: [],
    lottery_list: []
  },
  submission: {
    credentials: {
      password: "",
      username: "",
      token: savedToken || "",
      status: {}
    },
    classroom: "",
    lottery: ""
  }
}

const actions = {
  submission: {
    credentials: {
      setPassword: text => ({ password: text }),
      clearPassword: () => ({ password: "" }),
      setUsername: text => ({ username: text }),
      setToken: text => {
        localStorage.setItem('Token', text)
        return { token: text }
      },
      login: () => (state, actions) => {
        fetch_api('auth/', {
            method: 'post',
            headers: {
              'Content-Type': 'application/json',
            },
            data: {
              password: state.password,
              username: state.username
            }
          }).then((response) => {
            const json = response.data
            if('token' in json) {
              actions.setToken(json.token)
              actions.clearPassword()
            } else
              throw Error("Invalid response returned")
          }).catch(resp => {
            console.error(resp)
          })
      },
      logout: () => (state, actions) => actions.setToken(""),
      setStatus: status => ({status}),
      fetchStatus: () => (state, actions) => {
        fetch_api(`api/status`, {
            method: 'get',
            headers: {
              'Authorization': 'Bearer '+state.token
            }
          })
          .then(response => {
            console.log(response.data)
            actions.setStatus(response.data.status)
          })
          .catch(console.error)
      }
    },
    setClassroom: id => ({classroom: id}),
    setLottery: id => ({lottery: id}),
    apply: () => (state, actions) => {
      fetch_api(`api/lotteries/${state.lottery}/apply`, {
          method: 'put',
          headers: {
            'Authorization': 'Bearer '+state.credentials.token
          }
        })
        .then(response => {
          actions.credentials.fetchStatus()
        })
        .catch(console.error)
    },
  },
  data: {
    setLotteryList: list => ({ lottery_list: list }),
    fetchLotteryList: () => (state, actions) => {
      fetch_api('api/lotteries', {})
        .then(response => {
          actions.setLotteryList(response.data.lotteries)
        })
          .catch(console.error)
    },
    setClassroomList: list => ({ classroom_list: list }),
    fetchClassroomList: () => (state, actions) => {
      fetch_api('api/classrooms', {})
        .then(response => {
          actions.setClassroomList(response.data.classrooms)
        })
          .catch(console.error)
    }
  }
}

const LotterySelect = ({classroom}) => (state, actions) => (
  <select name="lotteries" oninput={e => actions.submission.setLottery(e.target.value)}>
    {
      state.data.lottery_list
        .filter(c => c.classroom_id == classroom)
        .map(c =>
          <option value={c.id}>第{c.index+1}公演</option>
        )
    }
  </select>
)

const loginView = (state, actions) => (
  <div>
    <input
      autofocus
      placeholder="username"
      value={state.submission.credentials.username}
      oninput={e => actions.submission.credentials.setUsername(e.target.value)}
    />
    <input
      autofocus
      placeholder="password"
      value={state.submission.credentials.password}
      oninput={e => actions.submission.credentials.setPassword(e.target.value)}
    />
    <button onclick={actions.submission.credentials.login}>Login</button>
  </div>
)

const loggedinView = (state, actions) => (
  <div oncreate={actions.submission.credentials.fetchStatus}>
    <h1>You are {state.submission.credentials.username}</h1>
    <select name="classrooms"
      oncreate={() => {actions.data.fetchClassroomList(); actions.data.fetchLotteryList();}}
      oninput={e => actions.submission.setClassroom(e.target.value)}>
      {
        state.data.classroom_list.map(c =>
          <option value={c.id}>{c.grade} {c.name}</option>
        )
      }
    </select>
    {state.submission.classroom ? <LotterySelect classroom={state.submission.classroom} /> : null}
    {state.submission.lottery ? <button onclick={actions.submission.apply}>Apply</button> : null}
    <button onclick={actions.submission.credentials.logout}>Logout</button>
    {JSON.stringify(state.submission.credentials.status)}
  </div>
)

const view = (state, actions) => (
  <div>
    {state.submission.credentials.token ? loggedinView : loginView}
  </div>
)

app(state, actions, view, document.body)
