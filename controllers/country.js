const axios = require('axios');
const asyncHandler = require('../middleware/async');

exports.listCountries = asyncHandler(async (req, res) => {
  const response = await axios.get('https://restcountries.eu/rest/v2/all');
  if (!response) {
    res.status(500);
    throw new Error('Something went wrong');
  }
  res.json(response.data);
});
