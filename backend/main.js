const express = require("express");
const cors = require("cors");

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.get("/", (req, res) => {
  res.send("Backend is here!");
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`The app is running on port ${PORT}`);
});
