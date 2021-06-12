const experss = require('express')
const ContactController = require('../controllers/ContactController')
const router = experss.Router()

//Get all contacts
router.get('/contacts', ContactController.getAllContact )
//Store Contact
router.post('/contact', ContactController.storeContact)
//get single contact
router.get('/contact/:id', ContactController.getSingleContact)
//delete contact
router.delete('/contact/:id', ContactController.deleteContact)
//update contact
router.put('/contact/:id', ContactController.updateContact)

module.exports = router