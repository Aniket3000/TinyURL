import React, { useContext } from 'react'
import logo from '../img/logo.png'
import { Link } from 'react-router-dom'
import { AuthContext } from '../context/authContext'

function Navbar() {

  const { currentUser, logout } = useContext(AuthContext);

  return (
    <div className='navbar'>
      <div className="container">
        <div className="logo">
          <img src={logo} alt="Not found" />
        </div>
        <div className="links">
          <Link className='link' to='/?cat=aboutUs'>
            <h6>About US</h6>
          </Link>
          <Link className='link' to='/?cat=pricing'>
            <h6>Pricing</h6>
          </Link>
          <span>{currentUser?.name}</span>
          {currentUser ? <span onClick={logout}>Logout</span> : <Link className='link' to='login'>Login</Link>}
        </div>
      </div>
    </div>
  )
}

export default Navbar
