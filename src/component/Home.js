import styled from 'styled-components'
import React from 'react'

import FullWidth from '../util/fullwidth'
import Button from './Button'

import cloud from '../cloud.svg'
import headerImg from '../header_2019.png'
import sousaku from '../sousaku.svg'

const UpperHeading = styled.div`
  position: relative;
  height: ${props => props.theme.header_height}rem;
  background-color: ${props => props.theme.header_color_upper};
  color: white;
`

const LowerHeading = styled.div`
  position: relative;
  height: ${props => props.theme.header_height}rem;
  background-color: ${props => props.theme.header_color_lower};
  color: white;
`

const Title = styled.img`
  position: absolute;
  right: 5%;
  bottom: 20%;
  z-index: 10;

  height: ${props => props.theme.header_height - 2.5}rem;
`

const SubTitle = styled.img`
  position: absolute;
  right: 30%;
  bottom: 20%;

  height: ${props => props.theme.header_height - 2.5}rem;
`

const Cloud = styled.div`
  position: absolute;
  width: 40vw;
  left: -10%;
  z-index: 20;
  top: -60%;
`

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100vh - ${props => props.theme.header_height * 2}rem);
`

const Home = ({isUsedByStaff}) => (
  <FullWidth>
    <UpperHeading>
      <Title src={headerImg} />
    </UpperHeading>
    <LowerHeading>
      <Cloud>
        <img src={cloud} />
      </Cloud>
      <SubTitle src={sousaku} />
    </LowerHeading>
    <Container>
      <Button to={{pathname: '/lottery/login', search: isUsedByStaff && '?staff'}} data-test='home-login'>
        <h3>QRコード読み取り</h3>
        <p>(カメラが起動します)</p>
      </Button>
    </Container>
  </FullWidth>
)

export default Home
