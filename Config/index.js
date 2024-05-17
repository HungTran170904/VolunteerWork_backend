import { config } from 'dotenv'

config({ path: `.env` })
// Server
export const {PORT, HOSTNAME}=process.env;
// Database
export const {DB_URL}=process.env;
// Security
export const {SECRET_KEY,EXPIRATION}=process.env;
// Email
export const {EMAIL_USER, EMAIL_PASS}=process.env;