var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  if(!req.query.token) res.redirect('/')
  else res.send('respond with a resource');
});

router.get('/:id',function (req, res) {
  const id = req.params.id
  if(id == 2) res.end()
  res.json({
    id ,
    name: 'user name',
    age: 2,
    isMarried: false
  })
})



module.exports = router;
