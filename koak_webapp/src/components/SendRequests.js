import { async } from '@firebase/util'
import axios from 'axios'
import QueryString from 'qs'

const refreshPage = () => { window.location.assign('/connection');}

async function getKoakFromServer(id) {
    var data = JSON.stringify({
        "credential": id
    });
    var config = {
        method: 'post',
        url: 'http://localhost:8080/koaks/getmykoaks',
        headers: { 
            'Content-Type': 'application/json'
        },
        data : data
    };
    axios(config)
    .then(function (response) {
        console.log(response.data)
        sessionStorage.setItem("KoakList", JSON.stringify(response.data.koaks));
    })
    .catch(function (error) {
        console.log(error);
    });
}

async function postUserIdToServer(type, id) {
    var data = JSON.stringify({
        "credential": id
    });
    var config = {
        method: 'post',
        url: 'http://localhost:8080/auth/'+type,
        headers: {
            'Content-Type': 'application/json'
        },
        data
    };
    axios(config)
    .then(function (response) {
        console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
        if (error.response.status === 409) {
            postUserIdToServer("login", id)
            console.log("login to MDB")
            refreshPage()
        } else
            console.log(error);
    });
}

async function postTokenToServer(service, token, refresh_token, id) {
    console.log("Service=", service, "\ntoken=", token, "\nrefresh=", refresh_token, "\nUid=", id)
    var data = JSON.stringify({
        "credential": id
    });
    var config = {
        method: 'post',
        url: 'http://localhost:8080/token/'+service+'?token=' + token + "&refresh_token=" + refresh_token,
        headers: {
            'Content-Type': 'application/json'
        },
        data
    };
    axios(config)
    .then(function (response) {
        console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
        console.log(error);
    });
}

async function postCheckKoak() {
    try {
        const response = await axios.post('http://localhost:8080/check')
        console.log(response)
    } catch (error) {
        console.log(error)
    }
}

async function postKoakToServer(req, name, playlist, id) {
    console.log("Req: ", req)
    console.log("name=", name, "\nplaylist=", playlist)
    var data = JSON.stringify({
        "credential": id
    });
    var config = {
        method: 'post',
        url: req+'?name='+name+'&playlist_name='+playlist,
        headers: {
            'Content-Type': 'application/json'
        },
        data
    };
    axios(config)
    .then(function (response) {
        sessionStorage.setItem('RespMsg', 'koaksuccess')
        console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
        sessionStorage.setItem('RespMsg', 'koakerr')
        console.log(error);
    });
}

async function getApkFromServer(id) {
    var data = JSON.stringify({
        "credential": id
    });
    var config = {
        method: 'get',
        url: 'http://localhost:8080/apk',
        headers: { }
    };
    axios(config)
    .then(function (response) {
        console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
        console.log(error);
    });
}

async function getLolFromServer(id) {
    var data = JSON.stringify({
        "credential": id
    });
    var config = {
        method: 'get',
        url: 'http://localhost:8080/lol',
        headers: { }
    };
    axios(config)
    .then(function (response) {
        console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
        console.log(error);
    });
}

export {
    getKoakFromServer,
    postKoakToServer,
    postTokenToServer,
    postCheckKoak,
    postUserIdToServer,
    getApkFromServer,
    getLolFromServer
}