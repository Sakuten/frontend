import React from 'react'
import introduction from '../introduction.json'

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
const IntroCard = ({name}) => {
  return (
    <div className='column' style={{marginBottom: 5}}>
      <div className='card'>
        <header className='card-header'>
          <p className='card-header-title'>
            <span className={'tag ' + SetClassColor(name)}>{name}</span> {introduction[name].title}
          </p>
        </header>
        <div className='card-content'>
          <div className='content' style={{whiteSpace: 'pre-line'}}>
            <p>{introduction[name].body}</p>
          </div>
        </div>
      </div>
    </div>
  )
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
