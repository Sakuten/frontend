import styled from 'styled-components'
import React from 'react'
import {Link} from 'react-router-dom'
import cloud from '../cloud.svg'

const UpperHeading = styled.div`
  position: relative;
  height: 4rem;
  background-color: #e84393;
  color: white;
`

const LowerHeading = styled.div`
  position: relative;
  height: 4rem;
  background-color: #fd79a8;
  color: white;
`

const BackgroundText = styled.h3`
  position: absolute;
  left: 10%;
  top: 0;

  font-size: 1.5rem;
  color: #dfe6e9;
  margin: 0 20px;
`

const Title = styled.h1`
  position: absolute;
  right: 10%;
  top: 0;

  font-family: serif;
  font-size: 3rem;
  font-weight: 400;
`

const SubTitle = styled.h2`
  position: absolute;
  right: 30%;
  top: 0;

  font-family: serif;
  font-size: 3rem;
  font-weight: 400;
`

const Button = styled.div`
  margin: 0 32px;
  background-color: #00cec9;
`

const ButtonText = styled.div`
  padding: 30px;
  text-align: center;
  color: white;
`

const Cloud = styled.div`
  position: absolute;
  width: 30vw;
  left: -10%;
  top: -50%;
`

const Home = () => (
  <div>
    <UpperHeading>
      <BackgroundText>KOISHIKAWA</BackgroundText>
      <Title>行事週間</Title>
    </UpperHeading>
    <LowerHeading>
      <Cloud>
        <img src={cloud} />
      </Cloud>
      <SubTitle>創作展</SubTitle>
    </LowerHeading>
    <div className='container is-fluid'>
      <Button>
        <Link data-test='home-login' to='/lottery/login'>
          <ButtonText>
            <h3>QRコード読み取り</h3>
            <p>(カメラが起動します)</p>
          </ButtonText>
        </Link>
      </Button>
    </div>
  </div>
)

export default Home
