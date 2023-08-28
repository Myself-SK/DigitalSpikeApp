const express = require('express');
const User = require('../Models/User');
const router = express.Router();

router.get('/getAll', async (req, res) => {
    const user = await User.find()
    res.status(200).json(user);
});

router.post('/createAdmin', async (req, res) => {
    const user = User({
        userID: req.body.userID,
        password: req.body.password
    });
    try {
        res.status(200).json(await user.save());
    }
    catch (err) {
        res.status(400).json({
            message: err.message
        });
    }
});



module.exports = router; 