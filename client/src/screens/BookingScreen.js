import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from "react-router-dom";

const BookingScreen = () => {
  const { roomid } = useParams();  // ✅ get roomid from URL
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [room, setRoom] = useState();

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        setLoading(true);
        const response = await axios.post("/api/rooms/getroombyid", { roomid }); // ✅ correct
        setRoom(response.data);   // ✅ response.data is actual room object
        setLoading(false);
      } catch (err) {
        setError(true);
        console.error("Error fetching room:", err);
        setLoading(false);
      }
    };
    fetchRoom();
  }, [roomid]);

  return (
    <div className="m-5">
  {loading ? (
    <h1>Loading....</h1>
  ) : error ? (
    <h1>Error....</h1>
  ) : (
    <div className="row justify-content-center mt-5 bs">

      {/* Left: Room Info */}
      <div className="col-md-5">
        <h1 className="mb-3">{room.name}</h1>
        <img
          src={room.imageurls[0]}
          className="bigimg img-fluid rounded"
          style={{ maxHeight: "350px", objectFit: "cover" }}
          alt={room.name}
        />
      </div>

      {/* Right: Booking Details */}
      <div className="col-md-6">

        <div className="mb-4 p-3 border rounded shadow-sm">
          <h2 className="text-end mb-3">Booking Details</h2>
          <hr />
          <b>
            <p className="text-end">Name: </p>
            <p className="text-end">From Date: </p>
            <p className="text-end">To Date: </p>
            <p className="text-end">Max Count : {room.maxcount}</p>
          </b>
        </div>

        <div className="p-3 border rounded shadow-sm mb-3">
          <h2 className="text-end mb-3">Amount</h2>
          <hr />
          <b>
            <p className="text-end">Total days: </p>
            <p className="text-end">Rent Per Day: {room.rentperday}</p>
            <p className="text-end">Total Amount </p>
          </b>
        </div>

        <div className="text-end">
          <button className="btn btn-primary px-4">Pay Now</button>
        </div>

      </div>
    </div>
  )}
</div>

  )
}

export default BookingScreen;
