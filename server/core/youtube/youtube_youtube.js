import { get_liked_videos_nb, get_last_liked_videos, add_video_to_playlist } from '../../api/youtube/youtube_api.js';
import db from '../../models/index.js'

const User = db.Users;

function check_youtube_youtube(user, koak) {
    get_liked_videos_nb(user, koak.playlist_id, (nb) => {
        console.log("reponse = ", nb)
        if (nb > koak.verif_value) {
            get_last_liked_videos(user, koak.playlist_id, (videoId) => {
                console.log(videoId)
                add_video_to_playlist(user, koak.playlist_to_add_id, videoId, async () => {
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

export { check_youtube_youtube }