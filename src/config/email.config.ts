export const emailConfig = () => ({
  emailConfig: {
    host: process.env.EMAIL_HOST,
    port: parseInt(process.env.EMAIL_PORT),
    username: process.env.EMAIL_USERNAME,
    password: process.env.EMAIL_PASSWORD,
  },
});
