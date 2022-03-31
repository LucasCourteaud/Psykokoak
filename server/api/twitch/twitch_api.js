import axios from 'axios';
import qs from 'qs';
import db from '../../models/index.js'

const User = db.Users;

function request_token_twitch_from_refresh(req, res, success) {
    var twitch = undefined;
    var ref_toke = undefined;
    const { user } = req;
    var mservices = user.services;

    if (!user.services.twitch) {
        console.log("servcies twitch doesn't exist");
        return;
    }
    twitch = user.services.twitch;
    if (!twitch.refresh_token) {
        console.log("refresh_token twitch doesn't exist");
        return;
    }
    ref_toke = twitch.refresh_token;
    console.log("ref toke = " + ref_toke)
    let data = {
        grant_type: "refresh_token",
        refresh_token: ref_toke,
        client_id: "cyl5w89xsw1ybpmc1cknlkw0u3k1xq",
        client_secret: "2nbmbdh6aov5um6cexvg90ubq43dlq",
        redirect_uri: "http://localhost:8080"
    };
    axios.post("https://id.twitch.tv/oauth2/token", qs.stringify(data), {
    }).then(async (response) => {
        mservices["twitch"] = {
            access_token: response.data.access_token,
            refresh_token: response.data.refresh_token,
            id: user.services["twitch"].id
        };
        await User.findByIdAndUpdate({ _id: user._id }, {
            services: mservices
        });
        success(response.data.access_token)
        return res.status(200).json({ message: "access_token successfully refresh" });
    }).catch(err => {
        console.log("Something went wrong in request_token_twitch_from_refresh", err.response.status, err.response.data);
    });
};

function get_twitch_user_id(user, success) {
    var twitch = undefined;
    var toke = undefined;

    if (!user.services.twitch) {
        console.log("servcies twitch doesn't exist");
        return;
    }
    twitch = user.services.twitch;
    if (!twitch.access_token) {
        console.log("access_token twitch doesn't exist");
        return;
    }
    toke = twitch.access_token;
    axios.get("https://api.twitch.tv/helix/users", {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + toke,
            'Client-ID': 'cyl5w89xsw1ybpmc1cknlkw0u3k1xq',
        }
    }).then((response) => {
        console.log(response.data.data[0].id)
        success(response.data.data[0].id);
    }).catch(err => {
        console.log("Something went wrong in get_twitch_user_id", err.response.status, err.response.data);
    });
}

function get_twitch_subscribe(user, id, success) {
    var twitch = undefined;
    var toke = undefined;

    if (!user.services.twitch) {
        console.log("servcies twitch doesn't exist");
        return;
    }
    twitch = user.services.twitch;
    if (!twitch.access_token) {
        console.log("access_token twitch doesn't exist");
        return;
    }
    toke = twitch.access_token;
    axios.get("https://api.twitch.tv/helix/users/follows?from_id=" + id, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + toke,
            'Client-ID': 'cyl5w89xsw1ybpmc1cknlkw0u3k1xq',
        }
    }).then((response) => {
        console.log("reponse = ", response.data.total);
        success(response.data.total);
    }).catch(err => {
        console.log("Something went wrong in get_twitch_subscribe", err.response.status, err.response.data);
    });
}

export { get_twitch_user_id, get_twitch_subscribe, request_token_twitch_from_refresh }