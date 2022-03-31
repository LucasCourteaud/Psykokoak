import express from 'express';
const app = express();
import * as fs from 'fs';
import { fileURLToPath } from 'url'
import { dirname } from 'path'
import path from 'path'
import { get_spotify_fav_track_nb, add_last_liked_track_2_playlist, get_playlist_id_spotify, get_client_id, create_spotify_playlist, request_token_spotify_from_refresh } from './api/spotify/spotify_api.js'
import { get_twitch_user_id, get_twitch_subscribe, request_token_twitch_from_refresh } from './api/twitch/twitch_api.js'
import { request_token_reddit_from_refresh, get_reddit_sub_nb, up_down_post, get_subreddit_flow_first_id, post_random_reddit_url, random_site } from './api/reddit/reddit_api.js'
import { github_user_info, github_star_nb_repo } from './api/github/github_api.js'
import { gmail_nb_mail, count_in_box, gmail_delete_last_mail } from './api/gmail/gmail_api.js'
import { add_video_to_playlist, get_last_liked_videos, get_liked_videos_nb, request_youtube_data } from './api/youtube/youtube_api.js';
import { kouaks_check } from './core/actualisation.js'
import { connect } from './config/mongo.config.js';
import cors from 'cors'

import auth from './routes/auth/index.js'
import token from './routes/token/index.js'
import koaks from './routes/koaks/index.js';
import youtube from './routes/services/youtube/index.js'
import github from './routes/services/github/index.js'
import spotify from './routes/services/spotify/index.js'
import twitch from './routes/services/twitch/index.js'
import reddit from './routes/services/reddit/index.js'
import gmail from './routes/services/gmail/index.js'

import { getClientIp } from 'request-ip';

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const filePath = path.resolve(__dirname, 'about.json')
var d = new Date();
var start_time = d.getTime()

connect();

app.use(express.json())
app.use(cors())

app.use('/auth', auth.router);
app.use('/token', token.router);
app.use('/koaks', koaks.router);
app.use('/youtube', youtube.router);
app.use('/github', github.router);
app.use('/spotify', spotify.router);
app.use('/twitch', twitch.router);
app.use('/reddit', reddit.router);
app.use('/gmail', gmail.router);

function logEvery10Seconds(i) {
    setTimeout(() => {
        console.log("10s passé")
        kouaks_check()
        logEvery10Seconds(++i);
    }, 10000)
}

function logEvery1Minute(i) {
    setTimeout(() => {
        console.log("Time to check do kouak")
        kouaks_check()
        logEvery1Minute(++i);
    }, 60000)
}

function logEvery1Hour(i) {
    setTimeout(() => {
        console.log("Time to refresh le token")
        logEvery1Hour(++i);
    }, 3480000)
}

logEvery10Seconds(0);

/*----------------------ICI-çA-FONCTIONNE----------------------*/

app.get('/about.json', (req, res) => {
    const data = fs.readFileSync(filePath, 'utf8')
    const obj = JSON.parse(data);
    var ip = getClientIp(req)
    obj.client.host = ip
    d = new Date();
    var end_time = d.getTime()
    console.log(end_time)
    var difference = end_time - start_time;
    obj.server.current_time = difference
    fs.writeFileSync('./about.json', JSON.stringify(obj))
    console.log(ip)
    res.status(200).json(obj)
})

app.get('/lol', function(req, res){
    var meme = []
    fs.readdir(
        path.resolve(__dirname, 'MEME_GENERATOR'),
        (err, files) => {
        if (err) throw err;
        for (let file of files) {
            if (file[0] != '.') {
                meme.push(file)
            }
        }
        console.log(meme)
        var ze_meme = meme[Math.floor(Math.random()*meme.length)]
        console.log(ze_meme)
        res.download('./MEME_GENERATOR' + ze_meme);
    });
});

app.get('/apk', function(req, res) {
    res.download('/mobile_app/client.apk')
})

/*----------------------TESTS-----------------------------------*/

app.post('/del_mail', (req, res) => {
    console.log("hello")
    gmail_delete_last_mail()
    res.status(200).send("ok")
})


app.post('/check', (req, res) => {
    kouaks_check()
    res.status(200).send("ok")
})

app.post('/like_post', (req, res) => {
    get_subreddit_flow_first_id((id) => {
        up_down_post(id, 1, (x) => {
            res.status(200).send("post liké :" + x)
        })
    })
})

app.post('/payload', (req, res) => {
    console.log("ze res = \n", res, "end res")
    res.status(200).send("test webhook github :")
})

app.post('/delete', (req, res) => {
    delete_kouak(req.query.name)
    res.status(200).send("kouak deleted")
})

