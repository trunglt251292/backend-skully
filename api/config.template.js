const DB_HOST = 'localhost';
const DB_PORT = '27017';// port
const DB_NAME = '';// name database
const DB_USER = '';
const DB_PASS = '';

const REDIS_HOST = 'localhost';
const REDIS_PORT = 6379;
const REDIS_PASS = '';
const redisConfig = {
  host: REDIS_HOST,
  port: REDIS_PORT,
  auth: REDIS_PASS
};

const Sequelize = {
  dialect:'postgres',
  port:5432,
  pool: { // If you want to override the options used for the read/write pool you can do so here
    max: 20,
    idle: 30000
  }
};

export default {
  mongoURL: process.env.MONGO_URL || `mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`,

  JWT_SECRET: '',

  uploadPath: '',

  useExpressStatic: true,

  kue: {
    prefix: '',
    redis: redisConfig
  },
  kueUI: {
    port: 3053
  },
  address_contract:'',
  abiSkully:'',
  projectId:'',
  host:''
};
