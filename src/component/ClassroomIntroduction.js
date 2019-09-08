import React from 'react'
import styled from 'styled-components'
import introduction from '../introduction.json'
import { Transition } from 'react-transition-group'

const TopTitle = styled.h1`
  text-align: center;
  font-size: 1.7rem;
  margin-top: 20px;
`

const EngTopTitle = styled.h1`
  text-align: center;
  font-size: 0.7rem;
  color: #636e72;
`

const SetClassColor = n => {
  switch (n[1]) {
    case 'A':
      return 'is-link'
    case 'B':
      return 'is-danger'
    case 'C':
      return 'is-success'
    case 'D':
      return 'is-light'
    default:
      return ''
  }
}
const duration = 300

const defaultStyle = {
  transition: `all ${duration}ms ease-out`,
  opacity: 0
}

const transitionStyles = {
  entering: { opacity: 0 },
  entered: { opacity: 1 },
  exiting: { opacity: 0 },
  exited: { opacity: 0 }
}

class IntroCard extends React.Component {
  constructor (props) {
    super(props)
    this.state = {isVisible: false}
  }
  onHeaderClick = () => {
    this.setState({isVisible: true})
  }
  render () {
    const { name } = this.props
    return (
      <div className='column' style={{marginBottom: 5}}>
        <div className='card'>
          <header className='card-header' onClick={this.onHeaderClick}>
            <p className='card-header-title'>
              <span className={'tag ' + SetClassColor(name)}>{name}</span>
              {introduction[name].title}
            </p>
          </header>
          <Transition in={this.state.isVisible} timeout={duration} mountOnEnter>
            {state => (
              <div className='card-content' style={{
                ...defaultStyle,
                ...transitionStyles[state]
              }}>
                <div className='content' style={{whiteSpace: 'pre-line'}}>
                  <p>{introduction[name].body}</p>
                </div>
              </div>
            )}
          </Transition>
        </div>
      </div>
    )
  }
}
const Fifth = () => {
  return (
    <div>
      <IntroCard name='5A' />
      <IntroCard name='5B' />
      <IntroCard name='5C' />
      <IntroCard name='5D' />
    </div>
  )
}

const Sixth = () => {
  return (
    <div>
      <IntroCard name='6A' />
      <IntroCard name='6B' />
      <IntroCard name='6C' />
      <IntroCard name='6D' />
    </div>
  )
}
export default class ClassroomIntroduction extends React.Component {
  constructor (props) {
    super(props)
    this.state = {isActive: 5}
  }
  ListClassName = n => this.state.isActive === n ? 'is-active' : ''
  render () {
    return (
      <div className='container'>
        <TopTitle>団体紹介</TopTitle>
        <EngTopTitle>Introduction</EngTopTitle>
        <p className='has-text-centered'>クリックして詳細を表示できます</p>
        <div className='tabs is-medium is-centered'>
          <ul>
            <li className={this.ListClassName(5)} onClick={() => this.setState({isActive: 5})}><a>5年</a></li>
            <li className={this.ListClassName(6)} onClick={() => this.setState({isActive: 6})}><a>6年</a></li>
          </ul>
        </div>
        <div className='columns'>
          {this.state.isActive === 5 && <Fifth />}
          {this.state.isActive === 6 && <Sixth />}
        </div>
      </div>
    )
  }
}
