const express = require('express');
const router = express.Router();

// Dummy route
router.post('/login', (req, res) => {
  res.send({ message: 'Login not implemented yet' });
});

module.exports = router;
