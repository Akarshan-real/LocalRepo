const env = {
  mongoDbUri: String(process.env.MONGO_DB_URI),
  mailTrapApiKey: String(process.env.MAILTRAP_API_KEY),
  domain: String(process.env.DOMAIN),
  NODEMAILER_USER : String(process.env.NODEMAILER_USER),
  NODEMAILER_PASS : String(process.env.NODEMAILER_PASS),
  NODEMAILER_PORT : String(process.env.NODEMAILER_POR)
}

export default env;