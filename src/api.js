const express = require('express');
const app = express();
require('dotenv').config();
const mongoose = require('mongoose');
const http = require('http');
const cors = require('cors');
const createError = require('http-errors');
const { AllRouters } = require('./routers/router');

module.exports = class Application {
  constructor() {
    this.configServer();
    this.createServer();
    this.createMongodb();
    this.createRoutes();
    this.errorHandler();
  }

  configServer() {
    const corsOptions = {
      origin: (origin, callback) => {
        if (process.env.NODE_ENV === 'development')
          return callback(null, true);
        const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(',').map(o => o.trim()) || [];
        if (!origin)
          return callback(null, true);
        if (allowedOrigins.includes(origin))
          return callback(null, true);
        return callback(new Error(`Origin ${origin} not allowed by CORS policy`));
      },
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
      allowedHeaders: [
        'Origin',
        'X-Requested-With',
        'Content-Type',
        'Accept',
        'Authorization',
        'Cookie',
        'Access-Control-Allow-Origin'
      ],
      maxAge: 86400
    };
    app.use(cors(corsOptions));
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json({ limit: '1024mb' }));
  }

  createServer() {
    const server = http.createServer(app);
    server.listen(process.env.SERVER_PORT, () => console.log(`☁️  Server Run To PORT : ${process.env.SERVER_PORT} \n`));
  }

  createMongodb() {
    mongoose.connect(process.env.DATABASE_URL_LOCAL, { autoIndex: true, });
    mongoose.set('strictPopulate', true);
    mongoose.set('strictQuery', true);
    mongoose.set('returnDocument', 'after');
    mongoose.connection.on('connected', () => console.log(`✅ Connect To MongoDB`));
    mongoose.connection.on('desconnected', () => console.log(`❌ Desconnect To MongoDB`));
  }

  createRoutes() {
    app.get('/', (req, res) => {
      return res.status(200).json('api')
    });
    app.post('/', (req, res) => {
      return res.status(200).json('api')
    });
    app.use(AllRouters);
  }

  errorHandler() {
    app.use((req, res, next) => {
      next(createError.NotFound('آدرس مورد نظر پیدا نشد'));
    });
    app.use((error, req, res, next) => {
      if (error.code === 'LIMIT_FILE_SIZE')
        return res.status(400).json({ message: 'حجم فایل نباید بیشتر از 3 مگابایت باشد.' });
      const serverError = createError.InternalServerError(error);
      const message = error.message || serverError.message;
      const status = error.status || serverError.status;
      return res.status(status).json({ message: message });
    });
  }
};
