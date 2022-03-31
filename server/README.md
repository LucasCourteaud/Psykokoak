# Getting Started with AREA

## Available services

Our AREA can use 6 services :
- Github
- Gmail
- Youtube
- Twitch
- Spotify
- Reddit

## Run the server and web client

`docker-compose build` (might take a while) and `docker-compose up`.

## Run the server only

If you only want to run the server : `cd server` and `node index.js`

The server is running on `localhost:8080`

## The server's API

You can send request to the server if you want to test things without using the client with simple request to `localhost:8080` with *Postman* for example.

### Token

Before anything else, you have to know that AREA use API of the 6 services above. If you want to use the server API, you have to use one of the client to connect to the services and give your access token to our database.

### about.json

You can access the **about.json** file with

**GET** /about.json

### Kouak's list

All kouaks created by the user can be find is this list.
Get it with:

**GET** /kouaks

## Creating Kouaks

You can create your kouaks without the client, only using the server API and a *POST* request.

**Every request to create a Kouak is a _POST_ request**

### GMAIL ACTION

|     Route    |        Params |
| :-------------: | :-------------: |
|     _/gmail/sendamail/reddit/likefirstpostonyourfeed_ |`name`: {name_of_kouak} |
|   _/gmail/sendamail/gmail/deletelastmail_    | `name`: {name_of_kouak} |
|     _/gmail/deleteamail/gmail/deletelastmail_      |`name`: {name_of_kouak}|
|     _/gmail/receiveamail/gmail/deletelastmail_ |`name`: {name_of_kouak} |
|     _/gmail/sendamail/reddit/postrandomurl_ |`name`: {name_of_kouak} |
|     _/gmail/receiveamail/reddit/postrandomurl_ |`name`: {name_of_kouak} |
|     _/gmail/deleteamail/reddit/postrandomurl_ |`name`: {name_of_kouak} |
|     _/gmail/deleteamail/reddit/likefirstpostonyourfeed_ |`name`: {name_of_kouak} |

### GITHUB ACTION

|     Route    |        Params |
| :-------------: | :-------------: |
|     _/github/repoisstared/reddit/postrandomurl_ |`name`: {name_of_kouak},`playlist_name`: {repo_name} |
|   _/github/repoisstared/reddit/likefirstpostonyourfeed_    | `name`: {name_of_kouak}, `playlist_name`: {repo_name}  |

### REDDIT ACTION

|     Route    |        Params |
| :-------------: | :-------------: |
|     _/reddit/followsubreddit/reddit/likefirstpostonyourfeed_ |`name`: {name_of_kouak} |
|   _/reddit/unfollowsubreddit/reddit/likefirstpostonyourfeed_    | `name`: {name_of_kouak} |
|     _/reddit/followsubreddit/reddit/postrandomurl_      |`name`: {name_of_kouak}|
|     _/reddit/unfollowsubreddit/reddit/postrandomurl_ |`name`: {name_of_kouak} |
|     _/reddit/followsubreddit/gmail/deletelastmail_ |`name`: {name_of_kouak} |
|     _/reddit/unfollowsubreddit/gmail/deletelastmail_ |`name`: {name_of_kouak} |

### SPOTIFY ACTION

|     Route    |        Params |
| :-------------: | :-------------: |
|     _/spotify/addmusictofavorite/spotify/addlastlikedmusictoplaylist_ |`name`: {name_of_kouak}, `playlist_name`: {name_of_the_playlist} |
|   _/spotify/addmusictofavorite/reddit/likefirstpostonyourfeed_    | `name`: {name_of_kouak} |
|     _/spotify/addmusictofavorite/reddit/postrandomurl_      |`name`: {name_of_kouak}|
|     _/spotify/addmusictofavorite/gmail/deletelastmail_ |`name`: {name_of_kouak} |

### TWITCH ACTION

|     Route    |        Params |
| :-------------: | :-------------: |
|     _/twitch/followaccount/gmail/deletelastmail_ |`name`: {name_of_kouak} |
|   _/twitch/unfollowaccount/gmail/deletelastmail_    | `name`: {name_of_kouak} |
|     _/twitch/followaccount/reddit/postrandomurl_      |`name`: {name_of_kouak}|
|     _/twitch/unfollowaccount/reddit/postrandomurl_ |`name`: {name_of_kouak} |
|     _/twitch/followaccount/reddit/likefirstpostonyourfeed_ |`name`: {name_of_kouak} |
|     _/twitch/unfollowaccount/reddit/likefirstpostonyourfeed_ |`name`: {name_of_kouak} |

### YOUTUBE ACTION

|     Route    |        Params |
| :-------------: | :-------------: |
|     _/youtube/likevideo/youtube/addmusictoplaylistp_ |`name`: {name_of_kouak}, `playlist_name`: {name_of_the_playlist} |
|   _/youtube/likevideo/gmail/deletelastmail_    | `name`: {name_of_kouak} |
|     _/youtube/likevideo/reddit/likefirstpostonyourfeed_      |`name`: {name_of_kouak}|
|     _/youtube/likevideo/reddit/postrandomurl_ |`name`: {name_of_kouak} |

## USEFULL ROUTES

The routes below can be useful :)

|     Route    |        Description |
| :-------------: | :-------------: |
|     _/check_ | force the actualisation of the Kouaks and execute the reaction if the action is detected|

## Intermediate  tests

If you are connected to every services, you can use our server's API as an intermediary to the services's API.

Request must be **POST**.

### GMAIL API

|     Route    |        Description |
| :-------------: | :-------------: |
|     */del_mail* | Delete permanently the last mail|
|     */gmail_nb* | Get the total nb of your mail|

### REDDIT API

|     Route    |        Description |
| :-------------: | :-------------: |
|     */like_post* | Upvote the last post in r/popular|
|     */post_reddit* |Post a random url on r/cantbanmeonmyowncomm|
|     */sub_flow* | Get the id of the latest post on r/popular|
|     */reddit/sub_nb* |Get the nb of subreddit you are subscribed to|

### SPOTIFY API

|     Route    |        Description |
| :-------------: | :-------------: |
|     */spotify/client_id* | Get your ID|
|     */spotify/fav_track_nb* | Get the total nb of your liked song|

### TWITCH API

|     Route    |        Description |
| :-------------: | :-------------: |
|     */twitch_id* | Get your ID|
|     */twitch_sb* | Get the nb of channels you are subscribed to|

## Psyduck

![This is a alt text.](https://www.media.pokekalos.fr/img/pokemon/home/psykokwak.png "This is a sample image.")

This is Psyduck aka Psychokwak in french.
