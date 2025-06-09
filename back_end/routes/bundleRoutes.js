const express = require('express');
const router = express.Router();
const Bundle = require('../models/Bundle');
const bundleController = require('../Controllers/bundleController');

// Create a new Bundle
// router.post('/',bundleController.createBundle);

// Get all Bundles
router.get('/:bundleName', async (req, res) => {
    try {
        const {bundleName}=req.params;
        const bundle=await Bundle.findOne({BundleName:bundleName});

        console.log("Bundle:", bundle);

        if(!bundle)
            res.status(500).json({ message: err.message });
        if (!bundle.Books || bundle.Books.length === 0) {
            return res.status(404).json({ message: 'No books found in this bundle' });
        }

        console.log("Books:", bundle.Books);

        
        const premiumBooks = bundle.Books.filter((book) => book.ispremium);
        if (premiumBooks.length === 0) {
            return res.status(200).send('No premium books available in this bundle');
          }
     
          res.status(200).json(premiumBooks);
       
    } catch (err) {
        res.status(500).send('Server error');
    }
});

module.exports = router;
