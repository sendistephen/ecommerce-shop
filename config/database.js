const mongoose = require('mongoose');

const databaseConnection = async () => {
  const connection = await mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  });
  //   connection successfull
  console.log(`MongoDB connected: ${connection.connection.host}`);
};
module.exports = databaseConnection;
