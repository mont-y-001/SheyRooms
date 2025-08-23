import React, {useState} from 'react'
import {Modal,Button,Carousel} from 'react-bootstrap'
import { NavLink } from "react-router-dom";

const Rooms = ({ room }) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
    return (
        <div className="row bs">
            <div className="col-md-4">
                <img src={room.imageurls[0]} className='smallimg' />
            </div>
            <div className='col-md-7'>
                <h1>{room.name}</h1>
                <p>Max Count: {room.maxcount}</p>
                <p>Phone Number: {room.phonenumber}</p>
                <p>Type: {room.type}</p>


                <div style={{ float: "right" }}>
                  <NavLink to={`/book/${room._id}`}>
                    <button className='btn btn-primary'>Book Now</button>
                  </NavLink>
                    <button className='btn btn-primary' onClick={handleShow} >View Details</button>
                </div>
            </div>


      <Modal show={show} onHide={handleClose} size='lg'>
        <Modal.Header closeButton>
          <Modal.Title>{room.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>

                <Carousel>
      {room.imageurls.map(url =>{
        return <Carousel.Item>
            <img 
            className='d-block w-100 bigimg' 
            src={url}
         />
        </Carousel.Item>
      })}
    
 </Carousel>
 <p>{room.description}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          
        </Modal.Footer>
      </Modal>

        </div>
        
    )
}

export default Rooms
