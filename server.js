const express = require("express");
const cors = require("cors");
const app = express();
const dbconfig = require('./db');
const roomsRoute = require("./routes/roomsRoute");
const userRoute = require("./routes/userRoute");

app.use(express.json());

// enable cors
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

app.use('/api/rooms', roomsRoute);
app.use('/api/users', userRoute);

const port = process.env.PORT || 5000;
app.listen(port, () => 
  console.log(`Node server started on port ${port}`)
);
