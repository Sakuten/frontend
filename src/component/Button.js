import styled from 'styled-components'
import React from 'react'
import {Link} from 'react-router-dom'

const Button = styled.div`
  width: 100%;
  position: relative;
  background-color: #209cee;
  border-color: transparent;
  border-radius: 4px;
`

const ButtonText = styled.div`
  padding: 30px;
  text-align: center;
  color: #fff;
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
