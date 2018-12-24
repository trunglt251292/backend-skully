const DB_HOST = 'localhost';
const DB_PORT = '27017';
const DB_NAME = 'skully';
const DB_USER = '';
const DB_PASS = '';


// config postgres
const PG_DB = 'n3';
const PG_HOST= 'localhost';
const PG_USERNAME = 'n3';
const PG_PASSWORD = 'nnn333';
const PG_PORT = 5432;
// config redis
const REDIS_HOST = 'localhost';
const REDIS_PORT = 6379;
const REDIS_PASS = '';
const redisConfig = {
  host: REDIS_HOST,
  port: REDIS_PORT,
  auth: REDIS_PASS
};

export default {
  mongoURL: process.env.MONGO_URL || `mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`,
  pgURL: `postgres://${PG_USERNAME}:${PG_PASSWORD}@${PG_HOST}:${PG_PORT}/${PG_DB}`,
  JWT_SECRET: 'gfgfhfh',

  uploadPath: 'uploads',

  useExpressStatic: true,
  Sequelize : {
    pool: { // If you want to override the options used for the read/write pool you can do so here
      max: 20,
      idle: 30000
    }
  },
  kue: {
    prefix: 'q',
    redis: redisConfig
  },
  kueUI: {
    port: 3055
  },
  projectId:'ancient-sandbox-219904',
  host:'http://localhost:8001'
};
