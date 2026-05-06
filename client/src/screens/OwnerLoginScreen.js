import React from 'react'
import { Link } from 'react-router-dom'

export default function OwnerLoginScreen() {
  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-5">
          <div className="bs p-5 border text-center">
            <h1 className="mb-4">Owner Login</h1>
            <p className="text-muted mb-4">Manage your properties and bookings</p>
            <input type="text" className="form-control mb-3" placeholder="Owner ID / Email" />
            <input type="password" className="form-control mb-3" placeholder="Password" />
            <button className="btn btn-dark w-100 py-2 mb-3">Login as Owner</button>
            <div className="d-flex justify-content-between small">
              <Link to="/register" className="text-decoration-none">Register as Owner</Link>
              <Link to="/login" className="text-decoration-none">Guest Login</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
