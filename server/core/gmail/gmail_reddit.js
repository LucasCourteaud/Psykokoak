import { get_subreddit_flow_first_id, up_down_post, random_site, post_random_reddit_url, get_reddit_sub_nb } from '../../api/reddit/reddit_api.js'
import { count_in_box } from '../../api/gmail/gmail_api.js';
import db from '../../models/index.js'

const User = db.Users;

function check_gmail_sent_reddit_like(user, koak) {
    const nb = count_in_box(user, "SENT");
    if (nb > koak.verif_value) {
        get_subreddit_flow_first_id(user, (id) => {
            up_down_post(user, id, 1, async () => {
                const current_user = await User.findById(user._id);
                const user_koaks = current_user.koaks;
                for (var i = 0; user_koaks[i] != undefined; i++)
                    if (user_koaks[i].name === koak.name)
                        await User.updateOne({ _id: user._id, "koaks.name": koak.name }, { $set: { "koaks.$.verif_value": nb } });
            })
        })
    }
}

function check_gmail_delete_reddit_like(user, koak) {
    const nb = count_in_box(user, "TRASH");
    if (nb > koak.verif_value) {
        get_subreddit_flow_first_id(user, (id) => {
            up_down_post(user, id, 1, async () => {
                const current_user = await User.findById(user._id);
                const user_koaks = current_user.koaks;
                for (var i = 0; user_koaks[i] != undefined; i++)
                    if (user_koaks[i].name === koak.name)
                        await User.updateOne({ _id: user._id, "koaks.name": koak.name }, { $set: { "koaks.$.verif_value": nb } });
            })
        })
    }
}

function check_gmail_receive_reddit_like(user, koak) {
    const nb = count_in_box(user, "INBOX");
    if (nb > koak.verif_value) {
        get_subreddit_flow_first_id(user, (id) => {
            up_down_post(user, id, 1, async () => {
                const current_user = await User.findById(user._id);
                const user_koaks = current_user.koaks;
                for (var i = 0; user_koaks[i] != undefined; i++)
                    if (user_koaks[i].name === koak.name)
                        await User.updateOne({ _id: user._id, "koaks.name": koak.name }, { $set: { "koaks.$.verif_value": nb } });
            })
        })
    }
}

function check_gmail_sent_reddit_post(user, koak) {
    const nb = count_in_box(user, "SENT");
    if (nb != koak.verif_value) {
        var url = random_site()
        post_random_reddit_url(user, url, async () => {
            const current_user = await User.findById(user._id);
            const user_koaks = current_user.koaks;
            for (var i = 0; user_koaks[i] != undefined; i++)
                if (user_koaks[i].name === koak.name)
                    await User.updateOne({ _id: user._id, "koaks.name": koak.name }, { $set: { "koaks.$.verif_value": nb } });
        })
    }
}

function check_gmail_delete_reddit_post(user, koak) {
    const nb = count_in_box(user, "TRASH");
    if (nb != koak.verif_value) {
        var url = random_site()
        post_random_reddit_url(user, url, async () => {
            const current_user = await User.findById(user._id);
            const user_koaks = current_user.koaks;
            for (var i = 0; user_koaks[i] != undefined; i++)
                if (user_koaks[i].name === koak.name)
                    await User.updateOne({ _id: user._id, "koaks.name": koak.name }, { $set: { "koaks.$.verif_value": nb } });
        })
    }
}


function check_gmail_receive_reddit_post(user, koak) {
    const nb = count_in_box(user, "INBOX");
    if (nb != koak.verif_value) {
        var url = random_site()
        post_random_reddit_url(user, url, async () => {
            const current_user = await User.findById(user._id);
            const user_koaks = current_user.koaks;
            for (var i = 0; user_koaks[i] != undefined; i++)
                if (user_koaks[i].name === koak.name)
                    await User.updateOne({ _id: user._id, "koaks.name": koak.name }, { $set: { "koaks.$.verif_value": nb } });
        })
    }
}

export { check_gmail_sent_reddit_like, check_gmail_sent_reddit_post, check_gmail_receive_reddit_like, check_gmail_receive_reddit_post, check_gmail_delete_reddit_like, check_gmail_delete_reddit_post }