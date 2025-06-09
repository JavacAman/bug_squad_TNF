const Bundle = require('../models/Bundle');

// Create a new bundle
exports.createBundle = async (req, res) => {
    const { id, bundle_id, isPremium, books } = req.body;

    try {
        const bundle = new Bundle({
            id,
            bundle_id,
            isPremium,
            books
        });

        await bundle.save();
        res.status(201).json(bundle);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


// exports.getBundles = async (req, res) => {
//     try {
//         const bundles = await Bundle.find();
//         res.json(bundles);
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// };


// exports.getBundles = async (req, res) => {
//     try {
//         const {bundleName}=req.params;
//         const bundle=await Bundle.findOne({BundleName:bundleName});
//         if(!bundle)
//             res.status(500).json({ message: err.message });
//         const premiumBooks = bundle.Books.filter((book) => book.ispremium);
//         if (premiumBooks.length === 0) {
//             return res.status(200).send('No premium books available in this bundle');
//           }
     
//           res.status(200).json(premiumBooks);
       
//     } catch (err) {
//         res.status(500).send('Server error');
//     }
// };
 
