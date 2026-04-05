
const AdminController = require('../controllers/admin.contoller');

const express = require('express');

const router = express.Router();


router.post('/login', AdminController.AdminLogin);
router.post('/create-admin', AdminController.CreateAdmin);
const verifyToken = require("../middlwares/verifyToken.middleware");
router.get('/profile/admin', verifyToken, AdminController.GetProfile);

module.exports = router;