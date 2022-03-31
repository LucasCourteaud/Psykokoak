import db from '../models/index.js'
import { get_twitch_user_id, get_twitch_subscribe } from '../api/twitch/twitch_api.js';

const User = db.Users;

function create_twitch_follow_gmail(req, res) {
    const { name } = req.query;
    const { user } = req;

    if (!name)
        return res.status(401).json({ messages: 'You must give a name to your koak' })
    get_twitch_user_id(user, (user_id) => {
        get_twitch_subscribe(user, user_id, async (nb) => {
            const koak = {
                name: name,
                request: '/twitch/followaccount/gmail/deletelastmail',
                action_service: 'twitch',
                reaction_serve: 'gmail',
                description: 'Supprime définitivement le dernier mail de vos boîtes quand vous vous abonnez à une chaîne',
                verif_value: nb,
                twitch_user_id: user_id
            };
            await User.findByIdAndUpdate(user._id, { $push: { koaks: koak } });
        })
    })
    return res.status(200).json({ messages: 'kouak /twitch/followaccount/gmail/deletelastmail successfully created' });
}

function create_twitch_unfollow_gmail(req, res) {
    const { name } = req.query;
    const { user } = req;

    if (!name)
        return res.status(401).json({ messages: 'You must give a name to your koak' })
    get_twitch_user_id(user, (user_id) => {
        get_twitch_subscribe(user, user_id, async (nb) => {
            const koak = {
                name: name,
                request: '/twitch/unfollowaccount/gmail/deletelastmail',
                action_service: 'twitch',
                reaction_serve: 'gmail',
                description: 'Supprime définitivement le dernier mail de vos boîtes quand vous vous désabonnez d\'une chaîne',
                verif_value: nb,
                twitch_user_id: user_id
            };
            await User.findByIdAndUpdate(user._id, { $push: { koaks: koak } });
        })
    })
    return res.status(200).json({ messages: 'kouak /twitch/unfollowaccount/gmail/deletelastmail successfully created' });
}

function create_twitch_follow_reddit_post(req, res) {
    const { name } = req.query;
    const { user } = req;

    if (!name)
        return res.status(401).json({ messages: 'You must give a name to your koak' })
    get_twitch_user_id(user, (user_id) => {
        get_twitch_subscribe(user, user_id, async (nb) => {
            const koak = {
                name: name,
                request: '/twitch/followaccount/reddit/postrandomurl',
                action_service: 'twitch',
                reaction_serve: 'reddit',
                description: 'Partage un site aléatoire dans /rcantbanmeonmyowncomm quand vous vous abonnez à une chaîne',
                verif_value: nb,
                twitch_user_id: user_id
            };
            await User.findByIdAndUpdate(user._id, { $push: { koaks: koak } });
        })
    })
    return res.status(200).json({ messages: 'kouak /twitch/followaccount/reddit/postrandomurl successfully created' });
}

function create_twitch_unfollow_reddit_post(req, res) {
    const { name } = req.query;
    const { user } = req;

    if (!name)
        return res.status(401).json({ messages: 'You must give a name to your koak' })
    get_twitch_user_id(user, (user_id) => {
        console.log("THIS IS THE USERID §§§ :", user_id);
        get_twitch_subscribe(user, user_id, async (nb) => {
            const koak = {
                name: name,
                request: '/twitch/unfollowaccount/reddit/postrandomurl',
                action_service: 'twitch',
                reaction_serve: 'reddit',
                description: 'Partage un site aléatoire dans /rcantbanmeonmyowncomm quand vous vous désabonnez d\'une chaîne',
                verif_value: nb,
                twitch_user_id: user_id
            };
            await User.findByIdAndUpdate(user._id, { $push: { koaks: koak } });
        })
    })
    return res.status(200).json({ messages: 'kouak /twitch/unfollowaccount/reddit/postrandomurl successfully created' });
}

function create_twitch_follow_reddit_like(req, res) {
    const { name } = req.query;
    const { user } = req;

    if (!name)
        return res.status(401).json({ messages: 'You must give a name to your koak' })
    get_twitch_user_id(user, (user_id) => {
        get_twitch_subscribe(user, user_id, async (nb) => {
            const koak = {
                name: name,
                request: '/twitch/followaccount/reddit/likefirstpostonyourfeed',
                action_service: 'twitch',
                reaction_serve: 'reddit',
                description: 'Upvote le poste populaire le plus récent sur reddit quand vous vous abonnez à une chaîne',
                verif_value: nb,
                twitch_user_id: user_id
            };
            await User.findByIdAndUpdate(user._id, { $push: { koaks: koak } });
        })
    })
    return res.status(200).json({ messages: 'kouak /twitch/followaccount/reddit/likefirstpostonyourfeed successfully created' });
}

function create_twitch_unfollow_reddit_like(req, res) {
    const { name } = req.query;
    const { user } = req;

    if (!name)
        return res.status(401).json({ messages: 'You must give a name to your koak' })
    get_twitch_user_id(user, (user_id) => {
        get_twitch_subscribe(user, user_id, async (nb) => {
            const koak = {
                name: name,
                request: '/twitch/unfollowaccount/reddit/likefirstpostonyourfeed',
                action_service: 'twitch',
                reaction_serve: 'reddit',
                description: 'Upvote le poste populaire le plus récent sur reddit quand vous vous désabonnez d\'une chaîne',
                verif_value: nb,
                twitch_user_id: user_id
            };
            await User.findByIdAndUpdate(user._id, { $push: { koaks: koak } });
        })
    })
    return res.status(200).json({ messages: 'kouak /twitch/unfollowaccount/reddit/likefirstpostonyourfeed successfully created' });
}

export default { create_twitch_follow_gmail, create_twitch_unfollow_gmail, create_twitch_follow_reddit_post, create_twitch_unfollow_reddit_post, create_twitch_follow_reddit_like, create_twitch_unfollow_reddit_like }