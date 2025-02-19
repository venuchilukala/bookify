import fireApp from "../firebase/firebase.config";
const { createContext, useContext } = require("react");

const FirebaseContext = createContext(null);

// Custom useFirebase hook to get access to firebase context
export const useFirebase = () => useContext(FirebaseContext);

export const FirebaseProvider = (props) => {
  return (
    <FirebaseContext.Provider value={{ author: "venu" }}>
      {props.children}
    </FirebaseContext.Provider>
  );
};
