const express = require("express");
const cors = require("cors");
const { BigQuery } = require("@google-cloud/bigquery");

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.get("/", async (req, res) => {
  const bigqueryClient = new BigQuery();

  // The SQL query to run
  const sqlQuery = `SELECT edition, report_type
      FROM \`bigquery-public-data.america_health_rankings.ahr\`
      WHERE edition = @edition`;

  const options = {
    query: sqlQuery,
    // Location must match that of the dataset(s) referenced in the query.
    location: "US",
    params: { edition: 2021 },
  };

  // Run the query
  const [rows] = await bigqueryClient.query(options);

  console.log("Rows:");
  rows.forEach((row) => console.log(row));
  res.send(rows);
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`The app is running on port ${PORT}`);
});
