const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = "mongodb+srv://seruji:susgayjojo@cluster0.npqmt4i.mongodb.net/laura?retryWrites=true&w=majority&appName=Cluster0";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    console.log('Attempting to connect to MongoDB...');
    await client.connect();
    console.log('Connected to MongoDB server');
    
    const db = client.db('laura');
    console.log('Accessing database:', db.databaseName);
    
    await db.command({ ping: 1 });
    console.log("Successfully connected to MongoDB!");
    
    // Try to list collections
    const collections = await db.listCollections().toArray();
    console.log('Available collections:', collections.map(c => c.name));
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  } finally {
    await client.close();
  }
}

run(); 