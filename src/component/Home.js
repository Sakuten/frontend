import React from 'react'
import {Link} from 'react-router-dom'

const Home = () => (
  <div>
    <p>
      Hello Here is Home
    </p>
    <Link data-test='home-login' to='/lottery/login'>Login</Link>
  </div>
)

export default Home
