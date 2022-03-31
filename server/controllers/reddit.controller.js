import db from '../models/index.js'
import { get_reddit_sub_nb } from '../api/reddit/reddit_api.js';

const User = db.Users;

function create_reddit_follow_reddit_like(req, res) {
    const { name } = req.query;
    const { user } = req;

    if (!name)
        return res.status(401).json({ messages: 'You must give a name to your koak' })
    get_reddit_sub_nb(user, async (nb) => {
        const koak = {
            name: name,
            request: '/reddit/followsubreddit/reddit/likefirstpostonyourfeed',
            action_service: 'reddit',
            reaction_serve: 'reddit',
            description: 'Upvote le poste populaire le plus récent sur reddit quand vous vous abonnez à un subreddit',
            verif_value: nb,
        };
        await User.findByIdAndUpdate(user._id, { $push: { koaks: koak } });
    })
    return res.status(200).json({ messages: 'kouak /reddit/followsubreddit/reddit/likefirstpostonyourfeed successfully created' });
}

function create_reddit_unfollow_reddit_like(req, res) {
    const { name } = req.query;
    const { user } = req;

    if (!name)
        return res.status(401).json({ messages: 'You must give a name to your koak' })
    get_reddit_sub_nb(user, async (nb) => {
        const koak = {
            name: name,
            request: '/reddit/unfollowsubreddit/reddit/likefirstpostonyourfeed',
            action_service: 'reddit',
            reaction_serve: 'reddit',
            description: 'Upvote le poste populaire le plus récent sur reddit quand vous vous désabonnez d\'un subreddit',
            verif_value: nb,
        };
        await User.findByIdAndUpdate(user._id, { $push: { koaks: koak } });
    })
    return res.status(200).json({ messages: 'kouak /reddit/unfollowsubreddit/reddit/likefirstpostonyourfeed successfully created' });
}

function create_reddit_follow_reddit_post(req, res) {
    const { name } = req.query;
    const { user } = req;

    if (!name)
        return res.status(401).json({ messages: 'You must give a name to your koak' })
    get_reddit_sub_nb(user, async (nb) => {
        const koak = {
            name: name,
            request: '/reddit/followsubreddit/reddit/postrandomurl',
            action_service: 'reddit',
            reaction_serve: 'reddit',
            description: 'Partage un site aléatoire dans /rcantbanmeonmyowncomm quand vous vous abonnez à un subreddit',
            verif_value: nb,
        };
        await User.findByIdAndUpdate(user._id, { $push: { koaks: koak } });
    })
    return res.status(200).json({ messages: 'kouak /reddit/followsubreddit/reddit/postrandomurl successfully created' });
}

function create_reddit_unfollow_reddit_post(req, res) {
    const { name } = req.query;
    const { user } = req;

    if (!name)
        return res.status(401).json({ messages: 'You must give a name to your koak' })
    get_reddit_sub_nb(user, async (nb) => {
        const koak = {
            name: name,
            request: '/reddit/unfollowsubreddit/reddit/postrandomurl',
            action_service: 'reddit',
            reaction_serve: 'reddit',
            description: 'Partage un site aléatoire dans /rcantbanmeonmyowncomm quand vous vous désabonnez d\'un subreddit',
            verif_value: nb,
        };
        await User.findByIdAndUpdate(user._id, { $push: { koaks: koak } });
    })
    return res.status(200).json({ messages: 'kouak /reddit/unfollowsubreddit/reddit/postrandomurl successfully created' });
}

function create_reddit_follow_gmail_delete(req, res) {
    const { name } = req.query;
    const { user } = req;

    if (!name)
        return res.status(401).json({ messages: 'You must give a name to your koak' })
    get_reddit_sub_nb(user, async (nb) => {
        const koak = {
            name: name,
            request: '/reddit/followsubreddit/gmail/deletelastmail',
            action_service: 'reddit',
            reaction_serve: 'gmail',
            description: 'Supprime définitivement le dernier mail de vos boîtes quand vous vous abonnez à un subreddit',
            verif_value: nb,
        };
        await User.findByIdAndUpdate(user._id, { $push: { koaks: koak } });
    })
    return res.status(200).json({ messages: 'kouak /reddit/followsubreddit/gmail/deletelastmail successfully created' });
}

function create_reddit_unfollow_gmail_delete(req, res) {
    const { name } = req.query;
    const { user } = req;

    if (!name)
        return res.status(401).json({ messages: 'You must give a name to your koak' })
    get_reddit_sub_nb(user, async (nb) => {
        const koak = {
            name: name,
            request: '/reddit/unfollowsubreddit/gmail/deletelastmail',
            action_service: 'reddit',
            reaction_serve: 'gmail',
            description: 'Supprime définitivement le dernier mail de vos boîtes quand vous vous désabonnez d\'un subreddit',
            verif_value: nb,
        };
        await User.findByIdAndUpdate(user._id, { $push: { koaks: koak } });
    })
    return res.status(200).json({ messages: 'kouak /reddit/unfollowsubreddit/gmail/deletelastmail successfully created' });
}

export default { create_reddit_follow_reddit_like, create_reddit_unfollow_reddit_like, create_reddit_follow_reddit_post, create_reddit_unfollow_reddit_post, create_reddit_follow_gmail_delete, create_reddit_unfollow_gmail_delete }