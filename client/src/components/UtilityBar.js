import React from 'react'

export default function UtilityBar() {
  return (
    <div className="utility-bar py-2 text-white">
      <div className="container d-flex justify-content-between align-items-center">
        <div className="d-flex align-items-center">
          <span className="me-4 small d-none d-md-inline">
            <i className="fa fa-phone me-2"></i> +1 800 SHEY ROOMS
          </span>
          <span className="small d-none d-md-inline">
            <i className="fa fa-envelope me-2"></i> support@sheyrooms.com
          </span>
        </div>
        <div className="d-flex align-items-center">
          <div className="dropdown me-3">
            <button className="btn btn-link btn-sm text-white text-decoration-none dropdown-toggle p-0" type="button" data-bs-toggle="dropdown">
              <i className="fa fa-globe me-1"></i> EN
            </button>
            <ul className="dropdown-menu dropdown-menu-dark">
              <li><button className="dropdown-item small">English</button></li>
              <li><button className="dropdown-item small">Español</button></li>
              <li><button className="dropdown-item small">Français</button></li>
            </ul>
          </div>
          <div className="dropdown me-3">
            <button className="btn btn-link btn-sm text-white text-decoration-none dropdown-toggle p-0" type="button" data-bs-toggle="dropdown">
              INR
            </button>
            <ul className="dropdown-menu dropdown-menu-dark">
              <li><button className="dropdown-item small">USD</button></li>
              <li><button className="dropdown-item small">EUR</button></li>
              <li><button className="dropdown-item small">INR</button></li>
            </ul>
          </div>
          <button className="btn btn-link btn-sm text-white text-decoration-none p-0">
            <i className="fa fa-question-circle me-1"></i> Help
          </button>
        </div>
      </div>
    </div>
  )
}