app.get('/client', (req, res) => {
    res.status(200).json('./client.json')
    console.log("client")
})

app.post('/github_stars', (req, res) => {
    var repo_name = "workshop-trading"
    github_user_info((owner) => {
        github_star_nb_repo(owner, repo_name, (x) => {
            res.status(200).send("stars nb :" + x)
        })
    })
})

app.post('/ref_reddit', (req, res) => {
    request_token_reddit_from_refresh((x) => {
        res.status(200).send("token généré :" + x)
    })
})

app.post('/count_mail', (req, res) => {
    var count = count_in_box("SENT", (x) => {
        res.status(200).send("total : " + x)
    })
})

app.post('/gmail_nb', (req, res) => {
    gmail_nb_mail((x) => {
        res.status(200).send("nb  :" + x)
    })
})

app.post('/ref_twitch', (req, res) => {
    request_token_twitch_from_refresh((x) => {
        res.status(200).send("token généré :" + x)
    })
})

app.post('/twitch_tok', (req, res) => {
    var code = "898emrkyi4h0ghorr6ajzk39pa8ng9"
    twitch_code_to_token(code, (x) => {
        res.status(200).send("token généré :" + x)
    })
})

app.post('/post_reddit', (req, res) => {
    var url = random_site()
    post_random_reddit_url(url, (x) => {
        res.status(200).send("c posté")
    })
})

app.post('/sub_flow', (req, res) => {
    get_subreddit_flow_first_id((x) => {
        res.status(200).send("subreddit :" + x)
    })
})

app.post('/reddit/sub_nb', (req, res) => {
    get_reddit_sub_nb((x) => {
        res.status(200).send("voilà le nb :" + x)
    })
})

app.post('/reddit_token', (req, res) => {
    var code = '7ixSPjzHdj0Abzjs2FTE5yXuvl0g-A'
    request_token_reddit(code, (x) => {
        res.status(200).send("token généré :" + x)
    })
})

app.post('/spotify/get_playlist_id', (req, res) => {
    get_playlist_id_spotify("Tests", (x) => {
    })
})

app.post('/spotify/create_playlist', (req, res) => {
    create_spotify_playlist("ze insane playlist", (x) => {
    })
})

app.post('/spotify/add_last_track_to_playlist', (req, res) => {
    add_last_liked_track_2_playlist("Test", (x) => {
    })
})

app.post('/spotify/client_id', (req, res) => {
    console.log("ici")
    get_client_id((x) => {
    })
})

app.post('/ref_tok', (req, res) => {
    request_token_spotify_from_refresh(req, res);
    console.log("token modifi")
    res.status(200).send("token refresh")
})

app.post('/twitch_id', (req, res) => {
    get_twitch_user_id((x) => {
        res.status(200).send("twitch user getted")
    })
})

app.post('/twitch_sb', (req, res) => {
    get_twitch_subscribe((x) => {
        res.status(200).send("twitch sb getted")
    })
})

app.post('/spotify/fav_track_nb', (req, res) => {
    get_spotify_fav_track_nb((x) => {
        res.status(200).json('./client.json')
    })
})

app.post('/get/token/spotify', (req, res) => {
    const code = "AQDsDlK5eLQ8vmP31rCMaE5ELWpMzrDlzxqFUiAeasoGWEi--zHwruG44tx_O2CyfbMlN0IiOTA8vDFLCblngLz1vK8dDr1jlsBNNv_kzGy9GGG_mG655k7l2B3QPxXMX9UWyWR_rb70oqwOiA0_eN6Ztn0cf6IiDLjhmdh8aBgt5TdNMBKJzn7W3rpYIo2NpjffXv9ou-h8ZaXT0V1P4YotF7TPXRNx0G0IBl4ITg"
    request_token_spotify(code, (x) => {
        res.status(200).send('token généré')
    })
})

app.listen(8080, () => {
    console.log('Serveur à l\'écoute')
    console.log("start : ", start_time)
})

app.post('/youtube/likedvideos', (req, res) => {
    if (!req.user)
        return res.status(401).json({ messages: "no user connected" });
    const { user } = req;
    request_youtube_data((playlistId) => {
        get_liked_videos_nb(user, playlistId, (x) => {
            res.status(200).send("liked videos :" + x)
        })
    })
})

app.post('/youtube/addVideoToPlaylist', (req, res) => {
    const playlistToAdd = "PL47TckX0LHNLnSKBwWAKsi6-V2-k8_odQ"
    request_youtube_data((likedPlaylist) => {
        get_last_liked_videos(likedPlaylist, (videoId) => {
            add_video_to_playlist(playlistToAdd, videoId, (x) => {
                res.status(200).send("video added :" + x)
            })
        })
    })
})