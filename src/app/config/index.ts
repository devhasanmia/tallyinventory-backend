import { config } from "dotenv";
config();

export default {
  port: process.env.PORT || 4000,
  database_url:
    process.env.DATABASE_URL || "mongodb://127.0.0.1:27017/tallyinventory",
  NODE_ENV: "development",
  // Cloudinary API environment
  CLOUD_NAME: process.env.CLOUD_NAME,
  API_KEY: process.env.API_KEY,
  API_SECRET: process.env.API_SECRET,
  // Email Configuration
  EMAIL_HOST: process.env.EMAIL_HOST,
  EMAIL_PORT: process.env.EMAIL_PORT,
  EMAIL_SECURE: process.env.EMAIL_SECURE,
  EMAIL_AUTH_EMAIL: process.env.EMAIL_AUTH_EMAIL,
  EMAIL_AUTH_APP_PASSWORD: process.env.EMAIL_AUTH_APP_PASSWORD,
  SENDER_EMAIL_ADDRESS: process.env.SENDER_EMAIL_ADDRESS,
  // JWT
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN,
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,
  JWT_REFRESH_EXPIRES_IN: process.env.JWT_REFRESH_EXPIRES_IN 
};
