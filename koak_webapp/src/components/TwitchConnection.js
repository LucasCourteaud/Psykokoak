import axios from 'axios';
import QueryString from 'qs';
import React from 'react'
import { postTokenToServer } from './SendRequests';

export const getTwitchToken = (code) => {
  axios.post("https://id.twitch.tv/oauth2/token", QueryString.stringify({
    client_id: "cyl5w89xsw1ybpmc1cknlkw0u3k1xq",
      client_secret: "2nbmbdh6aov5um6cexvg90ubq43dlq",
      code: code,
      grant_type: "authorization_code",
      redirect_uri:   "http://localhost:8081",
  }))
  .then((response) => {
      console.log(response)
      sessionStorage.setItem("TwitchToken", response.data.access_token)
      sessionStorage.setItem("TwitchRefresh", response.data.refresh_token)
      postTokenToServer("twitch", response.data.access_token, response.data.refresh_token, sessionStorage.getItem("UserId"))
  }).catch(r => {
      console.log("rip twitch token");
  });
}

export default function TwitchConnection() {
    const handleTwitchConnection = () => {
      sessionStorage.setItem("ServiceConnexion", "TwitchCode")
        window.open("https://id.twitch.tv/oauth2/authorize?"
        + "response_type=code"
        + "&client_id=cyl5w89xsw1ybpmc1cknlkw0u3k1xq"
        + "&redirect_uri=http://localhost:8081"
        + "&scope=viewing_activity_read"
        + "&state=banane", '_blank')
        window.close()
    }
  return (
    <div>
      <button className="text-black py-2 px-4 rounded border-2 border-black bg-yellow-400 hover:drop-shadow-xl hover:brightness-125" onClick={handleTwitchConnection}>Connection</button>
    </div>
  )
}
