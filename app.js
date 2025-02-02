require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const path = require('path');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const app = express();
const { homePage } = require('./controller/authController');
const apiRouter = require('./routes/apiRoutes');
const authRouter = require('./routes/authRoutes');
const adminRouter = require('./routes/adminRoutes');
const userRouter = require('./routes/userRoutes');

//Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(morgan('dev'));
// app.set('view engine', 'pug');
app.use(cookieParser());
app.use(
  cors({
    origin: 'http://127.0.0.1:3000',
    credentials: true,
  })
);

//connect to DB
const databaseString = process.env.DATABASE_HOST.replace(
  '<db_password>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(databaseString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Database connected successfully'))
  .catch((err) => console.log('error occured while DB connection', err));

//Routes
app.get('/', homePage);
app.use('/api', apiRouter);
app.use('/auth', authRouter);
app.use('/admin', adminRouter);
app.use('/user', userRouter);

//server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`server is running on the port ${port}`);
});
