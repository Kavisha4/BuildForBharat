const { bigQueryConfig, tableNameConfig } = require("../config");
const { BigQuery } = require("@google-cloud/bigquery");

const bigqueryClient = new BigQuery({ projectId: bigQueryConfig.projectId });
const dataset = bigqueryClient.dataset(bigQueryConfig.datasetName);

const merchantTable = dataset.table(tableNameConfig.merchantTableName);
const pincodeTable = dataset.table(tableNameConfig.pincodeTableName);
const mapTable = dataset.table(tableNameConfig.mapperTableName);

const merchantTableFullName = `${bigQueryConfig.projectId}.${bigQueryConfig.datasetName}.${tableNameConfig.merchantTableName}`;
const pincodeTableFullName = `${bigQueryConfig.projectId}.${bigQueryConfig.datasetName}.${tableNameConfig.pincodeTableName}`;
const mapTableFullName = `${bigQueryConfig.projectId}.${bigQueryConfig.datasetName}.${tableNameConfig.mapperTableName}`;

const addMerchant = async (req, res) => {
  const emailOfMerchantToCreate = req.body.email;
  const searchUserByEmailQuery = `SELECT email FROM \`${merchantTableFullName}\` WHERE email="${emailOfMerchantToCreate}";`;
  merchantTable.query(searchUserByEmailQuery, (err, response) => {
    if (err) {
      console.log({ error: err });
      return res.status(500).send({
        response: `${JSON.stringify(err)}`,
      });
    }
    if (response === null || response.length === 0) {
      // Merchant does not exist so insert merchant into db
      merchantTable.insert(
        { email: emailOfMerchantToCreate },
        function (err, response) {
          if (err) {
            console.log({ error: err });
            return res.status(500).send({
              response: `${JSON.stringify(err)}`,
            });
          }
          return res.status(201).send({
            response: `User with email ${emailOfMerchantToCreate} created successfully`,
          });
        }
      );
    } else {
      return res.status(303).send({
        response: `User with email ${emailOfMerchantToCreate} already exists`,
      });
    }
  });
};

const addPincode = async (req, res) => {
  const pincodeToInsert = req.body.pincode;
  const searchPincodeQuery = `SELECT pin_code FROM \`${pincodeTableFullName}\` WHERE pin_code="${pincodeToInsert}";`;
  pincodeTable.query(searchPincodeQuery, (err, response) => {
    if (err) {
      console.log({ error: err });
      return res.status(500).send({
        response: `${JSON.stringify(err)}`,
      });
    }
    if (response === null || response.length === 0) {
      // Pincode does not exist so insert pincode
      pincodeTable.insert(
        { pin_code: pincodeToInsert },
        function (err, response) {
          if (err) {
            console.log({ error: err });
            return res.status(500).send({
              response: `${JSON.stringify(err)}`,
            });
          }
          return res.status(201).send({
            response: `Pincode ${pincodeToInsert} created successfully`,
          });
        }
      );
    } else {
      return res.status(303).send({
        response: `Pincode ${pincodeToInsert} already exists`,
      });
    }
  });
};

