import { h, app } from "hyperapp"
import {fetch_api} from "./api"
import {inspect} from "util"

const api_server = 'localhost:5000'

const savedToken = localStorage.getItem('Token')
const state = {
  credentials: {
    password: "",
    username: "",
    token: savedToken || ""
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
    }
  }
}

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
    <button onclick={() => actions.credentials.login()}>-</button>
  </div>
)

const loggedinView = (state, actions) => (
  <div>
    <h1>Logged in as {state.credentials.username} {state.credentials.token}</h1>
  </div>
)

const view = (state, actions) => (
  <div>
    {state.credentials.token ? loggedinView : loginView}
  </div>
)

app(state, actions, view, document.body)
// actions.login()
