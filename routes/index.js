var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Smart Overlay 0.0.1' });
});

module.exports = router;
