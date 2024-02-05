const express = require("express");
const cors = require("cors");
const mysql = require("mysql")

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

const db = mysql.createConnection({
  host: "localhost",
  user: 'root',
  password: '',
  database: 'bfb' //tentitively
})

app.get("/", (req, res) => {
  res.send("Backend is here!");
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`The app is running on port ${PORT}`);
});
