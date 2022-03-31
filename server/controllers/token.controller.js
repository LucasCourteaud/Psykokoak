import db from '../models/index.js'

const User = db.Users;

async function linkServices(req, res) {
    var { service } = req.params;

    if (service === 'youtube')
        service = 'google';
    try {
        const { token } = req.query;
        const { refresh_token } = req.query;
        const { user } = req;
        let mservices = user.services;

        if (!token)
            return res.status(400).json({ message: "token must be specified" });
        mservices[service] = {
            access_token: token,
            refresh_token,
            id: user.services[service].id
        };
        console.log("Access_Token = " + token)
        console.log("Refresh_Token = " + refresh_token)
        await User.findByIdAndUpdate({ _id: user._id }, {
            services: mservices
        });
        return res.status(200).json({ message: "account successfully connected" });
    } catch (error) {
        return res.status(400).json({ message: "specified service does not exist or support link" });
    }
}

async function unLinkServices(req, res) {
    const { service } = req.params;
    const { user } = req;
    let mservices = user.services;

    try {
        if (linkServiceFunction[service].unlikeable !== true)
            return res.status(400).json({ message: "specified service does not exist or support link" });
        mservices[service] = {
            access_token: undefined,
            refresh_token: undefined,
            id: undefined
        };
        await User.findByIdAndUpdate({ _id: user._id }, { services: mservices })
    } catch (error) {
        return res.status(400).json({ message: "specified service does not exist or support unlink" });
    }
    return res.status(200).json({ message: "account successfully unlinked" });
}

export default { linkServices, unLinkServices }