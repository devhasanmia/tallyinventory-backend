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
};
