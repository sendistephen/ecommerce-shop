const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const databaseConnection = require('./config/database');
const errorHandler = require('./middleware/error');

const app = express();

dotenv.config({ path: './config/development.env' });

// database connection
databaseConnection();

// app middleware
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan('dev'));
app.use(cors());

// mount routes
app.use('/api/v1', require('./routes/product'));
app.use('/api/v1', require('./routes/category'));
app.use('/api/v1', require('./routes/owner'));

// error middleware
app.use(errorHandler);

const PORT = process.env.PORT || 8000;

const server = app.listen(PORT, console.log(`Server running on port: ${PORT}`));

// handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`);
  // close server and exit process
  server.close(() => process.exit(1));
});
