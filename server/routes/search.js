const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('Search API');
});

module.exports = router;
