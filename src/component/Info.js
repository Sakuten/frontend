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
              <h3>よくある質問</h3>
              <h5>劇の抽選とは何ですか？</h5>
              <p>混雑緩和と熱中症予防のため、創作部門の劇を観覧する際は抽選が必要です。</p>
              <h5>当選者の数は何人ですか？</h5>
              <p>85人です。</p>
              <h5>どのように申し込めばいいですか？</h5>
              <ol>
                <li>1階受付でQRコードを受け取る。</li>
                <li>QRコードを読み取る。</li>
                <li>劇の抽選に申し込む。</li>
              </ol>
              <h5>Web受付と有人受付の違いは何ですか？</h5>
              <h6>Web受付とは</h6>
              <p>お手持ちのQRコードを読み取って開いたWebページから抽選の申し込みをすることができます。</p>
              <h6>有人受付とは</h6>
              <p>スマートフォンをお持ちでない方は、QRコードをもって３階アリーナに行くと係りの生徒が代わりに抽選の申し込みをします。</p>
              <p><strong>※Web受付と有人受付で当選確率は変わりません。</strong></p>
              <p>詳しくは立志の28～29ページ、小立志の4～5ページを参照にしてください。</p>
              <h5>申し込むためには何時に行けばいいですか？</h5>
              <p>抽選申し込みのタイムテーブルは立志の40～41ページ、小立志の16～17ページを参照にしてください。</p>
              <h5>キャンセル待ちとは何ですか？</h5>
              <p>正規当選者とは別に、各公演20名ずつキャンセル待ち当選があります。キャンセル待ち当選者は公演開始5分前になると、定員に満たない人数分だけ先着で入場できます。</p>
              <p>また、正規当選者も５分前になるとキャンセル待ち当選者と同じ扱いとなります。</p>
              <h5>定員割れ制度とは何ですか？</h5>
              <p>抽選応募者数が定員に満たない公演があった場合、その公演に応募していなかった場合でも足りない人数分だけ先着で入場することができます。</p>
            </div>
          </div>
        </div>
      </Wrapper>
    )
  }
}
