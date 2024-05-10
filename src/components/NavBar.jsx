import React from 'react'
import {  Link,NavLink,useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import {logout} from "../store/authSlice"

const NavBar = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const  user = useSelector(store => store.auth.user)
  const handleLogout =()=>{
    if(user){
      axios.post('https://medicalstore.mashupstack.com/api/logout',{},{
        headers:{'Authorization':`Bearer ${user.token}`}
      })
      dispatch(logout())
      navigate('/login')
    }
  }
  return (
    <div>
    <nav className="navbar bg-dark navbar-dark navbar-expand-lg">
      <div className="container-fluid">
        <NavLink to={'/'} className="navbar-brand"><b>MedVault</b></NavLink>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <NavLink to={'/'} className= 'nav-link'>Home</NavLink>
            <NavLink to={'about'} className="nav-link">About</NavLink>
            <NavLink to={'contact'} className="nav-link">Contact</NavLink>
            <NavLink to={'inventory'} className="nav-link">Inventory</NavLink>
            <NavLink to={'create'} className="nav-link">Add Medicine</NavLink>
          </div>
          <div className="navbar-nav ms-auto">
            {user?
            <>
            <NavLink to={'/'} className= 'text-white nav-link disable'>{user.name}</NavLink>
            <Link onClick={handleLogout}  className="nav-link">Logout</Link>
  
            </>
            :
            <>
            <NavLink to={'signup'} className= 'nav-link'>Signup</NavLink>
            <NavLink to={'login'} className="nav-link">Login</NavLink>
            </>
            }
          </div>
        </div>
      </div>
    </nav>
  </div>
  )
}

export default NavBar
