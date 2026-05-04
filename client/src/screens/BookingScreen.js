import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import moment from "moment";
import { supabase } from "../supabaseClient";
import Loader from "../components/Loader";
import Error from "../components/Error";

const BookingScreen = () => {
  const { roomid, fromdate, todate } = useParams();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [room, setRoom] = useState();
  const [totalAmount, setTotalAmount] = useState();
  const [totalDays, setTotalDays] = useState();

  const user = JSON.parse(localStorage.getItem("currentUser"));

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('rooms')
          .select('*')
          .eq('id', roomid)
          .single();
        
        if (error) throw error;
        
        setRoom(data);
        
        const totalDaysCount = moment.duration(moment(todate, 'DD-MM-YYYY').diff(moment(fromdate, 'DD-MM-YYYY'))).asDays() + 1;
        setTotalDays(totalDaysCount);
        setTotalAmount(totalDaysCount * data.rentperday);
        
        setLoading(false);
      } catch (err) {
        setError(err.message || "Error fetching room details");
        console.error("Error fetching room:", err);
        setLoading(false);
      }
    };
    fetchRoom();
  }, [roomid, fromdate, todate]);

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
                alt={room.name}
                src={room.imageurls[0]}
                style={{
                  height: "360px",
                  width: "auto",
                  border: "1px solid transparent",
                  borderRadius: "5px",
                }}
              />
            </div>

            <div className="col-md-6">
              <div style={{ textAlign: "right" }}>
                <h4>Booking Details</h4>
                <hr />
                <b>
                  <p>Name: {user ? user.name : 'Guest'}</p>
                  <p>From Date: {fromdate}</p>
                  <p>To Date: {todate}</p>
                  <p>Max Count : {room.maxcount}</p>
                </b>
              </div>

              <div style={{ textAlign: "right" }}>
                <h4>Amount</h4>
                <hr />
                <b>
                  <p>Total days: {totalDays}</p>
                  <p>Rent Per Day: {room.rentperday}</p>
                  <p>Total Amount: {totalAmount}</p>
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
        <Error message={error} />
      )}
    </div>
  );
};

export default BookingScreen;
