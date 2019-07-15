import styled from 'styled-components'
import React from 'react'
import {Link} from 'react-router-dom'

const Button = styled.div`
  width: 100%;
  position: relative;
  border: solid 1px #000;
`

const ButtonText = styled.div`
  padding: 30px;
  text-align: center;
  color: #000;
  font-size: 1.5rem;

  /* To bring text in front of triangle */
  position: relative;
`

export default ({to, children}) => {
  const content = (
    <div>
      <ButtonText data-test='button-text'>
        {children}
      </ButtonText>
    </div>
  )

  return (
    <Button>
      {to ? <Link to={to} data-test='button-link'>{content}</Link> : content}
    </Button>
  )
}
