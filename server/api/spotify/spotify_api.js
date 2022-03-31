import axios from 'axios';
import qs from 'qs';
import * as fs from 'fs';
import SpotifyWebApi from 'spotify-web-api-node';
import db from '../../models/index.js'

const User = db.Users;

var spotifyApi = new SpotifyWebApi({
    clientId: '37487a2e7652440380779ab859782d2a',
    clientSecret: '07beeee734de4c70aed8c4f9ca044c7a',
    redirectUri: 'http://localhost:8080'
});

function request_token_spotify_from_refresh(req, res, success) {
    var spotify = undefined;
    var ref_toke = undefined;
    const { user } = req;
    var mservices = user.services;

    if (!user.services.spotify) {
        console.log("servcies spotify doesn't exist");
        return;
    }
    spotify = user.services.spotify;
    if (!spotify.refresh_token) {
        console.log("refresh_token spotify doesn't exist");
        return;
    }
    ref_toke = spotify.refresh_token;
    let data = {
        grant_type: "refresh_token",
        refresh_token: ref_toke,
        redirect_uri: "http://localhost:8080",
    };
    axios.post("https://accounts.spotify.com/api/token", qs.stringify(data), {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': "Basic Mzc0ODdhM - 1mU3NjUyNDQwMzgwNzc5YWI4NTk3ODJkMmE6MDdiZWVlZTczNGRlNGM3MGFlZDhjNGY5Y2EwNDRjN2E=",
        }
    }).then(async (response) => {
        mservices["spotify"] = {
            access_token: response.data.access_token,
            refresh_token: response.data.refresh_token,
            id: user.services["spotify"].id
        };
        await User.findByIdAndUpdate({ _id: user._id }, {
            services: mservices
        });
        success(response.data.access_token)
        return res.status(200).json({ message: "access_token successfully refresh" });
    }).catch(err => {
        return res.status(400).json({ message: err });
    });
};

//get total number of liked track on spotify
function get_spotify_fav_track_nb(user, success) {
    var spotify = undefined;
    var toke = undefined;

    if (!user.services.spotify) {
        console.log("servcies spotify doesn't exist");
        return;
    }
    spotify = user.services.spotify;
    if (!spotify.access_token) {
        console.log("access_token spotify doesn't exist");
        return;
    }
    toke = spotify.access_token;
    axios.get("https://api.spotify.com/v1/me/tracks", {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + toke
        }
    }).then((response) => {
        console.log("total fav track: " + response.data.total);
        success(response.data.total);
    }).catch((err) => {
        console.log('Something went wrong in get_spotify_fav_track_nb');
    })
}

//get total number of liked track on spotify
function get_client_id(user, success) {
    var spotify = undefined;
    var toke = undefined;

    if (!user.services.spotify) {
        console.log("servcies spotify doesn't exist");
        return;
    }
    spotify = user.services.spotify;
    if (!spotify.access_token) {
        console.log("access_token spotify doesn't exist");
        return;
    }
    toke = spotify.access_token;
    axios.get("https://api.spotify.com/v1/me", {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + toke
        }
    }).then((response) => {
        console.log("user_Id = ", response.data.id);
        obj[0].id_service[0]['spotify'] = response.data.id
        fs.writeFileSync('./client.json', JSON.stringify(obj));
        success(response.data.id);
    }).catch(err => {
        console.log('Something went wrong in get_client_id', err.response.status, err.response.data);
    });
}

//create spotify playlist with the name entered by the user
function create_spotify_playlist(user, name) {
    var spotify = undefined;
    var toke = undefined;

    if (!user.services.spotify) {
        console.log("servcies spotify doesn't exist");
        return;
    }
    spotify = user.services.spotify;
    if (!spotify.access_token) {
        console.log("access_token spotify doesn't exist");
        return;
    }
    toke = spotify.access_token;
    spotifyApi.setAccessToken(toke);
    spotifyApi.createPlaylist(name, { 'description': 'My description', 'public': true }).then(function (data) {
        console.log('Created playlist!');
    }, function (err) {
        console.log('Something went wrong in create_spotify_playlist', err.response.status, err.response.data);
    });
}

//get spotify playlist id based on the name
function get_playlist_id_spotify(user, name, success) {
    var spotify = undefined;
    var toke = undefined;

    if (!user.services.spotify) {
        console.log("servcies spotify doesn't exist");
        return;
    }
    spotify = user.services.spotify;
    if (!spotify.access_token) {
        console.log("access_token spotify doesn't exist");
        return;
    }
    toke = spotify.access_token;
    axios.get("https://api.spotify.com/v1/me/playlists", {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + toke
        }
    }).then((response) => {
        for (let i = 0; i < response.data.items.length; i++) {
            if (response.data.items[i].name === name) {
                console.log("playlist " + name + " found");
                success(response.data.items[i].id);
            }
        }
    }).catch(err => {
        console.log('Something went wrong in get_playlist_id_spotify', err.response.status, err.response.data);
    });
}

function get_last_liked_song_id(user, success) {
    var spotify = undefined;
    var toke = undefined;

    if (!user.services.spotify) {
        console.log("servcies spotify doesn't exist");
        return;
    }
    spotify = user.services.spotify;
    if (!spotify.access_token) {
        console.log("access_token spotify doesn't exist");
        return;
    }
    toke = spotify.access_token;
    axios.get("https://api.spotify.com/v1/me/tracks", {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + toke
        }
    }).then((response) => {
        console.log("reponse = ", response.data.items[0].track.id);
        success(response.data.items[0].track.id);
    }).catch(err => {
        console.log('Something went wrong get_last_liked_song_id', err.response.status, err.response.data);
    });
}

function add_last_liked_track_2_playlist(user, playlist_id, nb, success) {
    var spotify = undefined;
    var toke = undefined;

    if (!user.services.spotify) {
        console.log("servcies spotify doesn't exist");
        return;
    }
    spotify = user.services.spotify;
    if (!spotify.access_token) {
        console.log("access_token spotify doesn't exist");
        return;
    }
    toke = spotify.access_token;
    spotifyApi.setAccessToken(toke);
    get_last_liked_song_id(user, (track_id) => {
        spotifyApi.addTracksToPlaylist(playlist_id, ["spotify:track:" + track_id]).then(function () {
            console.log('Added tracks to playlist!');
            success(nb);
        }, function (err) {
            console.log('Something went wrong add_last_liked_track_2_playlist', err.response.status, err.response.data);
        });
    })
}

export { get_spotify_fav_track_nb, add_last_liked_track_2_playlist, get_playlist_id_spotify, get_client_id, create_spotify_playlist, request_token_spotify_from_refresh };