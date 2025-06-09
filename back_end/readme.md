npm install --save-dev nodemon
npm install express mongoose cors
npm install express mongoose body-parser cors nodemon

[
    {
        "id": 1,
        "BundleId": 1,
        "BundleName": "bc",
        "Books": [
            {
                "Bookid": 1,
                "BookName": "abab",
                "ispremium": false,
                "Concurrencylimit": "1/NA"
            }
        ]
    }
],
[
    {
        "id": 1,
        "LicenseId": 1,
        "LicenseName": "bc",
        "isPaid": 1,
        "Books": [
            {
                "Bookid": 1,
                "BookName": "abab",
                "ispremium": false,
                "Concurrency": 1
            }
        ]
    }
]



POST http://localhost:5000/api/bundles
GET http://localhost:5000/api/bundles
POST http://localhost:5000/api/licenses
GET http://localhost:5000/api/licenses


{
    "id": 1,
    "BundleId": 1,
    "BundleName": "bc",
    "Books": [
        {
            "Bookid": 1,
            "BookName": "abab",
            "ispremium": false,
            "Concurrencylimit": "1/NA"
        }
    ]
}

{
    "id": 1,
    "LicenseId": 1,
    "LicenseName": "bc",
    "isPaid": true,
    "Books": [
        {
            "Bookid": 1,
            "BookName": "abab",
            "ispremium": false,
            "Concurrency": 1
        }
    ]
}



git clone https://github.com/your-username/your-repository.git
cd your-repository
git checkout backend
# Edit files (using an editor) code Bundle.js
git add .
git commit -m "Updated config settings in the backend branch"
git push origin backend


// Use this code to create bundle in the db
fs.createReadStream('./Data/MOCK_DATA.csv')
  .pipe(csv())
  .on('data', (row) => {
    // Create the book object
    const book = {
      Bookid: row['Book id'],
      BookName: row['Book name'],
      ispremium: row['is Premium'] === 'TRUE',  // Convert string 'TRUE'/'FALSE' to boolean
    };
    // Check if bundle already exists
    const bundleIndex = bundles.findIndex(bundle => bundle.BundleId === parseInt(row['Bundle id']));
    if (bundleIndex !== -1) {
      // Bundle already exists, push the book to the existing Books array
      bundles[bundleIndex].Books.push(book);
    } else {
      // Create a new bundle with this book
      const newBundle = {
        id: parseInt(row['id']),
        BundleId: row['Bundle id'],
        BundleName: row['Bundle Name'],
        Books: [book],  // Initialize the Books array with the current book
      };
      bundles.push(newBundle);
    }
  })
  .on('end', async () => {
    try {
      // Insert all the bundles into the database
      await Bundle.insertMany(bundles);
      console.log('Bundles imported successfully!');
    } catch (error) {
      console.error('Error importing bundles:', error);
    } finally {
      process.exit();
    }
  });