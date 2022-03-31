import db from '../models/index.js'

const User = db.Users;

async function checkCredential(req, res, next) {
    const credential = req.body.credential;
    let user = undefined;

    if (!credential)
        return res.status(400).json({ message: 'You must give credential in body' });
    try {
        user = await User.findOne({ credential });
        if (!user)
            return res.status(401).json({ message: "Unauthorized" });
    } catch (error) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    req.user = user;
    return next();
}

export default { checkCredential }