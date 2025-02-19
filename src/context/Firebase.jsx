import firebaseApp from "../firebase/firebase.config";
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";

/************************************* Context **************************************************/
const { createContext, useContext, useEffect, useState } = require("react");

const FirebaseContext = createContext(null);
export const useFirebase = () => useContext(FirebaseContext);
/************************************************************************************************/

// creating instance of auth
const firebaseAuth = getAuth(firebaseApp);
const googleProvider = new GoogleAuthProvider();

export const FirebaseProvider = (props) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(firebaseAuth, (userCredentials) => {
      if (userCredentials) {
        setUser(userCredentials);
      } else {
        setUser(null);
      }
    });
  }, []);

  // Signup
  const signupUserWithEmailAndPassword = (email, password) => {
    createUserWithEmailAndPassword(firebaseAuth, email, password)
      .then((user) => {
        alert("Account Created successfully.....");
      })
      .catch((e) => alert("Error Occured", e.message));
  };

  // Login
  const signinUserWithEmailAndPassword = (email, password) => {
    signInWithEmailAndPassword(firebaseAuth, email, password)
      .then(() => alert("Account Loggedin successfully....."))
      .catch((e) => alert("Error Occured", e.message));
  };

  // GoogleLogin
  const signinWithGoogle = () => {
    signInWithPopup(firebaseAuth, googleProvider).then((user) => {
      alert("Signed in with google");
    });
  };

  const isLogged = user ? true : false;

  const appInfo = {
    signupUserWithEmailAndPassword,
    signinUserWithEmailAndPassword,
    signinWithGoogle,
    user,
    isLogged,
  };

  return (
    <FirebaseContext.Provider value={appInfo}>
      {props.children}
    </FirebaseContext.Provider>
  );
};
