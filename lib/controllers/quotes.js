const { Router } = require('express');
const { Quote } = require('../models/Quote');

module.exports = Router().post('/', async (req, res) => {
  const { detail, character_id, episode_id } = req.body;
  const quote = await Quote.insert({ detail, character_id, episode_id });
  res.send(quote);
});
