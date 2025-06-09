const licenseService = require('../services/licenseService'); 

exports.createLicense = async (req, res) => {
    const { License_id, License_name, concurrency, books, bundleId,isPaid } = req.body;

    try {
        const license = await licenseService.createLicense(License_id, License_name, concurrency, books, bundleId,isPaid);
        res.status(201).json(license);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
// Get all licenses
exports.getLicenses = async (req, res) => {
    try {
        const licenses = await License.find();
        res.json(licenses);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
