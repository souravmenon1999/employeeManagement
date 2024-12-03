import asyncHandler from 'express-async-handler';
import bcrypt from 'bcrypt';
import User from '../models/userModel.js';
import { sendOTP } from '../config/otpgenerator.js';
import { generateAccessToken, generateRefreshToken } from '../utils/tokenUtils.js';

// OTP generation function
const otpGeneration = () => {
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const expirationOfOtp = Date.now() + 2 * 60 * 1000;
  return { otp, expirationOfOtp };
};

// Register user controller
const registeruser = asyncHandler(async (req, res) => {
  const { username, email, password, firstname, lastname } = req.body;

  if (!username || !email || !password) {
    res.status(400).json({ error: 'All fields are required' });
    return;
  }

  const userAvailable = await User.findOne({ email });
  if (userAvailable) {
    res.status(400).json({ error: 'User already exists. Please change the email.' });
    return;
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const { otp, expirationOfOtp } = otpGeneration();
  req.session.signupData = {
    username,
    email,
    password: hashPassword,
    firstname,
    lastname,
    otpGeneration: otp,
    expirationOfOtp,
  };
  await sendOTP(email, otp); // Send OTP to email
  res.status(200).json({ message: 'OTP sent successfully', email });
});

// OTP verification controller
const otpVerify = asyncHandler(async (req, res) => {
  const { otp } = req.body;
  if (!req.session.signupData) {
    res.status(400).json({ error: 'Data not found. Please try again.' });
    return;
  }

  const { username, email, password, otpGeneration, expirationOfOtp, firstname, lastname } = req.session.signupData;

  if (Date.now() > expirationOfOtp) {
    delete req.session.signupData;
    res.status(400).json({ error: 'OTP has expired. Please request a new one.' });
    return;
  }

  if (otp === otpGeneration) {
    const userdata = await User.create({ username, email, password, firstname, lastname });
    delete req.session.signupData;

    const accessToken = generateAccessToken({ username: userdata.username });
    const refreshToken = generateRefreshToken({ username: userdata.username });
    res.setHeader('Set-Cookie', [
      `accessToken=${accessToken};  SameSite=Lax; Path=/; Max-Age=3600`,
      `refreshToken=${refreshToken}; Secure; HttpOnly; SameSite=Lax; Path=/; Max-Age=${7 * 24 * 60 * 60}`
    ]);
    

    res.status(200).json({ message: 'User registered successfully', userdata });
  } else {
    res.status(400).json({ error: 'Incorrect OTP' });
  }
});

// Login user controller
const loginuser = asyncHandler(async (req, res) => {
  console.log(req.body);
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      res.status(404).json({ error: 'User not found' });
      console.log('User not found')
      return;
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (isPasswordMatch) {
      const accessToken = generateAccessToken({ id: user._id });
      const refreshToken = generateRefreshToken({ id: user._id });

      res.cookie('accessToken', accessToken, {
        
        secure: true, // Change to true in production with HTTPS
        sameSite: 'None', // Change to 'None' if cross-site cookies are needed
        maxAge: 3600 * 1000, // Correcting to milliseconds (1 hour)
        domain:'',
        path: '/',
        expires: new Date(Date.now() + 900000)
      });
      
    
      res.cookie('refreshToken', refreshToken, {
        secure: true, // Change to true in production with HTTPS
        sameSite: 'None', // Change to 'None' if cross-site cookies are needed
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // Correcting to a valid date object
        domain:'',
        path: '/',
        expires:new Date(Date.now() + 900000),
      });

      res.cookie('myCookie', 'cookieValue', {
        httpOnly: true,
        secure: true, // set to true if your site is served over HTTPS
        sameSite: 'None', // set to 'Lax' or 'Strict' as per your needs
        domain: '', // use your domain
        path: '/',
        expires: new Date(Date.now() + 900000) // expires in 15 minutes
      });
      
     

      

      res.status(200).json({ 
        token:accessToken,
        message: 'Login successful' });
      console.log('success');
    } else {
      res.status(401).json({ error: 'Wrong password' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error during login' });
  }
});

// Logout controller
const logout = asyncHandler(async (req, res) => {
  console.log('Before destroying session', req.sessionID);
  req.session.destroy((error) => {
    if (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    } else {
      console.log('After destroying session ', req.sessionID);
      res.clearCookie('connect.sid');
      res.status(200).json({ message: 'Logout successful' });
    }
  });
});

// Refresh token controller
const refreshToken = asyncHandler(async (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    return res.status(401).json({ message: 'No refresh token provided' });
  }

  jwt.verify(refreshToken, process.env.REFRESH_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid refresh token' });
    }

    const accessToken = generateAccessToken({ username: user.username });
    res.cookie('accessToken', accessToken, { httpOnly: true, secure: true, sameSite: 'strict' });

    res.status(200).json({ message: 'Access token refreshed' });
  });
});

export { registeruser, loginuser, otpVerify, logout, refreshToken };
