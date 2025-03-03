import { config } from "dotenv"
config();

export default {
  port: process.env.PORT || 4000,
  database_url: process.env.DATABASE_URL || "mongodb://127.0.0.1:27017/tallyinventory",
};