const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
require("dotenv").config();

app.use(cors());
app.use(express.json());

// const uri = "mongodb+srv://coffee_monster:vPfLWQmQfXYV5YrY@cluster0.3h4lqut.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// const uri = "mongodb+srv://<db_username>:<db_password>@cluster0.3h4lqut.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.3h4lqut.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});
async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    //********(2) to post in MongoDB https://www.mongodb.com/docs/atlas/tutorial/insert-data-into-your-cluster/*/
    const coffeesCollection = client.db("coffeeDB").collection("coffees");

    /****(4) get all the coffe orders in db*/
    app.get("/coffees", async (req, res) => {
      // const cursor = coffeesCollection.find()
      // const result = await cursor.toArray();
      // or
      const result = await coffeesCollection.find().toArray();
      res.send(result);
    });

    //******(6) to get 1 specific coffee with id ****/
    app.get("/coffees/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await coffeesCollection.findOne(query);
      res.send(result);
    });

    //****(1) brought it from client react front end, fetch API*****/
    app.post("/coffees", async (req, res) => {
      const newCoffee = req.body;
      console.log(newCoffee);
      //*******(3) insert and view a document, to post in mongoDB*/
      const result = await coffeesCollection.insertOne(newCoffee);
      res.send(result);
    });

    /****(7) for updateCoffee */
    app.put("/coffees/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const options = { upsert: true }; //na dileo hoy
      const updateCoffee = req.body;
      //this is shortcut of updatedDoc
      const updatedDoc = {
        $set: updateCoffee,
      };

      /**
 const updatedDoc={
  $set:{
    name: updatedCoffee.name,
    quantity: updateCoffee.quantity,
    supplier: updateCoffee.supplier,
price: updateCoffee.price,
details: updateCoffee.details,
photo: updatedCoffee.photo
  }
} */
      const result = await coffeesCollection.updateOne(
        filter,
        updatedDoc,
        options
      );
      res.send(result);
    });

    /*********(5) delete coffe order with id from DB****/
    app.delete("/coffees/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await coffeesCollection.deleteOne(query);
      res.send(result);
    });

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

// এই কোডটি Express.js ব্যবহার করে একটি সার্ভার তৈরি করছে।

// app.get('/', ...) অংশটি মূলত রুট ("/") এ কোনো ক্লায়েন্ট (যেমন ব্রাউজার) অনুরোধ করলে "coffee server is getting hotter" পাঠিয়ে দেয়।

// app.listen(port, ...) অংশটি সার্ভারটি নির্দিষ্ট port-এ চালু করে এবং কনসোলে একটি বার্তা দেখায়: "Coffee server is running on port {port}"।

app.get("/", (req, res) => {
  res.send("coffee server is getting hotter");
});

app.listen(port, () => {
  console.log(`Coffee server is running on port ${port}`);
});
