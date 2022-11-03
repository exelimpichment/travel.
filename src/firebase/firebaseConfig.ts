import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider, signInWithRedirect, signOut } from "firebase/auth";
import { useAuthState } from 'react-firebase-hooks/auth';
import { FacebookAuthProvider,  } from "firebase/auth";




export const firebaseConfig = {
  apiKey: "AIzaSyBNyvqKLPWDC_f5cfK4-xwn8xE_cjJiYdU",
  authDomain: "travel-b025d.firebaseapp.com",
  projectId: "travel-b025d",
  storageBucket: "travel-b025d.appspot.com",
  messagingSenderId: "98623984867",
  appId: "1:98623984867:web:1de70fede318ea076d21d6"
};

export const app = initializeApp(firebaseConfig);
export const provider = new GoogleAuthProvider();
export const auth = getAuth();

// =================FACEBOOK VERIF================================
const facebookProvider = new FacebookAuthProvider();




  export {signInWithRedirect, signOut, handleSignOut, useAuthState, facebookProvider}


//   ============TEMP====================
const handleSignOut = () => {
        console.log("sign out");
        
signOut(auth).then(() => {
  // Sign-out successful.
}).catch((error) => {
  // An error happened.
});
};