import styled from 'styled-components'
import React from 'react'

import FullWidth from '../util/fullwidth'
import Button from './Button'

import logo from '../header_2019.png'

const Heading = styled.header`
  width: 100%;
  color: #000;
  z-index: 1;
  font-size: 2rem;
  font-family: 'Roboto Condensed';
`

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100vh - ${props => props.theme.header_height * 2}rem);
`

const Home = ({isUsedByStaff}) => (
  <FullWidth>
    <Heading><img src={logo} /></Heading>
    <Container>
      <Button to={{pathname: '/lottery/login', search: isUsedByStaff && '?staff'}} data-test='home-login'>
        <h3>QRコード読み取り</h3>
        <p>(カメラが起動します)</p>
      </Button>
    </Container>
  </FullWidth>
)

export default Home
