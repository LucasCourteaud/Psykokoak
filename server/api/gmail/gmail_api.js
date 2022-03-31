import axios from 'axios';
import * as fs from 'fs';
import db from '../../models/index.js'

const User = db.Users;

function check_in_tab(tab, elem) {
    for (var i = 0; i != tab.length; i++) {
        if (tab[i] == elem) {
            return true
        }
    }
    return false
}

async function request_gmail_data(thread, box, token, success) {
    axios.get("https://gmail.googleapis.com/gmail/v1/users/me/threads/" + thread, {
        headers: {
            Authorization: "Bearer " + token
        }
    }).then((response) => {
        if (typeof (response.data.messages[0].labelId) !== 'undefined') {
            console.log("defini")
        }
        if (check_in_tab(response.data.messages[0].labelIds, box) == true) {
            success(1)
        } else {
            success(0);
        }
    }).catch((err) => {
        console.log("Something went wrong in request_gmail_data", err.response.status, err.response.data);
    });
};

var j = 0

function count_in_box(user, box) {
    var count = 0
    var tab = []
    gmail_mail_id(user, (id_array) => {
        const gmail = undefined;
        const toke = undefined;

        if (!user.services.google) {
            console.log("servcies gmail doesn't exist");
            return;
        }
        gmail = user.services.google;
        if (!gmail.access_token) {
            console.log("access_token gmail doesn't exist");
            return;
        }
        toke = gmail.access_token;
        const l = id_array.length
        for (var i = 0; i != l; i++) {
            const res = request_gmail_data(id_array[i].threadId, box, toke, async (value) => {
                j += 1
                if (count += value > 0) {
                    tab.push(count)
                }
                if (j >= 100) {
                    await User.updateOne({ _id: user._id, "koaks.name": koak.name }, { $set: { "koaks.$.verif_value": count } });
                }
            })
        }
    })
    return count
}

//return les id des mails
function gmail_mail_id(user, success) {
    var gmail = undefined;
    var toke = undefined;

    if (!user.services.google) {
        console.log("servcies gmail doesn't exist");
        return;
    }
    gmail = user.services.google;
    if (!gmail.access_token) {
        console.log("access_token gmail doesn't exist");
        return;
    }
    toke = gmail.access_token;
    var url = "https://gmail.googleapis.com/gmail/v1/users/me/messages";
    axios.get(url, {
        headers: {
            Authorization: "Bearer " + toke
        }
    }).then((response) => {
        console.log(response.data.messages[0])
        success(response.data.messages);
    }).catch((err) => {
        console.log("Something went wrong in gmail_mail_id", err);
    });
};

function gmail_delete_last_mail(user) {
    var gmail = undefined;
    var toke = undefined;

    if (!user.services.google) {
        console.log("servcies gmail doesn't exist");
        return;
    }
    gmail = user.services.google;
    if (!gmail.access_token) {
        console.log("access_token gmail doesn't exist");
        return;
    }
    toke = gmail.access_token;
    gmail_mail_id(user, (x) => {à
        axios.delete("https://gmail.googleapis.com/gmail/v1/users/me/messages/" + x[0].id, {
            headers: {
                'Authorization': "Bearer " + toke
            }
        }).then((response) => {
            console.log(response.data)
        }).catch((err) => {
            // console.log(x[0])
            console.log("Something went wrong in gmail_delete_last_mail", err.response.status, err.response.data);
        });
    })
};

//return le nombre de mail total partout
function gmail_nb_mail(user, success) {
    var gmail = undefined;
    var toke = undefined;

    if (!user.services.google) {
        console.log("servcies gmail doesn't exist");
        return;
    }
    gmail = user.services.google;
    if (!gmail.access_token) {
        console.log("access_token gmail doesn't exist");
        return;
    }
    toke = gmail.access_token;
    axios.get("https://gmail.googleapis.com/gmail/v1/users/me/messages", {
        headers: {
            'Authorization': "Bearer " + toke
        }
    }).then((response) => {
        console.log("total = " + response.data.resultSizeEstimate)
        success(response.data.resultSizeEstimate);
    }).catch((err) => {
        console.log("Something went wrong in gmail_nb_mail", err.response.status, err.response.data);
    });
};

export { gmail_nb_mail, count_in_box, gmail_delete_last_mail }