import React from 'react'
import { inject, observer } from 'mobx-react'
import { Route, Redirect } from 'react-router'
import { withRouter } from 'react-router-dom'
import { loadReCaptcha } from 'react-recaptcha-v3'
import LoginView from './LoginView'
import ApplicationView from './ApplicationView'
import ErrorList from '../component/ErrorList'
import Home from '../component/Home'
import styled from 'styled-components'
import logo from '../header.svg'
import bg from '../sakuten.jpg'

const Background = styled.div`
  background-image: url(${bg});
  background-size: cover;

  width: 100vw;
  height: 100vh;

  position: fixed;
  z-index: -10;
  top: 0;
`

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  min-height: 100vh;

  overflow-x: scroll;
  overflow-y: hidden;
`

const Heading = withRouter(styled.header`
  background-color: ${props => props.theme.header_color_upper};
  width: 100%;
  display: ${props => props.location.pathname === '/' ? 'none' : 'block'};
  color: #000;
  z-index: 1;
  padding: 10px;
  font-size: 2rem;
  font-family: 'Roboto Condensed';
`)

const Outer = styled.div`
  overflow-x: hidden;
  position: relative;
`

@inject('event')
@observer
class App extends React.Component {
  componentDidMount () {
    loadReCaptcha(process.env.REACT_APP_RECAPTCHA_KEY)
  }

  render () {
    const { location } = this.props.store.router
    const {
      onDelete
    } = this.props.event.error

    return (
      <Outer location={location}>
        <Heading><img src={logo} /></Heading>
        <Background />
        <Container>
          <Route exact path='/' render={() => <Home isUsedByStaff={this.props.store.credential.isUsedByStaff} />} />
          <Route path='/lottery/login' render={() => this.props.store.credential.isLoggedIn ? <Redirect to='/lottery' /> : <LoginView credential={this.props.store.credential} />} />
          <Route exact path='/lottery' render={() => this.props.store.credential.isLoggedIn ? <ApplicationView credential={this.props.store.credential} application={this.props.store.application} /> : <Redirect to='/lottery/login' />} />
          <ErrorList list={this.props.store.error.errorList} onDelete={onDelete} />
        </Container>
      </Outer>
    )
  }
}

export default App
