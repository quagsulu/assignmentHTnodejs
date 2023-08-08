import express from 'express';
import { signin, signup } from '../controllers/auth';

const routerAuth = express.Router();

routerAuth.post('/signin',signin )
routerAuth.post('/signup',signup)

export default routerAuth