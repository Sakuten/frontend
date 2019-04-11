import React from 'react'
import styled from 'styled-components'
import FontAwesome from 'react-fontawesome'

const Menu = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  @media (min-width: 700px) {
    display: none;
  }
  background: #87CEEB;
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 80px;
  box-shadow: 0 0 10px gray;
`
const Item = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  color: #fff;
  width: 50%;
  background: ${props => setColor(props.type, props.page)};
`
const Icon = styled.div`
  color: #fff;
`
const Text = styled.p`
  color: #fff;
  font-size: 1rem;
`

const setColor = (type, page) => {
  let color = '#78bfdc'
  if (page === 'lottery') {
    color = type === 'lottery' ? '#87CEEB' : '#78bfdc'
  } else if (page === 'map') {
    color = type === 'map' ? '#87CEEB' : '#78bfdc'
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
  isSelected = (type) => {
    const path = this.props.router.location.pathname
    let isSelected = false
    if (type === 'lottery') {
      isSelected = path === '/lottery' | path === '/' | path === '/lottery/login'
    } else if (type === 'map') {
      isSelected = path === '/map'
    }
    return isSelected
  }
  render () {
    return (
      <Menu>
        <Item onClick={this.moveToLottery} isSelected={this.isSelected('lottery')}>
          <Icon>
            <FontAwesome name='poll' size='3x' />
          </Icon>
          <Text>
            応募
          </Text>
        </Item>
        <Item onClick={this.moveToMap} isSelected={this.isSelected('map')}>
          <Icon>
            <FontAwesome name='map' size='3x' />
          </Icon>
          <Text>
            マップ
          </Text>
        </Item>
      </Menu>
    )
  }
}
