const express = require('express')
const cors = require('cors')
const fs = require('fs'); //fileSystem
const app = express()
const PORT = 3000;
const bodyParser = require("body-parser");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const { MongoClient, ServerApiVersion } = require("mongodb");
const uri =
  "mongodb+srv://bagelnotdoughnut:HE2jkMxSfZ6Ye5yq@austinsfirstcluster.nujtetx.mongodb.net/?retryWrites=true&w=majority&appName=AustinsFirstCluster";
require('dotenv').config()
console.log(process.env.STRIPE_SECRET_KEY)
app.use(express.json())
app.use(cors({
    origin: "*",
    /*methods: [],
    allowedHeaders: []*/
}))
app.use(bodyParser.json());
app.use(bodyParser.raw({ type: "application/json" }));
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

/*async function run() {
    try {
      await client.connect();
      console.log("Connected to MongoDB");
  
      const database = client.db('HospitalInformation');
      const collection = database.collection('patientdata');
  
      app.get('/sessions', async (req, res) => {
        try {
          const data = await collection.find({}).toArray();
          console.log("this is your collection ", data);
          res.json(data);
          
        } catch (error) {
          res.status(500).json({ error: 'Failed to fetch data' });
        }
      });
  
    } catch (error) {
      console.error("Error connecting to MongoDB: ", error);
    }
  }*/
    app.get("/portfoliodata", async(req, res) =>{
        try{
          await client.connect();
      
          let portfoliodb = client.db("portfolio");
          let projectcollection = portfoliodb.collection("software_project");
          let collectedproject = await projectcollection.find({}).toArray();
      
          res.json(collectedproject);
      
        }
        catch(error){
          console.error("Error occurred:", error);
          res.status(500).json({ error: "An error occurred while getting data" });
        }
        finally{
          await client.close();
        }
      })

  
  //run().catch(console.dir);
  
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });

  

/*app.post("/home", async (req, res) => {
     
    
})*/  




