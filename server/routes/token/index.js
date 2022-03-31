import express from 'express'
import tokenController from '../../controllers/token.controller.js';
import credentialsMiddleware from '../../middlewares/credentials.middleware.js';

const router = express.Router();

router.post('/:service', credentialsMiddleware.checkCredential, tokenController.linkServices);
router.delete('/:service', credentialsMiddleware.checkCredential, tokenController.unLinkServices);

export default { router }