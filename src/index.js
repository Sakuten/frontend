import { h, app } from "hyperapp"
import {fetch_api} from "./api"

const savedToken = localStorage.getItem('Token')
const state = {
  credentials: {
    password: "",
    username: "",
    token: savedToken || ""
  },
  data: {
    classroom_list: [],
    lottery_list: []
  },
  submission: {
    classroom: "",
    lottery: ""
  }
}

const actions = {
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
    logout: () => (state, actions) => actions.setToken("")
  },
  submission: {
    setClassroom: id => ({classroom: id}),
    setLottery: id => ({lottery: id}),
    apply: () => (state, actions) => {
      fetch_api(`api/lotteries/${state.lottery}`, {
        headers: {
          'Authorization': 'Bearer '+state.token
        }
      })
        .then(response => {
          actions.setLotteryList(response.data.lotteries)
        })
        .catch(console.error)
    }
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
      value={state.credentials.username}
      oninput={e => actions.credentials.setUsername(e.target.value)}
    />
    <input
      autofocus
      placeholder="password"
      value={state.credentials.password}
      oninput={e => actions.credentials.setPassword(e.target.value)}
    />
    <button onclick={actions.credentials.login}>Login</button>
  </div>
)

const loggedinView = (state, actions) => (
  <div>
    <h1>You are {state.credentials.username}</h1>
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
    <button onclick={actions.credentials.logout}>Logout</button>
  </div>
)

const view = (state, actions) => (
  <div>
    {state.credentials.token ? loggedinView : loginView}
  </div>
)

app(state, actions, view, document.body)
