import React, { useState } from 'react';
import { Modal, Button, Carousel } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

const Rooms = React.memo(function Rooms({ room, fromdate, todate }) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const imgSrc = room.imageurls?.[0] || "https://via.placeholder.com/600x400?text=No+Image";

  return (
    <div className="row bs">
      <div className="col-md-4">
        <LazyLoadImage
          src={imgSrc}
          className="smallimg"
          alt={room.name}
          effect="blur"
          width="100%"
          height={240}
        />
      </div>
      <div className='col-md-7'>
        <h1>{room.name}</h1>
        <p>Max Count: {room.maxcount}</p>
        <p>Phone Number: {room.phonenumber}</p>
        <p>Type: {room.type}</p>

        <div className='d-flex justify-content-end mt-2'>
          <button className='btn btn-outline-dark me-2' onClick={handleShow}>
            View Details
          </button>
          {fromdate && todate && (
            <Link className='btn btn-dark' to={`/book/${room.id}/${fromdate}/${todate}`}>
              Book Now
            </Link>
          )}
        </div>
      </div>

      <Modal show={show} onHide={handleClose} size='lg'>
        <Modal.Header closeButton>
          <Modal.Title>{room.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Carousel>
            {room.imageurls?.map((url, index) => {
              return (
                <Carousel.Item key={index}>
                  <LazyLoadImage
                    className='d-block w-100 bigimg'
                    src={url}
                    alt={`${room.name} - ${index + 1}`}
                    effect="blur"
                    width="100%"
                    height={450}
                  />
                </Carousel.Item>
              );
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
  );
});

export default Rooms;