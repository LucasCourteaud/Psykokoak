import express from 'express'
import credentialsMiddleware from '../../../middlewares/credentials.middleware.js';
import spotifyController from '../../../controllers/spotify.controller.js';

const router = express.Router();
router.post('/addmusictofavorite/spotify/addlastlikedmusictoplaylist', credentialsMiddleware.checkCredential, spotifyController.create_spotify_spotify);
router.post('/addmusictofavorite/reddit/likefirstpostonyourfeed', credentialsMiddleware.checkCredential, spotifyController.create_spotify_reddit_like);
router.post('/addmusictofavorite/reddit/postrandomurl', credentialsMiddleware.checkCredential, spotifyController.create_spotify_reddit_post);
router.post('/addmusictofavorite/gmail/deletelastmail', credentialsMiddleware.checkCredential, spotifyController.create_spotify_gmail);

export default { router }