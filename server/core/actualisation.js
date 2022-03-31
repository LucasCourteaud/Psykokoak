import { check_twitch_follow_reddit_like, check_twitch_unfollow_reddit_like, check_twitch_follow_reddit_post, check_twitch_unfollow_reddit_post } from './twitch/twitch_reddit.js';
import { check_spotify_spotify } from './spotify/spotify_spotify.js'
import { check_spotify_reddit_like, check_spotify_reddit_post } from './spotify/spotify_reddit.js';
import { check_reddit_follow_reddit_like, check_reddit_follow_reddit_post, check_reddit_unfollow_reddit_like, check_reddit_unfollow_reddit_post } from './reddit/reddit_reddit.js';
import { check_gmail_sent_reddit_like, check_gmail_sent_reddit_post, check_gmail_receive_reddit_like, check_gmail_receive_reddit_post, check_gmail_delete_reddit_like, check_gmail_delete_reddit_post } from './gmail/gmail_reddit.js';
import { check_youtube_reddit_like, check_youtube_reddit_post } from './youtube/youtube_reddit.js';
import { check_spotify_gmail_delete } from './spotify/spotify_gmail.js';
import { check_youtube_gmail_delete } from './youtube/youtube_gmail.js';
import { check_twitch_follow_gmail_delete, check_twitch_unfollow_gmail_delete } from './twitch/twitch_gmail.js';
import { check_reddit_follow_gmail_delete, check_reddit_unfollow_gmail_delete } from './reddit/reddit_gmail.js';
import { check_gmail_delete_gmail_delete, check_gmail_sent_gmail_delete, check_gmail_receive_gmail_delete } from './gmail/gmail_gmail.js';
import { check_github_reddit_post, check_github_reddit_like } from './github/github_reddit.js';
import db from '../models/index.js'
import { check_youtube_youtube } from './youtube/youtube_youtube.js';

const User = db.Users;

