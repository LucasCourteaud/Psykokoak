import axios from 'axios';

function request_youtube_data(user, success) {
    var youtube = undefined;
    var toke = undefined;

    if (!user.services.google) {
        console.log("servcies youtube doesn't exist");
        return;
    }
    youtube = user.services.google;
    if (!youtube.access_token) {
        console.log("access_token youtube doesn't exist");
        return;
    }
    toke = youtube.access_token;
    axios.get("https://www.googleapis.com/youtube/v3/channels?part=contentDetails&mine=true", {
        headers: {
            'Content-type': "application/json",
            Authorization: "Bearer " + toke
        }
    }).then((response) => {
        success(response.data.items[0].contentDetails.relatedPlaylists.likes)
    }).catch((err) => {
        console.log("Something went wrong in request_youtube_data", err.response.status, err.response.data);
    });
};

function get_liked_videos_nb(user, playlistId, success) {
    var youtube = undefined;
    var toke = undefined;

    if (!user.services) {
        console.log("no servcies for user: " + user.credential);
        return;
    }
    youtube = user.services.google;
    if (!youtube.access_token) {
        console.log("access_token youtube doesn't exist");
        return;
    }
    toke = youtube.access_token;
    axios.get("https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=" + playlistId, {
        headers: {
            'Content-type': "application/json",
            Authorization: "Bearer " + toke
        }
    }).then((response) => {
        success(response.data.pageInfo.totalResults)
    }).catch((err) => {
        console.log("Something went wrong in get_liked_videos_nb", err.response.status, err.response.data);
    });
}

function get_last_liked_videos(user, playlistId, success) {
    var youtube = undefined;
    var toke = undefined;

    if (!user.services.google) {
        console.log("servcies youtube doesn't exist");
        return;
    }
    youtube = user.services.google;
    if (!youtube.access_token) {
        console.log("access_token youtube doesn't exist");
        return;
    }
    toke = youtube.access_token;
    axios.get("https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=" + playlistId, {
        headers: {
            'Content-type': "application/json",
            Authorization: "Bearer " + toke
        }
    }).then((response) => {
        success(response.data.items[0].snippet.resourceId.videoId)
    }).catch((err) => {
        console.log("Something went wrong in get_last_liked_videos", err.response.status, err.response.data);
    });
}

function add_video_to_playlist(user, playlistId, videoId, success) {
    var youtube = undefined;
    var toke = undefined;

    if (!user.services.google) {
        console.log("servcies youtube doesn't exist");
        return;
    }
    youtube = user.services.google;
    if (!youtube.access_token) {
        console.log("access_token youtube doesn't exist");
        return;
    }
    console.log(videoId, playlistId)
    toke = youtube.access_token;
    var data = '{\n  "snippet": {\n    "playlistId": "' + playlistId + '",\n    "position": 0,\n    "resourceId": {\n      "kind": "youtube#video",\n      "videoId": "' + videoId + '"\n    }\n  }\n}';
    var config = {
        method: 'post',
        url: 'https://www.googleapis.com/youtube/v3/playlistItems?part=snippet',
        headers: {
            'Authorization': 'Bearer ' + toke,
            'Content-Type': 'text/plain'
        },
        data: data
    };
    axios(config).then(function () {
        success(1);
    }).catch((err) => {
        console.log("Something went wrong in add_video_to_playlist", err.response.status, err.response.data);
    });
}

export { request_youtube_data, get_liked_videos_nb, add_video_to_playlist, get_last_liked_videos };