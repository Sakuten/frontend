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
      <Wrapper>
        <TopTitle>ご案内</TopTitle>
        <EngTopTitle>Introduction</EngTopTitle>
        <div className='columns'>
          <div className='column'>
            <div className='content'>
              <p><strong>抽選申し込みについて</strong>は、立志の28~29ページを参照してください。</p>
              <p><strong>抽選申し込みのタイムテーブル</strong>は、立志の40~41ページを参照してください。</p>
              <p>もし、抽選申し込みシステムに<strong>トラブルが発生した場合</strong>は、<a href='https://twitter.com/sakutendev' target='_blank'>Twitterアカウント</a>でお知らせします。</p>
              <h2>よくある質問</h2>
            </div>
          </div>
        </div>
      </Wrapper>
    )
  }
}
