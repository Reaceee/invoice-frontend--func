import React from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const Navbar = () => {

    const logOut = () => {
        localStorage.removeItem('access')
        localStorage.removeItem('refresh')
        navigate('/')
    }

    const isLoggedIn = localStorage.getItem('access')

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
    <div className="container-fluid">
      <Link className="navbar-brand" to="/">Navbar</Link>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div className="navbar-nav m-auto">
            <Link className={`nav-link ${window.location.pathname === '/' ? 'active' : ''}`} aria-current="page" to="/">Home</Link>
            {
                !isLoggedIn ? (<>
                    <Link className={`nav-link ${window.location.pathname === '/login' ? 'active' : ''}`} to="/login">Login</Link>
                    <Link className={`nav-link ${window.location.pathname === '/register' ? 'active' : ''}`} to="/register">Register</Link>   
                </>) : (<>
                    <Link className="btn btn-danger" onClick={logOut}>
                      Logout
                    </Link>
                </>)
            }
        </div>
      </div>
    </div>
  </nav>
  )
}

export default Navbar
