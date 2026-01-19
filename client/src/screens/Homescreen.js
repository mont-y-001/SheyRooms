import React, { useState, useEffect } from "react";
import { DatePicker } from "antd";
import 'antd/dist/reset.css';
import moment from "moment";
import axios from "axios";
import Rooms from "../components/Rooms";
import Loader from "../components/Loader";
import Error from "../components/Error";

const { RangePicker } = DatePicker;

const Homescreen = () => {
  const [rooms, setRooms] = useState([]);
  const [error, setError] = useState();
  const [loading, setLoading] = useState();
  const[fromdate,setfromdate] = useState();
  const[todate, settodate] = useState();

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        setLoading(true);
        const response = await axios.get("/api/rooms/getallrooms");
        setRooms(response.data);
        setLoading(false);
      } catch (error) {
        setError(true);
        console.error(error);
        setLoading(false);
      }
    };

    fetchRooms();
  }, []);

  function filterByDate(dates) {
    
    setfromdate(moment(dates[0]).format("DD-MM-YYYY"));
    settodate(moment(dates[1]).format("DD-MM-YYYY"));
  }

  return (
    <div className="container">
      <div className="row mt-5">
        <div className="col-md-3">
          <RangePicker format="DD-MM-YYYY" onChange={filterByDate} />
        </div>
      </div>
      <div className="row justify-content-center mt-5">
        {loading ? (
          <Loader />
        ) : rooms.length > 1 ? (
          rooms.map((room) => (
            <div className="col-md-9 mt-3" key={room._id}>
              <Rooms room={room}  fromdate = {fromdate} todate={todate}/>
            </div>
          ))
        ) : (
          <Error />
        )}
      </div>
    </div>
  );
};

export default Homescreen;
