import db from '../models/index.js'
import { github_user_info, github_star_nb_repo } from '../api/github/github_api.js';

const User = db.Users;

function create_github_reddit_post(req, res) {
    const { user } = req;
    const { name } = req.query;
    const repo_name = req.query.playlist_name;

    if (!name)
        return res.status(401).json({ messages: 'You must give a name to your koak' })
    github_user_info(user, (owner) => {
        github_star_nb_repo(user, owner, repo_name, async (nb) => {
            const koak = {
                name: name,
                request: '/github/repoisstared/reddit/postrandomurl',
                action_service: 'github',
                reaction_serve: 'reddit',
                description: 'Partage un site aléatoire dans /rcantbanmeonmyowncomm quand une personne met une étoile au repo',
                verif_value: nb,
                repo_name
            };
            await User.findByIdAndUpdate(user._id, { $push: { koaks: koak } });
        })
    })
    return res.status(200).json({ messages: 'kouak /github/repoisstared/reddit/postrandomurl successfully connected' });
}

function create_github_reddit_like(req, res) {
    const { user } = req;
    const { name } = req.query;
    const repo_name = req.query.playlist_name;

    if (!name)
        return res.status(401).json({ messages: 'You must give a name to your koak' })
    github_user_info(user, (owner) => {
        github_star_nb_repo(user, owner, repo_name, async (nb) => {
            const koak = {
                name: name,
                request: '/github/repoisstared/reddit/likefirstpostonyourfeed',
                action_service: 'github',
                reaction_serve: 'reddit',
                description: 'Upvote le poste populaire le plus récent sur reddit quand une personne met une étoile au repo',
                verif_value: nb,
                repo_name
            };
            await User.findByIdAndUpdate(user._id, { $push: { koaks: koak } });
        })
    })
    return res.status(200).json({ messages: 'kouak /github/repoisstared/reddit/likefirstpostonyourfeed successfully connected' });
}

export default { create_github_reddit_post, create_github_reddit_like }