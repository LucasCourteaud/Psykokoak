import axios from 'axios';
import React, {useContext} from 'react'
import { ApiRequestContext } from '../context/ApiRequestContext';
import qs from 'qs'
import { postTokenToServer } from './SendRequests';

const SpAuthEndpoint = "https://accounts.spotify.com/authorize";
const SpClientId = '37487a2e7652440380779ab859782d2a';
const RedirectURI = "http://localhost:8081";
const Scopes = ["user-follow-read",
                "user-library-read",
                "user-read-email",
                "playlist-modify-private",
                "playlist-modify-public"];
const ScopesParams = Scopes.join("%20");
const FinalAuthURI = `${SpAuthEndpoint}?client_id=${SpClientId}&redirect_uri=${RedirectURI}&scope=${ScopesParams}&response_type=code`;


// Get Spotify access token from code
export const getSpotifyToken = (code) => {
    let data = {
        grant_type: "authorization_code",
        code: code,
        redirect_uri:   "http://localhost:8081",
    };
    axios.post("https://accounts.spotify.com/api/token", qs.stringify(data), {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization':  "Basic Mzc0ODdhMmU3NjUyNDQwMzgwNzc5YWI4NTk3ODJkMmE6MDdiZWVlZTczNGRlNGM3MGFlZDhjNGY5Y2EwNDRjN2E=",
        }
    })
    .then((response) => {
        console.log(response)
        sessionStorage.setItem("SpotifyToken", response.data.access_token)
        sessionStorage.setItem("SpotifyRefresh", response.data.refresh_token)
        postTokenToServer("spotify", response.data.access_token, response.data.refresh_token, sessionStorage.getItem("UserId"))
    }).catch(r => {
        console.log("rip token spotify");
    });
}

// Get auth code from Spotify authentification
export default function SpotifyConnection() {
    // const {setState} = useContext(ApiRequestContext)
    const handleSpotifyConnection = () => {
        sessionStorage.setItem("ServiceConnexion", "SpotifyCode")
        window.open(FinalAuthURI, '_blank')
        window.close()
    }
    return (
        <div>
            <button className="text-black py-2 px-4 rounded border-2 border-black bg-yellow-400 hover:drop-shadow-xl hover:brightness-125" onClick={handleSpotifyConnection}>Connection</button>
        </div>
    )
}
