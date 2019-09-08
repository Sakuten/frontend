import React from 'react'
import styled from 'styled-components'

const TopTitle = styled.h1`
  text-align: center;
  font-size: 1.7rem;
  margin-top: 20px;
`

const EngTopTitle = styled.h1`
  text-align: center;
  font-size: 0.7rem;
  color: #636e72;
  margin-bottom: 20px;
`

const Wrapper = styled.div`
  padding: 1.5rem;
`
export default class Info extends React.Component {
  constructor (props) {
    super(props)
    this.state = {isActive: 5}
  }
  ListClassName = n => this.state.isActive === n ? 'is-active' : ''
  render () {
    return (
      <div className='container'>
        <TopTitle>ご案内</TopTitle>
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
