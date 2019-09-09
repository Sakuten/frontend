import React from 'react'
import { observer } from 'mobx-react'

const LotteryView = ({list, classroom, onChange}) => (
  <div>
    {
      list.length !== 0
        ? list.filter(c => c.classroom_id === Number(classroom))
          .map(performN => <PerformanceNumber onChange={onChange} performN={performN} key={performN} />)
        : <span data-test='lottery-notfound'>現在応募は受け付けておりません。</span>
    }
  </div>
)

export class PerformanceNumber extends React.Component {
  componentWillMount () {
    this.props.onChange(this.props.performN.id)
    console.log(this.props)
  }
  render () {
    const { performN } = this.props
    return <span data-test='lottery-lottery' key={performN.id} value={performN.id}>第{performN.index + 2}公演</span>
  }
}
export default observer(LotteryView)
