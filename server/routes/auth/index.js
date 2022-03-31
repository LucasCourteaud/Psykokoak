import express from 'express'
import credentialMiddleware from '../../middlewares/credentials.middleware.js'
import authController from '../../controllers/auth.controller.js'

const router = express.Router();

router.post('/register', authController.register);
router.post('/login', credentialMiddleware.checkCredential, authController.login);

export default { router }