const express = require('express');
const Client = require('../Models/Client');
const CliRouter = express.Router();

CliRouter.get('/getAll', async (req, res) => {
    const clients = await Client.find()
    res.status(200).json(clients);
});

CliRouter.post('/createClient', async (req, res) => {
    try {
        const client = new Client({
            clientName: req.body.clientName,
            clientPhone: req.body.clientPhone,
            clientWhatsApp: req.body.clientWhatsApp,
            email: req.body.email,
            address: req.body.address
        });
        res.status(200).json(await client.save());
    }
    catch (err) {
        res.status(400).json({
            message: err.message
        });
    }
});

CliRouter.get('/getClient/:id', async (req, res) => {
    try {
        const data = await Client.findById(req.params.id);
        res.json(data);
    }
    catch (err) {
        res.status(500).json({ message: err.message })
    }
});

CliRouter.put('/updateClient/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const updatedData = req.body;
        const user = await Client.findOneAndUpdate({ _id: id }, req.body);
        const data = await Client.findById(req.params.id);
        res.json(data);
    }
    catch (err) {
        res.status(400).json({ message: err.message })
    }
});


CliRouter.delete('/deleteClient/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const data = await Client.findByIdAndDelete(id)
        console.log(data)
        res.send(`Document with ${data.clientName} has been deleted..`)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
});


module.exports = CliRouter; 