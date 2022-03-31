import axios from 'axios';
import qs from 'qs';

var sitesList = [
    'http://heeeeeeeey.com/',
    'http://thatsthefinger.com/',
    'http://cant-not-tweet-this.com/',
    'http://eelslap.com/',
    'http://www.staggeringbeauty.com/',
    'http://burymewithmymoney.com/',
    'http://www.fallingfalling.com/',
    'http://ducksarethebest.com/',
    'http://www.trypap.com/',
    'http://www.republiquedesmangues.fr/',
    'http://www.movenowthinklater.com/',
    'http://www.partridgegetslucky.com/',
    'http://www.rrrgggbbb.com/',
    'http://beesbeesbees.com/',
    'http://www.sanger.dk/',
    'http://www.koalastothemax.com/',
    'http://www.everydayim.com/',
    'http://www.leduchamp.com/',
    'http://grandpanoclothes.com/',
    'http://www.haneke.net/',
    'http://r33b.net/',
    'http://randomcolour.com/',
    'http://cat-bounce.com/',
    'http://cachemonet.com/',
    'http://www.sadforjapan.com/',
    'http://www.taghua.com/',
    'http://chrismckenzie.com/',
    'http://hasthelargehadroncolliderdestroyedtheworldyet.com/',
    'http://ninjaflex.com/',
    'http://ihasabucket.com/',
    'http://corndogoncorndog.com/',
    'http://giantbatfarts.com/',
    'http://www.ringingtelephone.com/',
    'http://www.pointerpointer.com/',
    'http://www.pleasedonate.biz/',
    'http://imaninja.com/',
    'http://willthefuturebeaweso.me/',
    'http://salmonofcapistrano.com/',
    'http://www.ismycomputeron.com/',
    'http://www.wwwdotcom.com/',
    'http://www.nullingthevoid.com/',
    'http://www.muchbetterthanthis.com/',
    'http://www.ouaismaisbon.ch/',
    'http://iamawesome.com/',
    'http://www.pleaselike.com/',
    'http://crouton.net/',
    'http://corgiorgy.com/',
    'http://www.electricboogiewoogie.com/',
    'http://www.nelson-haha.com/',
    'http://www.wutdafuk.com/',
    'http://unicodesnowmanforyou.com/',
    'http://tencents.info/',
    'http://intotime.com/',
    'http://leekspin.com/',
    'http://minecraftstal.com/',
    'http://www.riddlydiddly.com/',
    'http://www.patience-is-a-virtue.org/',
    'http://whitetrash.nl/',
    'http://www.theendofreason.com/',
    'http://zombo.com',
    'http://secretsfornicotine.com/',
    'http://pixelsfighting.com/',
    'http://crapo.la/',
    'http://baconsizzling.com/',
    'http://isitwhite.com/',
    'http://noot.space/',
    'http://tomsdog.com/',
    'http://hardcoreprawnlawn.com/',
    'http://www.omfgdogs.com/',
];

function random_site() {
    var site, range, index;
    range = 6 > sitesList.length ? sitesList.length : 6;
    index = Math.floor(Math.random() * range);
    site = sitesList[Math.floor(Math.random() * sitesList.length)];
    console.log("le site = ", site)
    return site;
};

function post_random_reddit_url(user, random_site, success) {
    var reddit = undefined;
    var toke = undefined;

    if (!user.services.reddit) {
        console.log("servcies reddit doesn't exist");
        return;
    }
    reddit = user.services.reddit;
    if (!reddit.access_token) {
        console.log("access_token reddit doesn't exist");
        return;
    }
    toke = reddit.access_token;
    let data = {
        title: 'Hey checkout this website => ',
        kind: 'link',
        url: random_site,
        sr: 'cantbanmeonmyowncomm'
    };
    axios.post("https://oauth.reddit.com/api/submit", qs.stringify(data), {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': "Bearer " + toke
        }
    }).then(async (response) => {
        success(response.data)
    }).catch(err => {
        console.log("rip random reddit", err.response.status);
    });
}

function request_token_reddit_from_refresh(user, success) {
    var reddit = undefined;
    var ref_toke = undefined;
    var mservices = user.services;

    if (!user.services.reddit) {
        console.log("servcies reddit doesn't exist");
        return;
    }
    reddit = user.services.reddit;
    if (!reddit.refresh_token) {
        console.log("refresh_token reddit doesn't exist");
        return;
    }
    ref_toke = reddit.refresh_token;
    console.log("ref toke = " + ref_toke)
    let data = {
        grant_type: "refresh_token",
        refresh_token: ref_toke,
        redirect_uri: "http://localhost:8080",
    };
    axios.post("https://www.reddit.com/api/v1/access_token", qs.stringify(data), {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': "Basic SWZOa0hfbTYyQkpvTldSZDBNUTNrQTo5YjNpTnVfWkhBUHBSZlhaSlEtWFZtSl9xYXgtV2c=",
        }
    }).then(async (response) => {
        mservices["reddit"] = {
            access_token: response.data.access_token,
            refresh_token: response.data.refresh_token,
            id: user.services["reddit"].id
        };
        await User.findByIdAndUpdate({ _id: user._id }, {
            services: mservices
        });
        success(response.data.access_token)
        return res.status(200).json({ message: "access_token successfully refresh" });
    }).catch(err => {
        return res.status(400).json({ message });
    });
};

function get_reddit_sub_nb(user, success) {
    var reddit = undefined;
    var toke = undefined;

    if (!user.services.reddit) {
        console.log("servcies reddit doesn't exist");
        return;
    }
    reddit = user.services.reddit;
    if (!reddit.access_token) {
        console.log("access_token reddit doesn't exist");
        return;
    }
    toke = reddit.access_token;
    axios.get("https://oauth.reddit.com/subreddits/mine/subscriber", {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + toke
        }
    }).then(async (response) => {
        console.log("reponse = ", response.data.data.dist);
        success(response.data.data.dist);
    }).catch(err => {
        console.log("rip reddit nb", err.response.status);
    });
}

function up_down_post(user, id, vote_value, success) {
    var reddit = undefined;
    var toke = undefined;

    if (!user.services.reddit) {
        console.log("servcies reddit doesn't exist");
        return;
    }
    reddit = user.services.reddit;
    if (!reddit.access_token) {
        console.log("access_token reddit doesn't exist");
        return;
    }
    toke = reddit.access_token;
    console.log(id, vote_value)
    let data = {
        id: id,
        dir: vote_value,
    };
    axios.post("https://oauth.reddit.com/api/vote", qs.stringify(data), {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': "Bearer " + toke
        }
    }).then(async (response) => {
        console.log(response.data)
        success(response.data)
    }).catch(err => {
        console.log("rip up down post", err.response.status);
    });
}

function get_subreddit_flow_first_id(user, success) {
    var reddit = undefined;
    var toke = undefined;

    if (!user.services.reddit) {
        console.log("servcies reddit doesn't exist");
        return;
    }
    reddit = user.services.reddit;
    if (!reddit.access_token) {
        console.log("access_token reddit doesn't exist");
        return;
    }
    toke = reddit.access_token;
    axios.get("https://oauth.reddit.com/r/popular", {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + toke
        }
    }).then(async (response) => {
        console.log("reponse = ", response.data.data.children[0].data.name, response.data.data.children[0].data.ups, response.data.data.children[0].data.title);
        success(response.data.data.children[0].data.name);
    }).catch(err => {
        console.log("rip reddit flow first", err.response.status);
    });
}

export { request_token_reddit_from_refresh, get_reddit_sub_nb, get_subreddit_flow_first_id, up_down_post, post_random_reddit_url, random_site }