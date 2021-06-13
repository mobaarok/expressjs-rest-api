const mongoose = require('mongoose')
const validatorLib = require('validator');
const Schema = mongoose.Schema

const userSchema = new Schema({
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true,
        validate: {
            validator: (v) => {
                return validatorLib.isEmail(v)
            },
            message: `{VALUE} is not an email`
        }
    },
    password: String
})

const User = mongoose.model('User', userSchema)
module.exports = User;