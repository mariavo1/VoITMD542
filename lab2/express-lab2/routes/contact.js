var express = require('express');
var router = express.Router();
const contactsFileRepo = require('../src/contactsFileRepository');

/* GET users listing. */
router.get('/', function(req, res, next) {
  const data = contactsFileRepo.findAll();
  res.render('contact', { title: 'Contact Database', contact : data });
});

/* Get Contact_Add */
router.post('/add',
    body('firstName').trim().notEmpty().withMessage('Cannot be empty!'),
    body('lastName').trim().notEmpty().withMessage('Cannot be empty!'),
    body('email').trim().notEmpty().withMessage('Cannot be empty!').isEmail().withMessage('Please enter a valid email'),
    body('notes').trim(),
    function(req, res, next) {

    const result = validationResult(req);
    if (result.isEmpty() != true){
        res.render('contact_add', { title: 'Create a new contact', message: result.array() })
    }
    else{
        contactsFileRepo.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            notes: req.body.notes,
        });

        res.redirect('/contact');
    }
});

module.exports = router;
