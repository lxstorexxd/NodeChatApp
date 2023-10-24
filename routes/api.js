const express = require('express');
const router = express.Router();

// Define API routes
router.get('/data', (req, res) => {
  // Здесь можно добавить логику для обработки запросов к API
  res.json({ message: 'API data' });
});

module.exports = router;
