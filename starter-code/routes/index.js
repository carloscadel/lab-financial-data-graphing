var express = require('express');
var router = express.Router();
var axios = require('axios')

const coinApi = axios.create({
  baseURL: 'http://api.coindesk.com/v1/bpi/historical/close.json'
})

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


module.exports = router;
