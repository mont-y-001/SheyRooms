import React from 'react'
import { Link } from 'react-router-dom'
import { NavDropdown } from 'react-bootstrap'
export default function Navbar() {

  // Getting User From Local Storage
  const user = JSON.parse(localStorage.getItem("currentUser"))

  // Removing User From Local Storage
  const logOut = () => {
    localStorage.removeItem("currentUser");
    window.location.href = "/login"
  }


  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">SheyRooms</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon "><i className="fa fa-bars"></i> </span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0" style={{ marginRight: "8%" }}>
              {/* If User is Available Ternary Operator is used */}
              {user ? (
                <>
                  <div className="dropdown">
                    <button className="btn btn-secondary dropdown-toggle" type='button' id='dropdownMenuButton' data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">{user.name}</button>
                    <div className="dropdown-menu" aria-labelledby='dropdownMenuButton'>
                      <a href="#" className="dropdown-item">Booking</a>
                      <a href="#" className="dropdown-item" onClick={logOut}>Logout</a>
                    </div>
                  </div>
                </>) : (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/register">Register</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/login">Login</Link>
                  </li>


                </>)
              }

            </ul>

          </div>
        </div>
      </nav>





    </>
  )
}