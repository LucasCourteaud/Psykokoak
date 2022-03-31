import { get_spotify_fav_track_nb, add_last_liked_track_2_playlist } from '../../api/spotify/spotify_api.js';
import db from '../../models/index.js'

const User = db.Users;

function check_spotify_spotify(user, koak) {
    var current_user = undefined;
    var user_koaks = undefined;

    get_spotify_fav_track_nb(user, (nb) => {
        if (nb > koak.verif_value) {
            add_last_liked_track_2_playlist(user, koak.playlist_id, nb, async (verif_value) => {
                const current_user = await User.findById(user._id);
                const user_koaks = current_user.koaks;
                for (var i = 0; user_koaks[i] != undefined; i++)
                    if (user_koaks[i].name === koak.name)
                        await User.updateOne({ _id: user._id, "koaks.name": koak.name }, { $set: { "koaks.$.verif_value": nb } });
            })
        }
    })
}

export { check_spotify_spotify }