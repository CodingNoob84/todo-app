"use client";
import { useAuth } from "@/context/AuthContext";
import React, { useState } from "react";
const ValidationFunction = (email, password) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!email) {
    return "Please enter Email";
  } else if (!emailRegex.test(email)) {
    return "Please enter a valid Email";
  } else if (!password) {
    return "Please enter Password";
  } else {
    return null;
  }
};

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const { login, signup, currentUser } = useAuth();
  const handleGoogleSignIn = async () => {
    const result = await signup();
    console.log(result);
  };

  const handleLogin = async () => {
    setError(ValidationFunction(email, password));
    if (error === null) {
      console.log(`email=${email}; password=${password}`);
      const result = await login(email, password);
      console.log(result);
    }
  };
  console.log(currentUser);
  return (
    <div className="min-w-screen min-h-screen flex justify-center items-center bg-gradient-to-r from-purple-200 via-purple-400 to-purple-800">
      <div className="w-[350px] h-[420px] p-5 flex flex-col gap-5 border bg-slate-900 text-white shadow-2xl shadow-violet-600">
        <div className="text-xl font-bold uppercase flex justify-center items-center">
          Login
        </div>
        <div className="flex justify-center text-red-700">
          Invalid Email or Password
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex flex-col">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="outline-none bg-slate-800 p-2"
            />
          </div>
          <div className="flex flex-col">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="outline-none bg-slate-800 p-2"
            />
          </div>
          <div className="flex justify-center items-center my-[30px] ">
            <button
              type="button"
              className="outline-none w-[100px] bg-slate-800 p-2 border border-slate-900 hover:bg-violet-500 rounded-lg "
              onClick={() => handleLogin()}
            >
              Submit
            </button>
          </div>
          <div className="flex flex-row justify-center text-xs gap-2">
            <div>Create a new account? </div>
            <div
              className="underline text-violet-500 cursor-pointer"
              onClick={() => handleGoogleSignIn()}
            >
              Register
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
