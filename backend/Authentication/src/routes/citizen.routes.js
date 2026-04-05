
const express = require('express');

const router = express.Router();

const CitizenController = require('../controllers/citizen.controller');



router.post('/request-otp', CitizenController.RequestOTP);
router.post('/verify-otp', CitizenController.VerifyOTP);


const verifyToken = require("../middlwares/verifyToken.middleware");

router.put(
  "/profile/edit",
  verifyToken,
  CitizenController.UpdateProfile
);

router.get(
  "/profile",
  verifyToken,
  CitizenController.GetProfile
);

module.exports = router;