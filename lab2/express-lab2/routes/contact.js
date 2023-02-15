var express = require('express');
var router = express.Router();

const contactsRepo = require('../src/contactRepo');
const contactsFileRepo = require('../src/contactsFileRepository');

/* GET users listing. */
router.get('/', function(req, res, next) {
  const data = contactsFileRepo.findAll();
  res.render('contact', { title: 'Contact Database' });
});

module.exports = router;
