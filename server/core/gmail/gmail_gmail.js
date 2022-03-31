import { gmail_delete_last_mail, count_in_box } from '../../api/gmail/gmail_api.js';
import db from '../../models/index.js'

const User = db.Users;

function check_gmail_delete_gmail_delete(user, koak) {
    const nb = count_in_box(user, "TRASH");
    if (nb > koak.verif_value) {
        gmail_delete_last_mail(user, async () => {
            const current_user = await User.findById(user._id);
            const user_koaks = current_user.koaks;
            for (var i = 0; user_koaks[i] != undefined; i++)
                if (user_koaks[i].name === koak.name)
                    await User.updateOne({ _id: user._id, "koaks.name": koak.name }, { $set: { "koaks.$.verif_value": nb } });
        })
    }
}

function check_gmail_sent_gmail_delete(user, koak) {
    const nb = count_in_box(user, "SENT");
    if (nb > koak.verif_value) {
        gmail_delete_last_mail(user, async () => {
            const current_user = await User.findById(user._id);
            const user_koaks = current_user.koaks;
            for (var i = 0; user_koaks[i] != undefined; i++)
                if (user_koaks[i].name === koak.name)
                    await User.updateOne({ _id: user._id, "koaks.name": koak.name }, { $set: { "koaks.$.verif_value": nb } });
        })
    }
}

function check_gmail_receive_gmail_delete(user, koak) {
    const nb = count_in_box(user, "INBOX");
    if (nb > koak.verif_value) {
        gmail_delete_last_mail(user, async () => {
            const current_user = await User.findById(user._id);
            const user_koaks = current_user.koaks;
            for (var i = 0; user_koaks[i] != undefined; i++)
                if (user_koaks[i].name === koak.name)
                    await User.updateOne({ _id: user._id, "koaks.name": koak.name }, { $set: { "koaks.$.verif_value": nb } });
        })
    }
}


export { check_gmail_sent_gmail_delete, check_gmail_receive_gmail_delete, check_gmail_delete_gmail_delete }