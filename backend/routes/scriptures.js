const express = require('express');
const axios = require('axios');
const router = express.Router();

router.get('/api', async (req, res) => {
  try {
    const API_KEY = process.env.BIBLE_API_KEY;
    const response = await axios.get(`https://api.biblia.com/v1/bible/contents/LEB?key=${API_KEY}`);
    const scriptures = response.data; 
    res.json(scriptures);
  } catch (error) {
    console.error('Error fetching scriptures:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
