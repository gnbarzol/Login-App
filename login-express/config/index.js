require('dotenv').config();

const config = {
port: process.env.PORT,
cors: process.env.CORS,
dbPort: process.env.DB_PORT,
dbName: process.env.DB_NAME,
dbUser: process.env.DB_USER,
dbPassword: process.env.DB_PASSWORD,
dbHost: process.env.DB_HOST,
authJwtSecret: process.env.AUTH_JWT_SECRET,
};

module.exports = { config };