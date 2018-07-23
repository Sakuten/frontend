import React from 'react'
import {Link} from 'react-router-dom'

const Home = () => (
  <p>
    Hello Here is Home
    <Link data-test='home-login' to='/lottery/login'>Login</Link>
  </p>
)

export default Home
