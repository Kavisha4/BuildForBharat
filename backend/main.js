const express = require("express");
const cors = require("cors");
const { BigQuery } = require("@google-cloud/bigquery");

const app = express();
app.use(
  cors({
    origin: "*",
  })
);

app.get("/merchants", async (req, res) => {
  let pincodes = req.query.pincodes;
  pincodes = pincodes.split(",");
  const bigqueryClient = new BigQuery();
  let sqlQuery = "";
  for (let idx = 0; idx < pincodes.length; idx++) {
    const val = pincodes[idx];
    const findPincodeIndexSqlQuery =
      `SELECT \`index\` FROM \`refined-aria-413310.bob_the_builder.pin_codes\` WHERE pin_code=` +
      val;
    const [rows] = await bigqueryClient.query({
      query: findPincodeIndexSqlQuery,
      location: "EU",
    });
    if (rows[0] == undefined)
      return res.send({ Error: "Pincode " + val + " not found in db" });
    sqlQuery +=
      `SELECT merchant_index FROM \`refined-aria-413310.bob_the_builder.pinicode_merchant_map\` WHERE pin_code_index=` +
      rows[0]["index"];
    if (idx != pincodes.length - 1) sqlQuery += "\nINTERSECT DISTINCT\n";
  }
  const [rows] = await bigqueryClient.query({
    query: sqlQuery,
    location: "EU",
  });
  let merchant_indexes = {
    merchant_indexes: [],
  };
  rows.forEach((val, idx) => {
    merchant_indexes["merchant_indexes"].push(val["merchant_index"]);
  });
  return res.send(merchant_indexes);
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`The app is running on port ${PORT}`);
});
