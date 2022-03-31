import express from 'express'
import credentialsMiddleware from '../../../middlewares/credentials.middleware.js';
import youtubeController from '../../../controllers/youtube.controller.js';

const router = express.Router();

router.post('/likevideo/gmail/deletelastmail', credentialsMiddleware.checkCredential, youtubeController.create_youtube_gmail_delete);
router.post('/likevideo/reddit/likefirstpostonyourfeed', credentialsMiddleware.checkCredential, youtubeController.create_youtube_reddit_like);
router.post('/likevideo/reddit/postrandomurl', credentialsMiddleware.checkCredential,youtubeController.create_youtube_reddit_post);
router.post('/likevideo/youtube/addmusictoplaylist', credentialsMiddleware.checkCredential, youtubeController.create_youtube_youtube);

export default { router }