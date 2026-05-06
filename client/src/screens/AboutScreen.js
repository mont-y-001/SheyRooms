import React from 'react'

export default function AboutScreen() {
  return (
    <div className="container py-5">
      <div className="bs p-5 text-center">
        <h1 className="mb-4">About SHEYROOMS</h1>
        <p className="lead text-muted">
          Welcome to SheyRooms, your ultimate destination for luxury and comfort. 
          We provide a seamless booking experience for the world's most premium hotels and villas.
        </p>
        <div className="row mt-5">
          <div className="col-md-4">
            <i className="fa fa-shield-alt h1 text-primary mb-3"></i>
            <h4>Secure Booking</h4>
            <p className="small">Your transactions are protected by industry-leading security.</p>
          </div>
          <div className="col-md-4">
            <i className="fa fa-headset h1 text-primary mb-3"></i>
            <h4>24/7 Support</h4>
            <p className="small">Our team is always here to help you with your stay.</p>
          </div>
          <div className="col-md-4">
            <i className="fa fa-gem h1 text-primary mb-3"></i>
            <h4>Best Prices</h4>
            <p className="small">We guarantee the best rates for all our properties.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
