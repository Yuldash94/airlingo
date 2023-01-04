import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import { TiHome } from 'react-icons/ti'
import { MdMenuBook } from 'react-icons/md'
import { FaUser } from 'react-icons/fa'
import './Layout.css'

function LayOut() {



  return (
    <div className='app'>
      <div className='app_wrapper'>
        <Outlet/> 
      </div>
      <nav id='navbar'>
          <Link to='/topics'> <TiHome/></Link>
          {/* <Link to='/library'><MdMenuBook/></Link>
          <Link to='/profile'><FaUser/></Link> */}
      </nav>
    </div>
  )
}

export default LayOut