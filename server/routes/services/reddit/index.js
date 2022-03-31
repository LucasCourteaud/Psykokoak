import express from 'express'
import credentialsMiddleware from '../../../middlewares/credentials.middleware.js';
import redditController from '../../../controllers/reddit.controller.js';

const router = express.Router();
router.post('/followsubreddit/reddit/likefirstpostonyourfeed', credentialsMiddleware.checkCredential, redditController.create_reddit_follow_reddit_like);
router.post('/unfollowsubreddit/reddit/likefirstpostonyourfeed', credentialsMiddleware.checkCredential, redditController.create_reddit_unfollow_reddit_like);
router.post('/followsubreddit/reddit/postrandomurl', credentialsMiddleware.checkCredential, redditController.create_reddit_follow_reddit_post);
router.post('/unfollowsubreddit/reddit/postrandomurl', credentialsMiddleware.checkCredential, redditController.create_reddit_unfollow_reddit_post);
router.post('/followsubreddit/gmail/deletelastmail', credentialsMiddleware.checkCredential, redditController.create_reddit_follow_gmail_delete);
router.post('/unfollowsubreddit/gmail/deletelastmail', credentialsMiddleware.checkCredential, redditController.create_reddit_unfollow_gmail_delete);

export default { router }