async function kouaks_check() {
    var Users = await User.find({});

    for (var i = 0; i < Users.length; i++) {
        console.log("Check User: " + Users[i].credential);
        if (Users[i].koaks.length === 0) {
            console.log("No koaks set for user " + Users[i].credential);
            return;
        }
        for (var j = 0; j < Users[i].koaks.length; j++) {
            if (Users[i].koaks[j].request === "/github/repoisstared/reddit/likefirstpostonyourfeed") {
                console.log("github reddit like")
                check_github_reddit_like(Users[i], Users[i].koaks[j]);
            }
            if (Users[i].koaks[j].request === "/github/repoisstared/reddit/postrandomurl") {
                console.log("github reddit post")
                check_github_reddit_post(Users[i], Users[i].koaks[j]);
            }
            if (Users[i].koaks[j].request === "/spotify/addmusictofavorite/spotify/addlastlikedmusictoplaylist") {
                console.log("spotify spotify")
                check_spotify_spotify(Users[i], Users[i].koaks[j]);
            }
            if (Users[i].koaks[j].request === "/spotify/addmusictofavorite/reddit/likefirstpostonyourfeed") {
                console.log("spotify reddit like")
                check_spotify_reddit_like(Users[i], Users[i].koaks[j]);
            }
            if (Users[i].koaks[j].request === "/spotify/addmusictofavorite/reddit/postrandomurl") {
                console.log("spotofy reddit post")
                check_spotify_reddit_post(Users[i], Users[i].koaks[j]);
            }
            if (Users[i].koaks[j].request === "/twitch/followaccount/reddit/likefirstpostonyourfeed") {
                console.log("twitch reddit like")
                check_twitch_follow_reddit_like(Users[i], Users[i].koaks[j]);
            }
            if (Users[i].koaks[j].request === "/twitch/unfollowaccount/reddit/likefirstpostonyourfeed") {
                console.log("twitch reddit like")
                check_twitch_unfollow_reddit_like(Users[i], Users[i].koaks[j]);
            }
            if (Users[i].koaks[j].request === "/reddit/followsubreddit/reddit/likefirstpostonyourfeed") {
                console.log("follow reddi reddit like")
                check_reddit_follow_reddit_like(Users[i], Users[i].koaks[j]);
            }
            if (Users[i].koaks[j].request === "/reddit/followsubreddit/reddit/postrandomurl") {
                console.log("fol red red post")
                check_reddit_follow_reddit_post(Users[i], Users[i].koaks[j]);
            }
            if (Users[i].koaks[j].request === "/reddit/unfollowsubreddit/reddit/postrandomurl") {
                console.log("unf re red post")
                check_reddit_unfollow_reddit_post(Users[i], Users[i].koaks[j]);
            }
            if (Users[i].koaks[j].request === "/reddit/unfollowsubreddit/reddit/likefirstpostonyourfeed") {
                console.log("unf red red like")
                check_reddit_unfollow_reddit_like(Users[i], Users[i].koaks[j]);
            }
            if (Users[i].koaks[j].request === "/gmail/sendamail/reddit/likefirstpostonyourfeed") {
                console.log("send red like")
                check_gmail_sent_reddit_like(Users[i], Users[i].koaks[j]);
            }
            if (Users[i].koaks[j].request === "/gmail/sendamail/reddit/postrandomurl") {
                console.log("send red post")
                check_gmail_sent_reddit_post(Users[i], Users[i].koaks[j]);
            }
            if (Users[i].koaks[j].request === "/gmail/receiveamail/reddit/likefirstpostonyourfeed") {
                console.log("rec red like")
                check_gmail_receive_reddit_like(Users[i], Users[i].koaks[j]);
            }
            if (Users[i].koaks[j].request === "/gmail/receiveamail/reddit/postrandomurl") {
                console.log("rec red post")
                check_gmail_receive_reddit_post(Users[i], Users[i].koaks[j]);
            }
            if (Users[i].koaks[j].request === "/gmail/deleteamail/reddit/postrandomurl") {
                console.log("del red post")
                check_gmail_delete_reddit_post(Users[i], Users[i].koaks[j]);
            }
            if (Users[i].koaks[j].request === "/gmail/deleteamail/reddit/likefirstpostonyourfeed") {
                console.log("del red like")
                check_gmail_delete_reddit_like(Users[i], Users[i].koaks[j]);
            }
            if (Users[i].koaks[j].request === "/youtube/likevideo/reddit/likefirstpostonyourfeed") {
                console.log("yt like red like")
                check_youtube_reddit_like(Users[i], Users[i].koaks[j]);
            }
            if (Users[i].koaks[j].request === "/youtube/likevideo/reddit/postrandomurl") {
                console.log("yt like red post")
                check_youtube_reddit_post(Users[i], Users[i].koaks[j]);
            }
            if (Users[i].koaks[j].request === "/youtube/likevideo/youtube/addmusictoplaylist") {
                console.log("yt like yt pl")
                check_youtube_youtube(Users[i], Users[i].koaks[j]);
            }
            if (Users[i].koaks[j].request === "/spotify/addmusictofavorite/gmail/deletelastmail") {
                console.log("spo add del")
                check_spotify_gmail_delete(Users[i], Users[i].koaks[j]);
            }
            if (Users[i].koaks[j].request === "/gmail/sendamail/gmail/deletelastmail") {
                console.log("send del")
                check_gmail_sent_gmail_delete(Users[i], Users[i].koaks[j]);
            }
            if (Users[i].koaks[j].request === "/gmail/receiveamail/gmail/deletelastmail") {
                console.log("rec del")
                check_gmail_receive_gmail_delete(Users[i], Users[i].koaks[j]);
            }
            if (Users[i].koaks[j].request === "/gmail/deleteamail/gmail/deletelastmail") {
                console.log("del del")
                check_gmail_delete_gmail_delete(Users[i], Users[i].koaks[j]);
            }
            if (Users[i].koaks[j].request === "/youtube/likevideo/gmail/deletelastmail") {
                console.log("yt like del")
                check_youtube_gmail_delete(Users[i], Users[i].koaks[j]);
            }
            if (Users[i].koaks[j].request === "/reddit/followsubreddit/gmail/deletelastmail") {
                console.log("red fol del")
                check_reddit_follow_gmail_delete(Users[i], Users[i].koaks[j]);
            }
            if (Users[i].koaks[j].request === "/reddit/unfollowsubreddit/gmail/deletelastmail") {
                console.log("red unf del")
                check_reddit_unfollow_gmail_delete(Users[i], Users[i].koaks[j]);
            }
            if (Users[i].koaks[j].request === "/twitch/followaccount/reddit/postrandomurl") {
                check_twitch_follow_reddit_post(Users[i], Users[i].koaks[j]);
            }
            if (Users[i].koaks[j].request === "/twitch/unfollowaccount/reddit/postrandomurl") {
                check_twitch_unfollow_reddit_post(Users[i], Users[i].koaks[j]);
            }
            if (Users[i].koaks[j].request === "/twitch/followaccount/gmail/deletelastmail") {
                check_twitch_follow_gmail_delete(Users[i], Users[i].koaks[j]);
            }
            if (Users[i].koaks[j].request === "/twitch/unfollowaccount/gmail/deletelastmail") {
                check_twitch_unfollow_gmail_delete(Users[i], Users[i].koaks[j]);
            }
        }
    }
}

export { kouaks_check }