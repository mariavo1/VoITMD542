var express = require('express');
var router = express.Router();

const contactsRepo = require('../src/contactRepo');
const contactsFileRepo = require('../src/contactsFileRepository');

/* GET users listing. */
router.get('/', function(req, res, next) {
  const data = contactsFileRepo.findAll();
  res.render('contact', { title: 'Contact Database', contact : data });
});

/* Get Contact_Add */
router.get('/add', function(req, res, next) {
  res.render('contact_add', { title: 'Add a Contact' });
});

module.exports = router;