const mapMerchantEmailToPincodes = async (req, res) => {
  const pincodes = req.body.pincodes;
  const merchant_email = req.body.merchant_email;
  const searchMerchantByEmailQuery = `SELECT email FROM \`${merchantTableFullName}\` WHERE email="${merchant_email}";`;
  merchantTable.query(searchMerchantByEmailQuery, (err, response) => {
    if (err) {
      console.log({ error: err });
      return res.status(500).send({
        response: `${JSON.stringify(err)}`,
      });
    }
    if (response === null || response.length === 0) {
      // merchant does not exist in the db
      return res.status(404).send({
        response: `User by email ${merchant_email} doesn't exist`,
      });
    } else {
      if (pincodes === null || pincodes.length === 0) {
        // Pincodes should be a set of non-empty array
        return res.status(400).send({
          response: `Pincodes array empty or null`,
        });
      }
      pincodes.forEach((pincode) => {
        const searchPincodeQuery = `SELECT pin_code FROM \`${pincodeTableFullName}\` WHERE pin_code=${pincode};`;
        pincodeTable.query(searchPincodeQuery, (err, response) => {
          if (err) {
            console.log({ error: err });
            return res.status(500).send({
              response: `${JSON.stringify(err)}`,
            });
          }
          if (response === null || response.length === 0) {
            // Pincode does not exist so can't map
            return res.status(404).send({
              response: `Pincode ${pincodeToInsert} does not exist`,
            });
          }
        });
        const searchPincodeMerchantMapQuery = `SELECT pin_code, email FROM \`${mapTableFullName}\` WHERE pin_code=${pincode} AND email="${merchant_email}";`;
        mapTable.query(searchPincodeMerchantMapQuery, (err, response) => {
          if (err) {
            console.log({ error: err });
            return res.status(500).send({
              response: `${JSON.stringify(err)}`,
            });
          }
          if (response === null || response.length === 0) {
            // Pincode Merchant map does not exist so map them
            mapTable.insert(
              { pin_code: pincode, email: merchant_email },
              function (err, response) {
                if (err) {
                  console.log({ error: err });
                  return res.status(500).send({
                    response: `${JSON.stringify(err)}`,
                  });
                }
              }
            );
          }
        });
      });
      return res.status(201).send({
        response: `All pincodes mapped successfully to merchant ${merchant_email}`,
      });
    }
  });
};

const getMerchantsGivenPincodes = async (req, res) => {
  let pincodes = req.query.pincodes;
  pincodes = pincodes.split(",");
  let sqlQuery = "";
  // pin_code email
  // Given a set of pincodes find the smallest subset of emails which serve all the pincodes
  if (pincodes === null || pincodes.length === 0) {
    return res.status(400).send({
      response: `No pincodes received`,
    });
  }
  pincodes.forEach((pincode, idx) => {
    sqlQuery += `SELECT email FROM \`${mapTableFullName}\` WHERE pin_code=${pincode}`;
    if (idx != pincodes.length - 1) sqlQuery += "\nINTERSECT DISTINCT\n";
  });
  const [rows] = await bigqueryClient.query({
    query: sqlQuery,
    location: "EU",
  });
  let merchant_emails = {
    merchant_emails: [],
  };
  rows.forEach((val, idx) => {
    merchant_emails["merchant_emails"].push(val["email"]);
  });
  return res.status(200).send(merchant_emails);
};

const getAllPincodes = async (req, res) => {
  const getAllPincodesQuery = `SELECT pin_code FROM \`${pincodeTableFullName}\`;`;
  pincodeTable.query(getAllPincodesQuery, (err, response) => {
    if (err) {
      console.log({ error: err });
      return res.status(500).send({
        response: `${JSON.stringify(err)}`,
      });
    }
    if (response && response.length !== 0) {
      pin_code_array = [];
      response.forEach((pincodeJSON) => {
        pin_code_array.push(pincodeJSON.pin_code);
      });
      return res.status(200).send({
        response: pin_code_array,
      });
    } else {
      return res.status(400).send({
        response: `No pincodes found`,
      });
    }
  });
};

const getLatLonForPincode = async (req, res) => {
  const pincode = parseInt(req.query.pincode);
  const getLatLonQuery = `SELECT latitude, longitude FROM \`${pincodeTableFullName}\` WHERE pin_code = ${pincode};`;
  pincodeTable.query(getLatLonQuery, (err, response) => {
    if (err) {
      console.log({ error: err });
      return res.status(500).send({
        response: `${JSON.stringify(err)}`,
      });
    }
    if (response) {
      if (response.length === 0) {
        return res.status(200).send({
          latitude: null,
          longitude: null,
        });
      }
      return res.status(200).send({
        latitude: response[0].latitude,
        longitude: response[0].longitude,
      });
    } else {
      return res.status(400).send({
        response: `Pincode not found`,
      });
    }
  });
};

module.exports = {
  addMerchant,
  addPincode,
  mapMerchantEmailToPincodes,
  getMerchantsGivenPincodes,
  getAllPincodes,
  getLatLonForPincode,
};
