import express from 'express'
import credentialsMiddleware from '../../../middlewares/credentials.middleware.js';
import twitchController from '../../../controllers/twitch.controller.js';

const router = express.Router();
router.post('/followaccount/gmail/deletelastmail', credentialsMiddleware.checkCredential, twitchController.create_twitch_follow_gmail);
router.post('/unfollowaccount/gmail/deletelastmail', credentialsMiddleware.checkCredential, twitchController.create_twitch_unfollow_gmail);
router.post('/followaccount/reddit/likefirstpostonyourfeed', credentialsMiddleware.checkCredential, twitchController.create_twitch_follow_reddit_like);
router.post('/unfollowaccount/reddit/likefirstpostonyourfeed', credentialsMiddleware.checkCredential, twitchController.create_twitch_unfollow_reddit_like);
router.post('/followaccount/reddit/postrandomurl', credentialsMiddleware.checkCredential, twitchController.create_twitch_follow_reddit_post);
router.post('/unfollowaccount/reddit/postrandomurl', credentialsMiddleware.checkCredential, twitchController.create_twitch_unfollow_reddit_post);

export default { router }