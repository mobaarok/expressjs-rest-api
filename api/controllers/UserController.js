const User = require('../models/User')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

// additional funciton
const errorResponse = (res, err) => {
    res.status(500).json({
        message: "Error Occured!",
        error: err
    })
}

const successResponse = (res, data, statusCode, message) => {
    res.status(statusCode).json({
        message,
        data
    })
}

const register = (req, res, next) => {
    let email = req.body.email
    let password = req.body.password

    bcrypt.hash(password, 10, (err, hash) => {
        if (err) {
            res.json({
                error: err
            })
        }
        //if got  hash
        let user = new User({
            email,
            password: hash
        })
        user.save()
            .then(result => successResponse(res, result, 201, "User Created Success!"))
            .catch(err => errorResponse(res, err))
    })
}

const getAllUser = (req, res, next) => {
    User.find()
        .then(user => successResponse(res, user, 200, "All User List!"))
        .catch(err => errorResponse(res, err))
}

const login = (req, res, next) => {
    let email = req.body.email
    let password = req.body.password
    User.findOne({ email })
        .then(user => {
            if (user) {
                //if  user have
                bcrypt.compare(password, user.password, (err, result) => {
                    if (err) {
                        errorResponse(res, err)
                    }
                    if (result == true) {
                        //create token
                        let token = jwt.sign({ email: user.email, _id: user._id }, "SECRET", { expiresIn: '2h' })
                        res.json({
                            message: "login success",
                            token
                        })
                    } else {
                        res.json({
                            message: "login faild, password does'nt match"
                        })
                    }
                })
            } else {
                res.json({
                    message: "email not found"
                })
            }
        })
        .catch(err => errorResponse(res, err))
}

module.exports = {
    register,
    login,
    getAllUser
}