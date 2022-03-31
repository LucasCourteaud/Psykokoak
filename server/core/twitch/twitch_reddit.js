import { get_twitch_subscribe, get_twitch_user_id } from '../../api/twitch/twitch_api.js'
import { get_subreddit_flow_first_id, up_down_post, random_site, post_random_reddit_url } from '../../api/reddit/reddit_api.js'
import db from '../../models/index.js'

const User = db.Users;

function check_twitch_follow_reddit_post(user, koak) {
    get_twitch_subscribe(user, koak.twitch_user_id,(nb) => {
        if (nb > koak.verif_value) {
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

function check_twitch_unfollow_reddit_post(user, koak) {
    get_twitch_subscribe(user, koak.twitch_user_id, (nb) => {
        if (nb < koak.verif_value) {
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

function check_twitch_follow_reddit_like(user, koak) {
    get_twitch_subscribe(user, koak.twitch_user_id, (nb) => {
        if (nb > koak.verif_value) {
            get_subreddit_flow_first_id(user, (id) => {
                up_down_post(user, id, 1, async () => {
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

function check_twitch_unfollow_reddit_like(user, koak) {
    get_twitch_subscribe(user, koak.twitch_user_id, (nb) => {
        if (nb < koak.verif_value) {
            get_subreddit_flow_first_id(user, (id) => {
                up_down_post(user, id, 1, async () => {
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

export { check_twitch_follow_reddit_like, check_twitch_unfollow_reddit_like, check_twitch_follow_reddit_post, check_twitch_unfollow_reddit_post }