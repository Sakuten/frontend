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
`
const Item = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  color: #fff;
  width: 50%;
`
const Icon = styled.div`
  color: #fff;
`
const Text = styled.p`
  color: #fff;
  font-size: 20px;
`

export default class FooterMenu extends React.Component {
  moveToLottery = () => {
    this.props.router.push('/')
  }
  moveToMap = () => {
    this.props.router.push('/map')
  }
  render () {
    return (
      <Menu>
        <Item onClick={this.moveToLottery}>
          <Icon>
            <FontAwesome name='poll' size='2x' />
          </Icon>
          <Text>
            応募
          </Text>
        </Item>
        <Item onClick={this.moveToMap}>
          <Icon>
            <FontAwesome name='map' size='2x' />
          </Icon>
          <Text>
            マップ
          </Text>
        </Item>
      </Menu>
    )
  }
}
