import React, { useState, useEffect } from "react";
import axios from "axios";
import Rooms from "../components/Rooms";
import Loader from "../components/Loader";
import Error from "../components/Error";


const Homescreen = () => {
  const [rooms, setRooms] = useState([]);
  const [error, setError] = useState();
  const [loading, setLoading] = useState();


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

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        {loading ? (<Loader />) : rooms.length>1 ?  (rooms.map((room) => {
          return <div className="col-md-9 mt-3">
            <Rooms room={room} />
          </div>
        })
        ) : (
          <Error/>
        )}
      </div>
    </div>
  );
};

export default Homescreen;
