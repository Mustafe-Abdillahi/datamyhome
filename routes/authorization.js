import express from 'express';
// import {User} from "../model/user.js";
import { authorization } from '../controllers/authorization.js';
import { protect } from '../controllers/auth.js';
const autherRouter= express.Router();

autherRouter.get(
  '/admin',
  protect,
  authorization('admin'),
  (req, res) => {
    console.log("ADMIN ROUTE REACHED");
    res.send('hello');
  }
);

export default autherRouter;