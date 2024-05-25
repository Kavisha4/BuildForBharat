const bigQueryConfig = {
  projectId: "refined-aria-413310",
  datasetName: "bob_the_builder",
};

const tableNameConfig = {
  merchantTableName: "merchants",
  pincodeTableName: "pin_codes_india",
  mapperTableName: "indian_pincode_merchant_map",
  merchantIdPincodeLatLongTableName: "merchantID_pincodes_lat_long_karnataka"
};

module.exports = {
    bigQueryConfig,
    tableNameConfig
};
