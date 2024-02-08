const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/user');

router.post('/', async (req, res) => {
    const { username, password } = req.body;
    try {
        // Find the user in the database based on the provided username
        const user = await User.findOne({ username });

        // If user does not exist, send a 404 error response
        if (!user) {
            return res.status(404).send("User not found");
        }

        // Compare the provided password with the hashed password stored in the database
        const isPasswordValid = await bcrypt.compare(password, user.password);

        // If passwords do not match, send a 401 error response
        if (!isPasswordValid) {
            return res.status(401).send("Incorrect password");
        }

        // Password is correct, login successful
        res.send("Login successful");
    } catch (error) {
        // Handle any server errors
        console.error(error);
        res.status(500).send("Server error");
    }
});

module.exports = router;
