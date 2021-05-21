// import React, { useContext, useState, useEffect } from "react";
// import { auth } from "../firebase";

// const AuthContext = React.createContext();

// export function useAuth() {
//   return useContext(AuthContext);
// }
// export function AuthProvider({ children }) {
//   const [currentUser, setcurrentUser] = useState();
//   const value = {
//     currentUser,
//     signup
//   };

//   useEffect(() => {
//     // This allows us to set the user. Whenever above function is called, it will call setcurrent user
//     // The function returns a method, when we call this method it will unsubscribe this onAuthStateChange event
//     const unsubscribe = auth.onAuthStateChanged(user => {
//       setcurrentUser(user);
//     });
//     // unsubscribe will unsubscribe from the above listener
//     return unsubscribe;
//   }, []);

//   function signup(email, password) {
//     // This will create a user and will return a promise
//     return auth.createUserWithEmailAndPassword(email.password);
//   }

//   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
// }

import React, { useContext, useState, useEffect } from "react";
import { auth } from "../firebase";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  function signup(email, password) {
    return auth.createUserWithEmailAndPassword(email, password);
  }

  function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password);
  }

  function logout() {
    return auth.signOut();
  }

  function resetPassword(email) {
    return auth.sendPasswordResetEmail(email);
  }

  function updateEmail(email) {
    return currentUser.updateEmail(email);
  }

  function updatePassword(password) {
    return currentUser.updatePassword(password);
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    login,
    signup,
    logout,
    resetPassword,
    updateEmail,
    updatePassword
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
