import { get_liked_videos_nb } from '../../api/youtube/youtube_api.js';
import { gmail_delete_last_mail } from '../../api/gmail/gmail_api.js';
import db from '../../models/index.js'

const User = db.Users;

function check_youtube_gmail_delete(user, koak) {
    get_liked_videos_nb(user, koak.playlist_id, (nb) => {
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

export { check_youtube_gmail_delete }