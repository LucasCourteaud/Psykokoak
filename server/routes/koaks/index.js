import express from 'express'
import credentialMiddleware from '../../middlewares/credentials.middleware.js'
import koaksController from '../../controllers/koaks.controller.js';

const router = express.Router();

router.post('/getmykoaks', credentialMiddleware.checkCredential, koaksController.my_koaks);

export default { router }