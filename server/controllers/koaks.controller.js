import db from '../models/index.js'

const User = db.Users;

async function my_koaks(req, res) {
    const { user } = req;
    var current_user = undefined;
    var Users = await User.find({});

    for (var i = 0; i < Users.length; i++)
        if (Users[i].credential === user.credential)
            current_user = Users[i];
    return res.status(200).json({ koaks: current_user.koaks });
}

export default { my_koaks }