export default {
  ENV: process.env.NODE_ENV ?? 'development',
  API_PORT: process.env.PORT ?? 3000,  
  JWT_SECRET: process.env.JWT_SECRET ?? 'JWT_SECRET',
  TOKEN_EXP_TIME: process.env.JWT_SECRET ?? '1d'
};
