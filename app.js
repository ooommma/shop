require('dotenv').config();

const express = require('express');
const dbConnect = require('./schemas/index');

const app = express();

dbConnect();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const router = require('./routes/products.router');
app.use('/api', router);
// app.use('/api', require('./routes/products.router'));

app.listen(3000, () => {
  console.log('서버 실행 중');
});
