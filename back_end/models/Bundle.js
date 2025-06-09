const mongoose = require('mongoose');
const csv = require('csv-parser');
// Bundle Schema

const bundleSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  BundleId: {
    type: Number,
    required: true,
  },
  BundleName: {
    type: String,
    required: true,
  },
  Books: [{
    Bookid: {
      type: String,
      required: true,
    },
    BookName: {
      type: String,
      required: true,
    },
    ispremium: {
      type: Boolean,
      required: true,
    },

  }],
});

module.exports = mongoose.model('Bundles', bundleSchema);