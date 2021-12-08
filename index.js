const express = require('express')
const { MongoClient } = require('mongodb');

const ObjectId = require('mongodb').ObjectId
const cors = require('cors');
require('dotenv').config()
const app = express()
const port = process.env.PORT || 5000
// middleware 
app.use(cors())
app.use(express.json())


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.hrpwo.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {

    try {
        await client.connect()
        console.log('database connected')
        const database = client.db('BloodBank')
        const donarsCollection = database.collection('donars')
        // get donars 
        app.get('/donars', async (req, res) => {
            const cursor = donarsCollection.find({})
            const donars = await cursor.toArray()
            res.send(donars)

        })
        app.post('/donars', async (req, res) => {
            const donar = req.body;
            const result = await donarsCollection.insertOne(donar);
            res.json(result)
        })
       
    }
    finally {
    }
}
run().catch(console.dir)
app.get('/', (req, res) => {
    res.send('BloodBank is running under server')
})
app.listen(port, () => {
    console.log("server is running on", port)
})