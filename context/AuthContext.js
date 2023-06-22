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

  async function signupwithGoogle() {
    try {
      const googleAuth = new GoogleAuthProvider();
      const userCredential = await signInWithPopup(auth, googleAuth);
      const user = userCredential.user;

      return {
        success: true,
        message: "Google signup successful.",
        user: user,
      };
    } catch (error) {
      let errorMessage;
      if (error.code === "auth/popup-closed-by-user") {
        errorMessage = "Google signup canceled by the user.";
      } else {
        errorMessage =
          "An error occurred during Google signup. Please try again later.";
      }

      return {
        success: false,
        error: errorMessage,
      };
    }
  }

  async function signup(email, password, username) {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      await updateProfile(user, { displayName: username });

      return {
        success: true,
        message: "Signup successful.",
        user: user,
      };
    } catch (error) {
      let errorMessage;
      if (error.code === "auth/email-already-in-use") {
        errorMessage =
          "The email address is already in use. Please choose a different email.";
      } else if (error.code === "auth/weak-password") {
        errorMessage =
          "The password is too weak. Please choose a stronger password.";
      } else {
        errorMessage =
          "An error occurred during signup. Please try again later.";
      }

      return {
        success: false,
        error: errorMessage,
      };
    }
  }

  async function login(email, password) {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      return {
        success: true,
        message: "Login successful.",
      };
    } catch (error) {
      let errorMessage;
      if (error.code === "auth/user-not-found") {
        errorMessage = "User not found.";
      } else if (error.code === "auth/wrong-password") {
        errorMessage = "Wrong password.";
      } else {
        errorMessage =
          "An error occurred during login. Please try again later.";
      }
      return {
        success: false,
        error: errorMessage,
      };
    }
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
