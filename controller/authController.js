const User = require('../models/userModel');
const path = require('path');
const jwt = require('jsonwebtoken');
const twilio = require('twilio');
const validator = require('validator');

exports.homePage = (req, res) => {
  res.status(200).sendFile(path.join(__dirname, '../public/home.html'));
};

const createJwtToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

exports.getSignUpForm = (req, res) => {
  try {
    res
      .status(200)
      .sendFile(path.join(__dirname, '../public/html/createUser.html'));
  } catch (error) {
    console.log(error);
  }
};

exports.createUser = async (req, res) => {
  try {
    await User.create(req.body);

    // res.cookie('jwt', createJwtToken(user._id), {
    //   expires: new Date(
    //     Date.now() + process.env.JWT_COOKIE_EXP * 24 * 60 * 60 * 1000
    //   ),
    //   // secure: true,
    //   httpOnly: true,
    // });

    res.status(200).send('success');
  } catch (error) {
    console.log(error);
  }
};

exports.getLoginForm = (req, res) => {
  try {
    res.status(200).sendFile(path.join(__dirname, '../public/html/login.html'));
  } catch (error) {
    console.log(error);
  }
};

exports.login = async (req, res) => {
  try {
    const user = await User.findOne({
      $or: [
        { email: req.body.emailOrMobile },
        { mobile: req.body.emailOrMobile },
      ],
    });

    if (
      !user ||
      !(await user.isPasswordValid(req.body.password, user.password))
    ) {
      throw 'User not found or Password wrong';
    }

    res.cookie('jwt', createJwtToken(user._id), {
      expires: new Date(
        Date.now() + process.env.JWT_COOKIE_EXP * 24 * 60 * 60 * 1000
      ),
      // secure: true,
      httpOnly: true,
    });
    res.status(200).json({
      userRole: user.role,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.protect = async (req, res, next) => {
  try {
    const jwtToken = req.cookies.jwt;
    if (!jwtToken) throw 'Your are not logged in, please login to get access';

    const decoded = jwt.verify(
      jwtToken,
      process.env.JWT_SECRET_KEY,
      (err, decoded) => {
        if (err) throw 'something went wrong, please try again after sometimes';
        else return decoded;
      }
    );

    const user = await User.findById(decoded.id);
    if (!user) throw "User doesn't exist!";
    req.body.user = user;
    next();
  } catch (error) {
    console.log(error);
  }
};

exports.protectByAdmin = (req, res, next) => {
  if (!(req.body.user.role === 'admin'))
    throw "Only Admin's are allowed to access this page!";
  next();
};
exports.protectByUser = (req, res, next) => {
  if (!(req.body.user.role === 'user'))
    throw "Only User's are allowed to access this page!";
  next();
};

exports.logout = (req, res) => {
  res.clearCookie('jwt');
  res.status(200).redirect('/');
};

exports.getLoginWithOTPForm = (req, res) => {
  res
    .status(200)
    .sendFile(path.join(__dirname, '../public/html/loginWithOTP.html'));
};

exports.sendOTP = async (req, res) => {
  if (!validator.isMobilePhone(mobile, 'en-IN'))
    throw 'Please enter a valid mobile number';

  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const client = twilio(accountSid, authToken);

  function generateOTP() {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  async function sendOTP(phoneNumber) {
    const otp = generateOTP();

    try {
      const message = await client.messages.create({
        body: `Your OTP code is ${otp}`,
        from: 'your_twilio_phone_number',
        to: phoneNumber,
      });

      console.log('OTP sent:', message.sid);
      return otp;
    } catch (error) {
      console.error('Error sending OTP:', error.message);
      throw error;
    }
  }

  const userPhoneNumber = req.body.mobile;
  await sendOTP(userPhoneNumber);
};
