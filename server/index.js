const express = require('express');
require('dotenv').config();
const cors = require('cors');
const app = express();
const cookieParser = require('cookie-parser');
const {run,consistentHash} = require('./db')
const shortenUrlRouter = require('./routes/shortenURL.js');
const authRouter = require('./routes/auth.js');
const rateLimiter=require('express-rate-limit');

run();

app.use(express.json());
app.use(cors({
  origin: "http://localhost:3000",
  credentials:true
}));
app.use(cookieParser());
let limiter=rateLimiter({
  max:1000,
  windowMs:60*60*1000,
  messgae:"Received too many requests. Try again later."
})
app.use('/api',limiter);

app.use('/api/shorten',shortenUrlRouter);
app.use('/api/auth',authRouter);


app.listen(8800,()=>{
  console.log("Connected!");
})