const express = require('express');
const router = express.Router();
const License = require('../models/License');
const LicenseController = require('../Controllers/licenseController');
// Create a new License
router.post('/createLicense', LicenseController.createLicense);

// Get all Licenses
router.get('/',LicenseController.getLicenses);

module.exports = router;
