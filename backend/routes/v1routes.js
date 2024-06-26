const express = require("express");

const {
  addMerchant,
  addPincode,
  mapMerchantEmailToPincodes,
  getMerchantsGivenPincodes,
  getAllPincodes,
  getPincodesGivenMerchantEmail,
  getLatLonForPincode
} = require("../controllers/v1controller");

const router = express.Router();

router.post("/add_merchant", addMerchant);

router.post("/add_pincode", addPincode);

router.post("/map_merchant_to_pincodes", mapMerchantEmailToPincodes);

router.get("/merchants", getMerchantsGivenPincodes);

router.get("/pincodes", getAllPincodes);

router.get("/lat_long", getLatLonForPincode);

module.exports = router;
