var express = require('express');
const path = require("path");
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express22' });
});

router.get('/cat-image', function (req, res) {
  res.sendFile(path.join(__dirname, './../public/images/img.png'))
})

router.get('/cat-image/download', function (req, res) {
  res.download('./public/images/img.png')
})

module.exports = router;
