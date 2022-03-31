import express from 'express'
import credentialsMiddleware from '../../../middlewares/credentials.middleware.js';
import githubController from '../../../controllers/github.controller.js';

const router = express.Router();

router.post('/repoisstared/reddit/postrandomurl', credentialsMiddleware.checkCredential, githubController.create_github_reddit_post);
router.post('/repoisstared/reddit/likefirstpostonyourfeed', credentialsMiddleware.checkCredential, githubController.create_github_reddit_like);

export default { router }