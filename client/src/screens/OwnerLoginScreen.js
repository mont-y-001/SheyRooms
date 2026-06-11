import React from 'react'
import { Link } from 'react-router-dom'

export default function OwnerLoginScreen() {
  return (
    <div className="page-screen">
      <section className="page-hero text-center">
        <div className="container">
          <h1 className="display-5 fw-bold mb-2">Owner <span className="accent">Portal</span></h1>
          <p className="lead">Manage your properties and track bookings</p>
        </div>
      </section>
      <section className="page-content">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-5">
              <div className="glass-card-static text-center">
                <h3 className="mb-3">Owner Login</h3>
                <p className="text-muted mb-4">Use your StayVerse account to access the owner dashboard</p>
                <input type="text" className="form-control mb-3" placeholder="Owner ID / Email" />
                <input type="password" className="form-control mb-3" placeholder="Password" />
                <Link to="/login" className="btn btn-dark w-100 py-2 mb-3">
                  <i className="fa fa-sign-in me-2"></i> Login as Owner
                </Link>
                <div className="d-flex justify-content-between small">
                  <Link to="/register" className="text-decoration-none">Register as Owner</Link>
                  <Link to="/list-property" className="text-decoration-none">List Your Property</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
