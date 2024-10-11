require('dotenv').config();
const cookieParser = require('cookie-parser');
const cors = require('cors');
const express = require('express');
const morgan = require('morgan');
const path = require('path');

const app = express();
const { PORT } = process.env;

const corsConfig = {
  origin: ['http://localhost:5173', process.env.CLIENT_URL],
  credentials: true,
};

const configureApp = () => {
  app.use(cors(corsConfig));
  app.use(cookieParser());
  // app.use(morgan('dev'));
  app.use(express.static(path.join(__dirname, '../..', 'public')));
  app.use(express.static(path.join(__dirname, '../..', 'public', 'dist')));
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  return app;
};

module.exports = {
  configureApp,
  PORT,
};