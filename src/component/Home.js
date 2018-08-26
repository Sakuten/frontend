import React from 'react'
import {Link} from 'react-router-dom'

const Home = () => (
  <div>
    <nav className='level'>
      <div className='level-left'>
        <div className='level-item'>
          KOISHIKAWA
        </div>
      </div>
      <div className='level-right'>
        <div className='level-item'>
          <h1>行事週間</h1>
          <h2>創作展</h2>
        </div>
      </div>
    </nav>
    <Link data-test='home-login' to='/lottery/login'>
      <h3>QRコード読み取り</h3>
      <p>(カメラが起動します)</p>
    </Link>
  </div>
)

export default Home
