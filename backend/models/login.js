const mongoose = require('mongoose');

const loginSchema = new mongoose.Schema({
    name: {type: String, require: true},
    password: {type: String, require: true}
});

module.exports = mongoose.model('users', loginSchema);