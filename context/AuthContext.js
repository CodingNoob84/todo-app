"use client";
import React, { useContext, useState, useEffect, useRef } from "react";
import { auth, db } from "@/firebase/firebaseConfig";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  signInWithPopup,
  GoogleAuthProvider,
  updateProfile,
} from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

const createUser = (username, email, password) => {
  return createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Create user document in Firestore with the username
      const { user } = userCredential;
      console.log(user);
      return user
        .updateProfile({
          displayName: username,
        })
        .then(() => {
          console.log(
            "User created with email, password, and username successfully!"
          );
        })
        .catch((error) => {
          console.error("Error creating user document:", error);
        });
    })
    .catch((error) => {
      console.error("Error creating user:", error);
    });
};

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  function signupwithGoogle() {
    const googleAuth = new GoogleAuthProvider();
    signInWithPopup(auth, googleAuth);
    return;
  }

  function signup(email, password, username) {
    return createUserWithEmailAndPassword(auth, email, password).then(
      (userCredential) => {
        const user = userCredential.user;
        return updateProfile(user, { displayName: username }).then(() => {
          return user.user;
        });
      }
    );
  }

  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  function logout() {
    return signOut(auth);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    login,
    signup,
    signupwithGoogle,
    logout,
    createUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
