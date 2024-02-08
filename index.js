//Megha Gangnani
//101370713
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('./models/user');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/chat_app', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

// Serve signup.html at the root path
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/signup.html');
});

// Route for user signup
app.post('/signup', async (req, res) => {
    try {
        // Hash the user's password before saving it to the database
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        
        const user = new User({
            username: req.body.username,
            password: hashedPassword
        });
        
        await user.save();
        
        res.send('Signup successful!');
    } catch (error) {
        // Handle errors
        console.error(error);
        res.status(400).send('Error signing up');
    }
});

// Serve login.html at /login path
app.get('/login', (req, res) => {
    res.sendFile(__dirname + '/views/login.html');
});

// Route for user login
app.post('/login', async (req, res) => {
    // Implement login functionality here
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
