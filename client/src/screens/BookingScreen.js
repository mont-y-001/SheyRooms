import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Loader from "../components/Loader";
import Error from "../components/Error";

const BookingScreen = () => {
  // 👇 get all params from the route
  const { roomid, fromdate, todate } = useParams();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [room, setRoom] = useState();

 

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        setLoading(true);
        const response = await axios.post("/api/rooms/getroombyid", { roomid });
        setRoom(response.data);
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
    <div className="mx-5">
      {loading ? (
        <Loader />
      ) : room ? (
        <div className="container-fluid">
          <div className="row justify-content-center mt-5 bs">
            <div className="col-md-6">
              <h4>{room.name}</h4>
              <img
                className="bigimg"
                alt="booking"
                src={room.imageurls[0]}
                style={{
                  height: "360px",
                  width: "auto",
                  border: "1px solid transparent",
                  borderRadius: "5px",
                }}
              />
            </div>

            {/* Right: Booking Details */}
            <div className="col-md-6">
              <div style={{ textAlign: "right" }}>
                <h4>Booking Details</h4>
                <hr />
                <b>
                  <p>Name: </p>
                  <p>From Date: {fromdate}</p>
                  <p>To Date: {todate}</p>
                  <p>Max Count : {room.maxcount}</p>
                </b>
              </div>

              <div style={{ textAlign: "right" }}>
                <h4>Amount</h4>
                <hr />
                <b>
                  <p>Total days: </p>
                  <p>Rent Per Day: {room.rentperday}</p>
                  <p>Total Amount </p>
                </b>
              </div>

              <div>
                <button className="btn btn-dark" style={{ float: "right" }}>
                  Pay Now
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Error />
      )}
    </div>
  );
};

export default BookingScreen;
