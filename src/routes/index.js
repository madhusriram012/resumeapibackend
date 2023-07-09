const express = require('express');
const router = express.Router();

router.get('/', function(req, res, next) {
  res.json({statusCode: 200, message: new Date(), status: 'running' });
});

module.exports = router;
