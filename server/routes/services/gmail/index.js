import express from 'express'
import credentialsMiddleware from '../../../middlewares/credentials.middleware.js';
import gmailController from '../../../controllers/gmail.controller.js'

const router = express.Router();
router.post('/sendamail/gmail/deletelastmail', credentialsMiddleware.checkCredential, gmailController.create_gmail_sent_gmail_delete);
router.post('/receiveamail/gmail/deletelastmail', credentialsMiddleware.checkCredential, gmailController.create_gmail_receive_gmail_delete);
router.post('/deleteamail/gmail/deletelastmail', credentialsMiddleware.checkCredential, gmailController.create_gmail_delete_gmail_delete);
router.post('/sendamail/reddit/likefirstpostonyourfeed', credentialsMiddleware.checkCredential, gmailController.create_gmail_sent_reddit_like);
router.post('/deleteamail/reddit/likefirstpostonyourfeed', credentialsMiddleware.checkCredential, gmailController.create_gmail_delete_reddit_like);
router.post('/deleteamail/reddit/postrandomurl', credentialsMiddleware.checkCredential, gmailController.create_gmail_delete_reddit_post);
router.post('/receiveamail/reddit/likefirstpostonyourfeed', credentialsMiddleware.checkCredential, gmailController.create_gmail_receive_reddit_like);
router.post('/sendamail/reddit/postrandomurl', credentialsMiddleware.checkCredential, gmailController.create_gmail_sent_reddit_post);
router.post('/receiveamail/reddit/postrandomurl', credentialsMiddleware.checkCredential, gmailController.create_gmail_receive_reddit_post);

export default { router }