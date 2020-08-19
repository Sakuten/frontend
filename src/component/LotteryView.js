import React from 'react'
import { observer } from 'mobx-react'

const LotteryView = ({list, classroom, onChange}) => (
  <div>
    {
      list.length !== 0
        ? list.filter(c => c.classroom_id === Number(classroom))
          .map(lotteryN => <PerformanceNumber onChange={onChange} lotteryN={lotteryN} key={lotteryN.id} />)
        : <span data-test='lottery-notfound'>現在応募は受け付けておりません。</span>
    }
  </div>
)

export class PerformanceNumber extends React.Component {
  componentWillMount () {
    this.props.onChange(this.props.lotteryN.id)
    console.log(this.props)
  }
  render () {
    const { lotteryN } = this.props
    return <span data-test='lottery-lottery' key={lotteryN.id} value={lotteryN.id}>第{lotteryN.index + 2}公演</span>
  }
}
export default observer(LotteryView)
