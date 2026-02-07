import express from 'express';
import {userSignupController, userLoginController, refreshTokenController} from '../controllers/auth.controller.js';
import { validateUser } from '../middlewares/SchemaValidation.middleware.js';
import {LoginInputValidate} from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post('/signup', validateUser, userSignupController);
router.post('/login', LoginInputValidate, userLoginController);
router.get('/refresh', refreshTokenController);

export default router;