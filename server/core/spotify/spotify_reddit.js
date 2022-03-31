import { get_spotify_fav_track_nb } from '../../api/spotify/spotify_api.js';
import { get_subreddit_flow_first_id, up_down_post, random_site, post_random_reddit_url } from '../../api/reddit/reddit_api.js'
import db from '../../models/index.js'

const User = db.Users;

/*------spotify-like-reddit-----------*/

function check_spotify_reddit_like(user, koak) {
    get_spotify_fav_track_nb(user, (nb) => {
        if (nb != koak.verif_value) {
            get_subreddit_flow_first_id(user, (id) => {
                up_down_post(user, id, 1, async (x) => {
                    const current_user = await User.findById(user._id);
                    const user_koaks = current_user.koaks;
                    for (var i = 0; user_koaks[i] != undefined; i++)
                        if (user_koaks[i].name === koak.name)
                            await User.updateOne({ _id: user._id, "koaks.name": koak.name }, { $set: { "koaks.$.verif_value": nb } });
                })
            })
        }
    })
}

/*-----spotify-post-reddit---------*/

function check_spotify_reddit_post(user, koak) {
    get_spotify_fav_track_nb(user, (nb) => {
        if (nb != koak.verif_value) {
            var url = random_site()
            post_random_reddit_url(user, url, async () => {
                const current_user = await User.findById(user._id);
                const user_koaks = current_user.koaks;
                for (var i = 0; user_koaks[i] != undefined; i++)
                    if (user_koaks[i].name === koak.name)
                        await User.updateOne({ _id: user._id, "koaks.name": koak.name }, { $set: { "koaks.$.verif_value": nb } });
            })
        }
    })
}

export { check_spotify_reddit_like, check_spotify_reddit_post }
