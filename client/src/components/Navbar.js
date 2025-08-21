import React from 'react';

const Navbar = () => {
  return (
    <nav className="navbar bg-body-tertiary">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">SheyRooms</a>
        <ul className="navbar-nav d-flex flex-row ms-auto gap-3">
          <li className="nav-item">
            <a className="nav-link" href="/register">Register</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/login">Login</a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
