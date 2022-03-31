import db from '../models/index.js'

const User = db.Users;

async function register(req, res) {
    const { credential } = req.body;
    let user = undefined;

    if (!credential)
        return res.status(400).json({ message: "You must give credential in body" });
    user = await User.findOne({ credential });
    if (user)
        return res.status(409).json({ message: "User already registered" });
    await User.create({ credential: credential });
    return res.status(200).json({ message: "You are successfully registered" });
}

async function login(req, res) {
    return res.status(200).json({ message: "You are successfully connected" });
}

export default { register, login }