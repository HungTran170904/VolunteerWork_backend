import { config } from 'dotenv'

config({ path: `.env` })
// Server
export const {PORT, HOSTNAME}=process.env;
// Database
export const {DB_URL}=process.env;
// Security
export const {SECRET_KEY, SALT_ROUNDS}=process.env;
