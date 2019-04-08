import React from 'react'
import styled from 'styled-components'
import oneFloorImage from '../S6.1.png'
import twoFloorImage from '../S8.2.png'
import threeFloorImage from '../S10.3.png'
import fourFloorImage from '../S12.4.png'

const Container = styled.div`
  background-color: rgb(241,156,187);
  width: 80vw;
  height: 70%;
  padding: 30px;
  margin-top: 20px;
`
const Title = styled.h1`
  font-size: 2rem;
  color: #000;
  margin: 20px 0;
`
const FloorTitle = styled.h2`
  font-size: 1.5rem;
  color: #000;
  margin: 20px 0;
`
const MapImage = styled.img`
  width: 70vw;
  max-width: 500px;
`
const Map = () => (
  <Container>
    <Title>校内地図</Title>
    <FloorTitle>一階</FloorTitle>
    <MapImage src={oneFloorImage} />
    <FloorTitle>二階</FloorTitle>
    <MapImage src={twoFloorImage} />
    <FloorTitle>三階</FloorTitle>
    <MapImage src={threeFloorImage} />
    <FloorTitle>四階</FloorTitle>
    <MapImage src={fourFloorImage} />
  </Container>)

export default Map
