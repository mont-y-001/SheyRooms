import React, { useState, useEffect } from "react";
import { DatePicker } from "antd";
import 'antd/dist/reset.css';
import moment from "moment";
import { supabase } from "../supabaseClient";
import Rooms from "../components/Rooms";
import Loader from "../components/Loader";
import Error from "../components/Error";

const { RangePicker } = DatePicker;

const Homescreen = () => {
  const [rooms, setRooms] = useState([]);
  const [error, setError] = useState();
  const [loading, setLoading] = useState(true);
  const [fromdate, setfromdate] = useState();
  const [todate, settodate] = useState();

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase.from('rooms').select('*');
        if (error) throw error;
        setRooms(data);
        setLoading(false);
      } catch (error) {
        setError(error.message || "Failed to fetch rooms");
        console.error(error);
        setLoading(false);
      }
    };

    fetchRooms();
  }, []);

  function filterByDate(dates) {
    if (dates) {
      setfromdate(moment(dates[0].toDate()).format("DD-MM-YYYY"));
      settodate(moment(dates[1].toDate()).format("DD-MM-YYYY"));
    } else {
      setfromdate(null);
      settodate(null);
    }
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
        ) : rooms.length > 0 ? (
          rooms.map((room) => (
            <div className="col-md-9 mt-3" key={room.id}>
              <Rooms room={room} fromdate={fromdate} todate={todate} />
            </div>
          ))
        ) : (
          <Error message={error || "No rooms found"} />
        )}
      </div>
    </div>
  );
};

export default Homescreen;
