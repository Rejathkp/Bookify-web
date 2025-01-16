import React, { useContext } from 'react'
import './navbar.css'
import { Link } from "react-router-dom"
import { AuthContext } from '../../context/AuthContext'
import image from "../../assets/roomify-high-resolution-logo__3_-removebg-preview.png"

function Navbar() {
  const { user } = useContext(AuthContext) 
  return (
    <div className='navbar'>
        <div className="navContainer">
          <Link to="/" style={{color:"inherit", textDecoration: "none"}}>
          <span className="logo">
            <img src={image} alt="Bookify Logo" style={{ height: "150px", marginLeft: "-25px" }} />
          </span>
          </Link>            
            {user ? user.username : ( 
              <div className="navItems">
                  <button className="navButton">Sign In</button>
              </div>
            )}
            {/* {user ? user.username : ""} */}
        </div>

    </div>
  )
}

export default Navbar