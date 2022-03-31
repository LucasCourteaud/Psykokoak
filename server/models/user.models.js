import mongoose from "mongoose";

var Schema = mongoose.Schema;

var UserModel = new Schema({
  credential: {
    type: String,
    default: null,
  },
  services: {
    spotify: {
      type: Object,
      default: {
        access_token: {
          type: String,
          default: null,
        },
        refresh_token: {
          type: String,
          default: null,
        },
        id: {
          type: String,
          default: null,
        },
      },
    },
    github: {
      type: Object,
      default: {
        access_token: {
          type: String,
          default: null,
        },
        refresh_token: {
          type: String,
          default: null,
        },
        id: {
          type: String,
          default: null,
        },
      },
    },
    google: {
      type: Object,
      default: {
        access_token: {
          type: String,
          default: null,
        },
        refresh_token: {
          type: String,
          default: null,
        },
        id: {
          type: String,
          default: null,
        },
      },
    },
    reddit: {
      type: Object,
      default: {
        access_token: {
          type: String,
          default: null,
        },
        refresh_token: {
          type: String,
          default: null,
        },
        id: {
          type: String,
          default: null,
        },
      },
    },
    twitch: {
      type: Object,
      default: {
        access_token: {
          type: String,
          default: null,
        },
        refresh_token: {
          type: String,
          default: null,
        },
        id: {
          type: String,
          default: null,
        },
      },
    },
  },
  koaks: [],
});

const Users = mongoose.model("Users", UserModel);

export default Users;
