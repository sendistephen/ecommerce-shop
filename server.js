const express = require('express');

const app = express();

const PORT = 9900 || process.env.PORT;
app.listen(PORT, (err) => {
  console.log(`Server listening on port ${PORT}`);
});
