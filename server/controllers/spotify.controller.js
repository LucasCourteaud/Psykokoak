import db from '../models/index.js'
import { get_spotify_fav_track_nb, get_playlist_id_spotify } from '../api/spotify/spotify_api.js';

const User = db.Users;

function create_spotify_spotify(req, res) {
    const { name } = req.query;
    const { playlist_name } = req.query;
    const { user } = req;

    if (!name)
        return res.status(401).json({ messages: 'You must give a name to your koak' })
    get_spotify_fav_track_nb(user, (nb) => {
        get_playlist_id_spotify(user, playlist_name, async (id_playlist) => {
            const koak = {
                name,
                request: '/spotify/addmusictofavorite/spotify/addlastlikedmusictoplaylist',
                action_service: 'spotify',
                reaction_serve: 'spotify',
                verif_value: nb,
                description: 'Quand vous aimez une musique, l\'ajoute à la playlist ' + playlist_name,
                playlist_id: id_playlist,
                playlist_name
            };
            await User.findByIdAndUpdate(user._id, { $push: { koaks: koak } });
        })
    })
    return res.status(200).json({ messages: 'kouak /spotify/addmusictofavorite/spotify/addlastlikedmusictoplaylist successfully created' });
}

function create_spotify_reddit_like(req, res) {
    const { name } = req.query;
    const { user } = req;

    if (!name)
        return res.status(401).json({ messages: 'You must give a name to your koak' })
    get_spotify_fav_track_nb(user, async (nb) => {
        const koak = {
            name,
            request: '/spotify/addmusictofavorite/reddit/likefirstpostonyourfeed',
            action_service: 'spotify',
            reaction_serve: 'reddit',
            description: 'Upvote le poste populaire le plus récent sur reddit quand vous aimez une musique',
            verif_value: nb,
        };
        await User.findByIdAndUpdate(user._id, { $push: { koaks: koak } })
    })
    return res.status(200).json({ messages: 'kouak /spotify/addmusictofavorite/reddit/likefirstpostonyourfeed successfully created' });
}

function create_spotify_reddit_post(req, res) {
    const { name } = req.query;
    const { user } = req;

    if (!name)
        return res.status(401).json({ messages: 'You must give a name to your koak' })
    get_spotify_fav_track_nb(user, async (nb) => {
        const koak = {
            name,
            request: '/spotify/addmusictofavorite/reddit/postrandomurl',
            action_service: 'spotify',
            reaction_serve: 'reddit',
            description: 'Partage un site aléatoire dans /rcantbanmeonmyowncomm quand vous aimez une musique',
            verif_value: nb,

        };
        await User.findByIdAndUpdate(user._id, { $push: { koaks: koak } })
    })
    return res.status(200).json({ messages: 'kouak /spotify/addmusictofavorite/reddit/postrandomurl successfully created' });
}

function create_spotify_gmail(req, res) {
    const { name } = req.query;
    const { user } = req;

    if (!name)
        return res.status(401).json({ messages: 'You must give a name to your koak' })
    get_spotify_fav_track_nb(user, async (nb) => {
        const koak = {
            name,
            request: '/spotify/addmusictofavorite/gmail/deletelastmail',
            action_service: 'spotify',
            reaction_serve: 'gmail',
            description: 'Supprime définitivement le dernier mail de vos boîtes quand vous aimez une musique',
            verif_value: nb,
        };
        await User.findByIdAndUpdate(user._id, { $push: { koaks: koak } })
    })
    return res.status(200).json({ messages: 'kouak /spotify/addmusictofavorite/gmail/deletelastmail successfully created' });
}

export default { create_spotify_spotify, create_spotify_reddit_like, create_spotify_reddit_post, create_spotify_gmail }