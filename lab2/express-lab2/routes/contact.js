var express = require('express');
var router = express.Router();

let data = [{
    
}];

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('contact', { title: 'Contact Database' });
});

module.exports = router;
