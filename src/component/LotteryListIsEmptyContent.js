import React from 'react'

const LotteryListIsEmptyContent = () => {
  return (
    <div>
      <p>
        応募できる抽選がありません
      </p>
      <p>
        応募受付時間になったら、下のボタンを押して再読み込みしてください
      </p>
      <button onClick={() => window.location.reload()}className='button is-info'>再読み読み</button>
    </div>
  )
}

export default LotteryListIsEmptyContent
