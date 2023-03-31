const express = require('express');
const { MongoClient } = require('mongodb');

const app = express();
const port = 3000;

// Replace <username>, <password>, and <dbname> with your MongoDB credentials
const uri = 'mongodb+srv://<username>:<password>@<dbname>.mongodb.net/test?retryWrites=true&w=majority';

// Connect to the MongoDB instance
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect();

// Access a specific database and collection
const db = client.db('mydatabase');
const collection = db.collection('mycollection');

// Define a route that retrieves all documents from the collection
app.get('/', async (req, res) => {
  const documents = await collection.find({}).toArray();
  res.send(documents);
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});