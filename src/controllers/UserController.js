import { UserModel } from "../models/User.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import {decodeToken} from "../utils/decodeToken.js";
import { response } from "express";


export const createUser = async (req, res) => {

  const { email, password } = req.body;
  const user = await UserModel.findOne({email});

  if(user) {
      return res.status(409).json({status: 'error', error: 'Email already registered'});
  } 
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  const newUser = new UserModel({email, password: hash});
  await newUser.save();
  res.status(201).json({message: 'user created'});
  
  
};

export const loginUser = async (req, res) => { 

  const { email, password } = req.body;
  const user = await UserModel.findOne({email});

  const correctPassword = user == null ? false : await bcrypt.compare(password, user.password);
  if(!correctPassword) {
      return res.status(401).json({status: 'error', error: 'Invalid user or password'});
  } 

  const userForToken = {
    id: user._id,
    email: user.email
  }
  const expiresIn = 60 * 60 * 24;

  const token = jwt.sign(userForToken, process.env.SECRET_KEY, {expiresIn});

  res.status(200).send({
    token
  });
  
}

export const getUser = async (req, res) => { 

  let decodedToken = decodeToken(req);

  if (!decodedToken || !decodedToken.id) {
    return res.status(401).json({ error: "token missing or invalid" }); 
  }

  try {
    const user = await UserModel.findById(decodedToken.id);
    res.status(200).json({email: user.email});
  } catch
  (error) {
    res.status(400).json({ message: "Could not fetch user" });
  }

  
}

