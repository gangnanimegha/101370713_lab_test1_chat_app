// models/Message.js

const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    from_user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    to_room: { type: mongoose.Schema.Types.ObjectId, ref: 'Room', required: true },
    message: { type: String, required: true },
    date_sent: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Message', messageSchema);
