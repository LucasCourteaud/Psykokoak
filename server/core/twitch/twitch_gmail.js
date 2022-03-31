import { get_twitch_subscribe } from '../../api/twitch/twitch_api.js';
import { gmail_delete_last_mail } from '../../api/gmail/gmail_api.js';
import db from '../../models/index.js'

const User = db.Users;

function check_twitch_follow_gmail_delete(user, koak) {
    get_twitch_subscribe(user, koak.twitch_user_id, (nb) => {
        if (nb > koak.verif_value) {
            gmail_delete_last_mail(user, async () => {
                const current_user = await User.findById(user._id);
                const user_koaks = current_user.koaks;
                for (var i = 0; user_koaks[i] != undefined; i++)
                    if (user_koaks[i].name === koak.name)
                        await User.updateOne({ _id: user._id, "koaks.name": koak.name }, { $set: { "koaks.$.verif_value": nb } });
            })
        }
    })
}

function check_twitch_unfollow_gmail_delete(user, koak) {
    get_twitch_subscribe(user, koak.twitch_user_id, (nb) => {
        if (nb < koak.verif_value) {
            gmail_delete_last_mail(user, async () => {
                const current_user = await User.findById(user._id);
                const user_koaks = current_user.koaks;
                for (var i = 0; user_koaks[i] != undefined; i++)
                    if (user_koaks[i].name === koak.name)
                        await User.updateOne({ _id: user._id, "koaks.name": koak.name }, { $set: { "koaks.$.verif_value": nb } });
            })
        }
    })
}

export { check_twitch_follow_gmail_delete, check_twitch_unfollow_gmail_delete }