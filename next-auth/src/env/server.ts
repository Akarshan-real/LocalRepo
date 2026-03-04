const getENV = (key: string): string => {
  const value = process.env[key];

  if (!value) {
    console.log("Something is wrong with env :: ",key);
    return "";
  };

  return value;
};

const env = {
  mongoDbUri: getENV("MONGO_DB_URI"),
  mailTrapApiKey: getENV("MAILTRAP_API_KEY"),
  domain: getENV("DOMAIN"),
  NODEMAILER_USER: getENV("NODEMAILER_USER"),
  NODEMAILER_PASS: getENV("NODEMAILER_PASS"),
  NODEMAILER_PORT: getENV("NODEMAILER_PORT"),
  secretToken : getENV("TOKEN_SECRET")
};

export default env;