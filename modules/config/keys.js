require('dotenv').config(); 
module.exports = {

    databaseUrl: process.env.DATABASE_URL,
    jwtSecretKey: process.env.JWT_SECRET_KEY
  
  };
  