const express = require("express");
const cors = require("cors");
const { BigQuery } = require("@google-cloud/bigquery");
const bigQueryConfig = {
  projectId: "refined-aria-413310",
  datasetName: "bob_the_builder",
};
const tableNameConfig = {
  merchantTableName: "merchants",
};

const app = express();
app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());

app.post("/add_merchant", async (req, res) => {
  const userEmailToCreate = req.body.email;
  const bigqueryClient = new BigQuery({ projectId: bigQueryConfig.projectId });
  const dataset = bigqueryClient.dataset(bigQueryConfig.datasetName);
  const table = dataset.table(tableNameConfig.merchantTableName);
  const searchUserByEmailQuery = "SELECT email FROM `" + `${bigQueryConfig.projectId}` + "." + `${bigQueryConfig.datasetName}` + "." + `${tableNameConfig.merchantTableName}` + "` WHERE email=" + `"${userEmailToCreate}";`;
  table.query(
    searchUserByEmailQuery,
    (err, response) => {
      if (err) {
        console.log({"error": err});
        return res.status(500).send({
          response: `${JSON.stringify(err)}`,
        });
      }
      if (response === null || response.length === 0) {
        // User does not exist so make a new user
        table.insert({ email: userEmailToCreate }, function (err, response) {
          if (err) {
            console.log({"error": err});
            return res.status(500).send({
              response: `${JSON.stringify(err)}`,
            });
          }
          return res.status(201).send({
            response: `User with email ${userEmailToCreate} created successfully`,
          });
        });
      } else {
        return res.status(303).send({
          response: `User with email ${userEmailToCreate} already exists`,
        });
      }
    }
  );
});

app.get("/merchants", async (req, res) => {
  // TODO: change the implementation to accommodate changes
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
