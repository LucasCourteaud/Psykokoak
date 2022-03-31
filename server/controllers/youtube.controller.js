import db from '../models/index.js'
import { request_youtube_data, get_liked_videos_nb } from '../api/youtube/youtube_api.js';

const User = db.Users;

function create_youtube_gmail_delete(req, res) {
    const { user } = req;
    const { name } = req.query;

    if (!name)
        return res.status(401).json({ messages: 'You must give a name to your koak' })
    request_youtube_data(user, (playlist_id) => {
        get_liked_videos_nb(user, playlist_id, async (nb) => {
            const koak = {
                name: name,
                request: '/youtube/likevideo/gmail/deletelastmail',
                action_service: 'youtube',
                reaction_service: 'gmail',
                description: 'Supprime définitivement le dernier mail de vos boîtes quand vous aimez une vidéo',
                verif_value: nb,
                playlist_id
            };
            await User.findByIdAndUpdate(user._id, { $push: { koaks: koak } });
        })
    })
    return res.status(200).json({ messages: 'kouak /youtube/likevideo/gmail/deletelastmail successfully connected' });
}

function create_youtube_reddit_like(req, res) {
    const { user } = req;
    const { name } = req.query;

    if (!name)
        return res.status(401).json({ messages: 'You must give a name to your koak' })
    request_youtube_data(user, (playlist_id) => {
        get_liked_videos_nb(user, playlist_id, async (nb) => {
            const koak = {
                name: name,
                request: '/youtube/likevideo/reddit/likefirstpostonyourfeed',
                action_service: 'youtube',
                reaction_serve: 'reddit',
                description: 'Upvote le poste populaire le plus récent sur reddit quand vous aimez une vidéo',
                verif_value: nb,
                playlist_id
            };
            await User.findByIdAndUpdate(user._id, { $push: { koaks: koak } });
        })
    })
    return res.status(200).json({ messages: 'kouak /youtube/likevideo/reddit/likefirstpostonyourfeed successfully connected' });
}

function create_youtube_reddit_post(req, res) {
    const { user } = req;
    const { name } = req.query;

    if (!name)
        return res.status(401).json({ messages: 'You must give a name to your koak' })
    request_youtube_data(user, (playlist_id) => {
        get_liked_videos_nb(user, playlist_id, async (nb) => {
            const koak = {
                name: name,
                request: '/youtube/likevideo/reddit/postrandomurl',
                action_service: 'youtube',
                reaction_serve: 'reddit',
                description: 'Partage un site aléatoire dans /rcantbanmeonmyowncomm quand vous aimez une vidéo',
                verif_value: nb,
                playlist_id
            };
            await User.findByIdAndUpdate(user._id, { $push: { koaks: koak } });
        })
    })
    return res.status(200).json({ messages: 'kouak /youtube/likevideo/reddit/postrandomurl successfully connected' });
}

function create_youtube_youtube(req, res) {
    const { user } = req;
    const { name } = req.query;
    const playlist_to_add_id = req.query.playlist_name;

    if (!name)
        return res.status(401).json({ messages: 'You must give a name to your koak' })
    request_youtube_data(user, (playlist_id) => {
        get_liked_videos_nb(user, playlist_id, async (nb) => {
            const koak = {
                name: name,
                request: '/youtube/likevideo/youtube/addmusictoplaylist',
                action_service: 'youtube',
                reaction_serve: 'youtube',
                description: 'Quand vous aimez une vidéo, l\'ajoute à la playlist ' + playlist_to_add_id,
                verif_value: nb,
                playlist_id: playlist_id,
                playlist_to_add_id
            };
            await User.findByIdAndUpdate(user._id, { $push: { koaks: koak } });
        })
    })
    return res.status(200).json({ messages: 'kouak /youtube/likevideo/youtube/addmusictoplaylist successfully connected' });
}

export default { create_youtube_gmail_delete, create_youtube_reddit_like, create_youtube_reddit_post, create_youtube_youtube }