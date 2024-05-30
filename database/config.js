const mongoose = require('mongoose');

const dbConnection = async() => {
  try {
    await mongoose.connect(process.env.DB_CNN);
    const date = new Date();
    console.log('DB Online', date);
  } catch (error) {
    console.log(error);
    throw new Error('Error a la hora de inicar BD ver logs')
  }
}

module.exports = { dbConnection };