const mongoose = require('mongoose');

const databaseConnection = async () => {
  if (process.env.NODE_ENV === 'test') {
    const connection = await mongoose.connect(process.env.MONGODB_TEST_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });

    //   connection successfull
    console.log(`Connected to test database: ${connection.connection.host}`);
  } else {
    const connection = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });

    //   connection successfull
    console.log(
      `Connected to development database: ${connection.connection.host}`,
    );
  }
};
module.exports = databaseConnection;
