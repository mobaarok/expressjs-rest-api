const Contact = require('../models/Contact')

// additional funciton
const errorResponse = (err, res) => {
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

// Controller
const getAllContact = (req, res, next) => {
    Contact.find()
        .then(contacts => successResponse(res, contacts, 200, "All Contact List!"))
        .catch(err => errorResponse(err, res))
}

const storeContact = (req, res, next) => {
    const contact = new Contact({
        name: req.body.name,
        phone: req.body.phone,
        email: req.body.email
    })
    contact.save()
        .then(data => successResponse(res, data, 201, "Contact Added!"))
        .catch(err => errorResponse(err, res))
}

const getSingleContact = (req, res, next) => {
    let id = req.params.id
    Contact.findById(id)
        .then(contact => successResponse(res, contact, 200, "Get Single Contact!"))
        .catch(err => errorResponse(err, res))
}

const updateContact = (req, res, next) => {
    let id = req.params.id
    let updatedContact = {
        name: req.body.name,
        phone: req.body.phone,
        email: req.body.email
    }
    Contact.findByIdAndUpdate(id, { $set: updatedContact })
        .then(contact => {
            // res new id contact by find the new one
            Contact.findById(contact._id)
                .then(newContact => successResponse(res, newContact, 200, "Updated Successfully!"))
                .catch(err => errorResponse(err, res))
        })
        .catch(err => errorResponse(err, res))
}

const deleteContact = (req, res, next) => {
    let id = req.params.id
    Contact.findByIdAndRemove(id)
        .then(result => successResponse(res, result, 200, "Contact Deleted!"))
        .catch(err => errorResponse(err, res))
}

module.exports = {
    getAllContact,
    storeContact,
    getSingleContact,
    deleteContact,
    updateContact
}