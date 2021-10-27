const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');
require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;

//middle Wear
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.hiysg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {
    try {
        await client.connect();
        const database = client.db('onlineShop');
        const productsCollection = database.collection('products');
        app.get('/products',async(req,res)=>{
            const cursor =productsCollection.find({})
            const services = await cursor.toArray();
             
            res.send(services);
        })
    }
    finally {
        // await client.close();

    }
}
run().catch(console.dir)

app.get('/', (req, res) => {
    res.send('Runing my Crud Server');
})
app.listen(port, () => {
    console.log('Running Server on Port', port);
})