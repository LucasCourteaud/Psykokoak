import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom';
import ConnectionBox from '../components/ConnectionBox'
import Layout from '../components/Layout';
import RedditConnection, { getRedditToken } from '../components/RedditConnection';
import { postTokenToServer } from '../components/SendRequests';
import SpotifyConnection, { getSpotifyToken } from '../components/SpotifyConnection';
import TwitchConnection, { getTwitchToken } from '../components/TwitchConnection';
import { signInWithGithub, signInWithGoogle, signInWithGoogleForYt } from '../service/auth';

export default function ServiceConnexion() {
    const [Google, setGoogle] = useState(sessionStorage.getItem("GoogleToken"))
    const [Github, setGithub] = useState(sessionStorage.getItem("GithubToken"))
    const [Spotify, setSpotify] = useState(sessionStorage.getItem("SpotifyToken"))
    const [Twitch, setTwitch] = useState(sessionStorage.getItem("TwitchToken"))
    const [Reddit, setReddit] = useState(sessionStorage.getItem("RedditToken"))
    const [Youtube, setYoutube] = useState(sessionStorage.getItem("YoutubeToken"))
    const location = useLocation();

    useEffect(() => {
        var code = "";
        if (sessionStorage.getItem("ServiceConnexion") === "SpotifyCode" && !Spotify) {
            code = sessionStorage.getItem("SpotifyCode")
            getSpotifyToken(code)
        } else if (sessionStorage.getItem("ServiceConnexion") === "TwitchCode" && !Twitch) {
            code = sessionStorage.getItem("TwitchCode")
            getTwitchToken(code)
        } else if (sessionStorage.getItem("ServiceConnexion") === "RedditCode" && !Reddit) {
            code = sessionStorage.getItem("RedditCode")
            getRedditToken(code)
        }
    }, [location])

    return (
        <Layout>
            <div className='flex flex-col justify-center h-4/5 gap-4'>
                <div className='flex justify-center'>
                    <span className='border-2 border-black rounded-lg p-2 bg-[#f7e8ce] text-lg text-red-600 underline underline-offset-1'>ATTENTION : Les services auquels vous n'êtes pas connectés ne fonctionneront pas lors de l'activation de vos Koaks</span>
                </div>
                <div className="flex flex-row justify-center space-x-4">
                    <ConnectionBox ServiceName="Google / Youtube" icon='fab fa-google' state={Google ? "true" : "false"}>
                        <button className="text-black py-2 px-4 rounded border-2 border-black bg-yellow-400 hover:drop-shadow-xl hover:brightness-125" onClick={signInWithGoogle}>Connection</button>
                    </ConnectionBox>
                    <ConnectionBox ServiceName="Github" icon='fab fa-github' state={Github ? "true" : "false"}>
                        <button className="text-black py-2 px-4 rounded border-2 border-black bg-yellow-400 hover:drop-shadow-xl hover:brightness-125" onClick={signInWithGithub}>Connection</button>
                    </ConnectionBox>
                    <ConnectionBox ServiceName="Spotify" icon="fab fa-spotify" state={Spotify ? "true" : "false"}>
                        <SpotifyConnection></SpotifyConnection>
                    </ConnectionBox>
                </div>
                <div className="flex flex-row justify-center space-x-4">
                    <ConnectionBox ServiceName="Reddit" icon="fab fa-reddit" state={Reddit ? "true" : "false"}>
                        <RedditConnection></RedditConnection>
                    </ConnectionBox>
                    <ConnectionBox ServiceName="Twitch" icon="fab fa-twitch" state={Twitch ? "true" : "false"}>
                        <TwitchConnection></TwitchConnection>
                    </ConnectionBox>
                </div>
                <div className='flex justify-center'>
                    <span className='border-2 border-black rounded-lg p-2 text-lg bg-[#f7e8ce] underline underline-offset-1'>Une fois connecté, rendez-vous à la création de Koaks !
                    <i className="fas fa-arrow-right my-auto ml-2 mr-2"></i>
                    <Link className='border-2 border-black bg-yellow-500 rounded-lg p-2 hover:drop-shadow-xl hover:brightness-125 my-auto' to="/mainpage">Création de Koaks</Link></span>
                </div>
            </div>
        </Layout>
    )
}
