import axios from 'axios';
import QueryString from 'qs';
import React, {useState, useEffect} from 'react'
import { useLocation } from 'react-router-dom';
import { postTokenToServer } from './SendRequests';

export const getRedditToken = (code) => {
  console.log(code)
  axios.post("https://www.reddit.com/api/v1/access_token", QueryString.stringify({
      grant_type: "authorization_code",
      code: code,
      redirect_uri:   "http://localhost:8081",
    }), {
      headers: { 
          'Authorization': 'Basic SWZOa0hfbTYyQkpvTldSZDBNUTNrQTo5YjNpTnVfWkhBUHBSZlhaSlEtWFZtSl9xYXgtV2c='
      }
  })
  .then((response) => {
    console.log(response)
    if (sessionStorage.getItem("RedditToken") === "undefined" || !sessionStorage.getItem("RedditToken")) {
      sessionStorage.setItem("RedditToken", response.data.access_token)
      sessionStorage.setItem("RedditRefresh", response.data.refresh_token)
      postTokenToServer("reddit", response.data.access_token, response.data.refresh_token, sessionStorage.getItem("UserId"))
    }
  }).catch(r => {
      console.log("rip token reddit");
  });
}

export default function RedditConnection() {
    const handleRedditConnection = () => {
      sessionStorage.setItem("ServiceConnexion", "RedditCode")
        window.open("https://www.reddit.com/api/v1/authorize?" +
        "client_id=IfNkH_m62BJoNWRd0MQ3kA" +
        "&response_type=code" +
        "&state=Connected" +
        "&redirect_uri=http://localhost:8081" +
        "&duration=permanent" +
        "&scope=identity,edit,flair,history,modconfig,modflair,modlog,modposts,modwiki,mysubreddits,privatemessages,read,report,save,submit,subscribe,vote,wikiedit,wikiread", '_blank')
        window.close()
    }
  return (
    <div>
      <button className="text-black py-2 px-4 rounded border-2 border-black bg-yellow-400 hover:drop-shadow-xl hover:brightness-125" onClick={() => {handleRedditConnection()}}>Connection</button>
    </div>
  )
}