import { count_in_box } from '../api/gmail/gmail_api.js'
import db from '../models/index.js'

const User = db.Users;

async function create_gmail_sent_gmail_delete(req, res) {
    const { name } = req.query;
    const { user } = req;
    var verif_value = count_in_box(user, 'SENT');

    if (!name)
        return res.status(401).json({ messages: 'You must give a name to your koak' })
    const koak = {
        name,
        request: '/gmail/sendamail/gmail/deletelastmail',
        action_service: 'gmail',
        reaction_serve: 'gmail',
        description: 'Supprime définitivement le dernier email quand vous envoyez un mail',
        verif_value
    };
    await User.findByIdAndUpdate(user._id, { $push: { koaks: koak } });
    return res.status(200).json({ messages: 'kouak /gmail/sendamail/gmail/deletelastmail successfully created' });
}

async function create_gmail_receive_gmail_delete(req, res) {
    const { name } = req.query;
    const { user } = req;
    var verif_value = count_in_box(user, 'INBOX');

    if (!name)
        return res.status(401).json({ messages: 'You must give a name to your koak' })
    const koak = {
        name,
        request: '/gmail/receiveamail/gmail/deletelastmail',
        action_service: 'gmail',
        reaction_serve: 'gmail',
        description: 'Supprime définitivement le dernier email quand vous recevez un mail',
        verif_value
    };
    await User.findByIdAndUpdate(user._id, { $push: { koaks: koak } });
    return res.status(200).json({ messages: 'kouak /gmail/receiveamail/gmail/deletelastmail successfully created' });
}

async function create_gmail_delete_gmail_delete(req, res) {
    const { name } = req.query;
    const { user } = req;
    var verif_value = count_in_box(user, 'TRASH');

    if (!name)
        return res.status(401).json({ messages: 'You must give a name to your koak' })
    const koak = {
        name,
        request:'/gmail/deleteamail/gmail/deletelastmail',
        action_service: 'gmail',
        reaction_serve: 'gmail',
        description: 'Supprime définitivement le dernier email quand vous supprimez un mail',
        verif_value
    };
    await User.findByIdAndUpdate(user._id, { $push: { koaks: koak } });
    return res.status(200).json({ messages: 'kouak /gmail/deleteamail/gmail/deletelastmail successfully created' });
}

async function create_gmail_sent_reddit_like(req, res) {
    const { name } = req.query;
    const { user } = req;
    var verif_value = count_in_box(user, 'SENT');

    if (!name)
        return res.status(401).json({ messages: 'You must give a name to your koak' })
    const koak = {
        name,
        request: '/gmail/sendamail/reddit/likefirstpostonyourfeed',
        action_service: 'gmail',
        reaction_serve: 'reddit',
        description: 'Upvote le dernier post dans r/popular sur Reddit quand vous envoyez un mail',
        verif_value
    };
    await User.findByIdAndUpdate(user._id, { $push: { koaks: koak } });
    return res.status(200).json({ messages: 'kouak /gmail/sendamail/reddit/likefirstpostonyourfeed successfully created' });
}

async function create_gmail_delete_reddit_like(req, res) {
    const { name } = req.query;
    const { user } = req;
    var verif_value = count_in_box(user, 'TRASH');

    if (!name)
        return res.status(401).json({ messages: 'You must give a name to your koak' })
    const koak = {
        name,
        request: '/gmail/deleteamail/reddit/likefirstpostonyourfeed',
        action_service: 'gmail',
        reaction_serve: 'reddit',
        description: 'Upvote le dernier post dans r/popular sur Reddit quand vous supprimez un mail',
        verif_value
    };
    await User.findByIdAndUpdate(user._id, { $push: { koaks: koak } });
    return res.status(200).json({ messages: 'kouak /gmail/deleteamail/reddit/likefirstpostonyourfeed successfully created' });
}

async function create_gmail_delete_reddit_post(req, res) {
    const { name } = req.query;
    const { user } = req;
    var verif_value = count_in_box(user, 'TRASH');

    if (!name)
        return res.status(401).json({ messages: 'You must give a name to your koak' })
    const koak = {
        name,
        request: '/gmail/deleteamail/reddit/postrandomurl',
        action_service: 'gmail',
        reaction_serve: 'reddit',
        description: 'Poste un url aléatoire dans r/cantbanmeonmyowncomm when you delete a mail',
        verif_value
    };
    await User.findByIdAndUpdate(user._id, { $push: { koaks: koak } });
    return res.status(200).json({ messages: 'kouak /gmail/deleteamail/reddit/postrandomurl successfully created' });
}

async function create_gmail_receive_reddit_like(req, res) {
    const { name } = req.query;
    const { user } = req;
    var verif_value = count_in_box(user, 'INBOX');

    if (!name)
        return res.status(401).json({ messages: 'You must give a name to your koak' })
    const koak = {
        name,
        request: '/gmail/receiveamail/reddit/likefirstpostonyourfeed',
        action_service: 'gmail',
        reaction_serve: 'reddit',
        description: 'Upvote le dernier post dans r/popular sur Reddit quand vous recevez un mail',
        verif_value
    };
    await User.findByIdAndUpdate(user._id, { $push: { koaks: koak } });
    return res.status(200).json({ messages: 'kouak /gmail/receiveamail/reddit/likefirstpostonyourfeed successfully created' });
}

async function create_gmail_sent_reddit_post(req, res) {
    const { name } = req.query;
    const { user } = req;
    var verif_value = count_in_box(user, 'SENT');

    if (!name)
        return res.status(401).json({ messages: 'You must give a name to your koak' })
    const koak = {
        name,
        request: '/gmail/sendamail/reddit/postrandomurl',
        action_service: 'gmail',
        reaction_serve: 'reddit',
        description: 'Poste un url aléatoire dans r/cantbanmeonmyowncomm when you sent a mail',
        verif_value
    };
    await User.findByIdAndUpdate(user._id, { $push: { koaks: koak } });
    return res.status(200).json({ messages: 'kouak /gmail/sendamail/reddit/postrandomurl successfully created' });
}

async function create_gmail_receive_reddit_post(req, res) {
    const { name } = req.query;
    const { user } = req;
    var verif_value = count_in_box(user, 'INBOX');

    if (!name)
        return res.status(401).json({ messages: 'You must give a name to your koak' })
    const koak = {
        name,
        request: '/gmail/receiveamail/reddit/postrandomurl',
        action_service: 'gmail',
        reaction_serve: 'reddit',
        description: 'Poste un url aléatoire dans r/cantbanmeonmyowncomm when you receive a mail',
        verif_value
    };
    await User.findByIdAndUpdate(user._id, { $push: { koaks: koak } });
    return res.status(200).json({ messages: 'kouak create_gmail_receive_reddit_post successfully created' });
}

export default { create_gmail_sent_gmail_delete, create_gmail_receive_gmail_delete, create_gmail_delete_gmail_delete, create_gmail_sent_reddit_like, create_gmail_delete_reddit_like, create_gmail_delete_reddit_post, create_gmail_receive_reddit_like, create_gmail_sent_reddit_post, create_gmail_receive_reddit_post }