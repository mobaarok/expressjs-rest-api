const mongoose = require('mongoose');
const validatorLib = require('validator');
const Schema = mongoose.Schema;

const contactSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        minlength: 3
    },
    phone: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    email: {
        type: String
    }
})

const Contact = mongoose.model('Contact', contactSchema)
module.exports = Contact;