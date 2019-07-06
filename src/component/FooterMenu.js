import React from 'react'
import styled from 'styled-components'

const Menu = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  @media (min-width: 1025px) {
    display: none;
  }
  background: #87CEEB;
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 10vh;
  box-shadow: 0 0 10px gray;
`
const Item = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  color: ${props => setProper(props.type, props.page, '#fff', '#000')};
  width: 50%;
  background: ${props => setProper(props.type, props.page, 'linear-gradient(#fff,#87CEEB)', '#fff')};
  ${props => setProper(props.type, props.page, '', 'border: solid 1px #000;')}
`

const Text = styled.p`
  color: ${props => setProper(props.type, props.page, '#fff', '#000')};
  font-size: 2.2rem;
`

const setProper = (type, page, selected, unselected) => {
  let color = unselected
  if (page === 'lottery') {
    color = type === 'lottery' ? selected : unselected
  } else if (page === 'map') {
    color = type === 'map' ? selected : unselected
  }
  return color
}
export default class FooterMenu extends React.Component {
  moveToLottery = () => {
    this.props.router.push('/lottery')
    console.log(this.props.router)
  }
  moveToMap = () => {
    this.props.router.push('/map')
  }
  render () {
    return (
      <Menu>
        <Item onClick={this.moveToLottery} page={this.props.page} type='lottery'>
          <Text page={this.props.page} type='lottery'>
            応募
          </Text>
        </Item>
        <Item onClick={this.moveToMap} page={this.props.page} type='map'>
          <Text page={this.props.page} type='map'>
            マップ
          </Text>
        </Item>
      </Menu>
    )
  }
}
