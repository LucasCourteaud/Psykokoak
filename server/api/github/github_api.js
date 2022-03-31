import axios from 'axios';

//get the user infos from access token
function github_user_info(user, success) {
    var github = undefined;
    var toke = undefined;

    if (!user.services.github) {
        console.log("servcies github doesn't exist");
        return;
    }
    github = user.services.github;
    if (!github.access_token) {
        console.log("access_token github doesn't exist");
        return;
    }
    toke = github.access_token;
    axios.get("https://api.github.com/user", {
        headers: {
            'Accept': 'application/vnd.github.v3+json',
            'Authorization': "token " + toke
        }
    })
    .then((response) => {
        console.log("reponse = ", response.data.login);
        success(response.data.login);
    }).catch((err) => {
        console.log("Something went wrong in github_user_info", err.response.status, err.response.data);
    });
}

//get the number of stars of the repo passed in argument
function github_star_nb_repo(user, owner, repo, success) {
    var github = undefined;
    var toke = undefined;

    if (!user.services.github) {
        console.log("servcies github doesn't exist");
        return;
    }
    github = user.services.github;
    if (!github.access_token) {
        console.log("access_token github doesn't exist");
        return;
    }
    toke = github.access_token;
    axios.get(" https://api.github.com/repos/" + owner + "/" + repo, {
        headers: {
            'Accept': 'application/vnd.github.v3+json',
            'Authorization': "token " + toke
        }
    })
        .then((response) => {
            console.log("reponse = ", response.data.stargazers_count);
            success(response.data.stargazers_count);
        }).catch((err) => {
            console.log("Something went wrong in github_star_nb_repo", err.response.status, err.response.data);
        });
}

export { github_user_info, github_star_nb_repo }