const express = require("express");
const cors = require("cors");
const v1routes = require("./routes/v1routes");

const app = express();
app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());
app.use("/v1", v1routes);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`The app is running on port ${PORT}`);
});
