import React from 'react'
import styled from 'styled-components'

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
  height: 50px;
`
const Item = styled.div`
  font-size: 30px;
  color: #fff;
`
const FooterMenu = () => (
  <Menu>
    <Item>応募</Item>
    <Item>マップ</Item>
  </Menu>
)

export default FooterMenu
