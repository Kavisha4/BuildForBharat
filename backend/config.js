const bigQueryConfig = {
  projectId: "refined-aria-413310",
  datasetName: "bob_the_builder",
};

const tableNameConfig = {
  merchantTableName: "merchants",
  pincodeTableName: "pin_codes_india",
  mapperTableName: "indian_pincode_merchant_map"
};

module.exports = {
    bigQueryConfig,
    tableNameConfig
};
