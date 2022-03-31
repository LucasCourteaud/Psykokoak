import firebase from "../config/firebase-config";
import { getAuth, signInWithPopup, GoogleAuthProvider, GithubAuthProvider,
        createUserWithEmailAndPassword, signOut, signInWithEmailAndPassword
      } from "firebase/auth"
import { postTokenToServer, postUserIdToServer } from "../components/SendRequests";

var auth = getAuth(firebase);
const refreshPage = () => { window.location.assign('/connection'); }

//// Firebase ////

export const FbRegister = async (registerEmail, registerPassword) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, registerEmail, registerPassword)
    const user = userCredential.user;
    sessionStorage.setItem("UserId", auth.currentUser.uid)
    console.log(user);
  } catch (error) {
      console.log(error);
  }
};

export const FbLogin = async (loginEmail, loginPassword) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, loginEmail, loginPassword)
    const user = userCredential.user;
    sessionStorage.setItem("UserId", auth.currentUser.uid)
    console.log(user);
  } catch(error) {
    console.log(error);
  }
};

export const FbLogout = () => {
  signOut(auth);
};

//// Google ////
const googleProvider = new GoogleAuthProvider();
googleProvider.addScope('profile');
googleProvider.addScope('email');
googleProvider.addScope('https://mail.google.com/');
googleProvider.addScope('https://www.googleapis.com/auth/youtube');
googleProvider.addScope('https://www.googleapis.com/auth/youtube.readonly')

// Sign in using a popup.
export const signInWithGoogle = async () => {
  signInWithPopup(auth, googleProvider)
  .then((result) => {
     // This gives you a Google Access Token.
    const credentials = GoogleAuthProvider.credentialFromResult(result);
    sessionStorage.setItem("GoogleToken", credentials.accessToken)
    if (!sessionStorage.getItem("UserId"))
      sessionStorage.setItem("UserId", auth.currentUser.uid)
    postUserIdToServer("register", sessionStorage.getItem("UserId"))
    postTokenToServer("google", credentials.accessToken, "", sessionStorage.getItem("UserId"))
    refreshPage()
  }) // Catching errors
  .catch((error) => {
    console.log(error);
  })
}

//// Github /////
const githubProvider = new GithubAuthProvider();
githubProvider.addScope('repo');
githubProvider.addScope('user');

// Sign in using a popup.
export const signInWithGithub = async () => {
  signInWithPopup(auth, githubProvider)
  .then((result) => {
    // The signed-in user info.
    const user = result.user;

    // This gives you a Github Access Token.
    const credentials = GithubAuthProvider.credentialFromResult(result);

    // Stocking infos
    if (!sessionStorage.getItem("UserId"))
      sessionStorage.setItem("UserId", auth.currentUser.uid)
    sessionStorage.setItem("GithubToken", credentials.accessToken)
    postUserIdToServer("register", sessionStorage.getItem("UserId"))
    postTokenToServer("github", credentials.accessToken, "", sessionStorage.getItem("UserId"))
    refreshPage();
  })
  .catch((error) => {
    console.log(error);
  })
}