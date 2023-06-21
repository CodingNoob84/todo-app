"use client";
import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";

const ValidationFunction = (username, email, password) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!username) {
    return "Please enter Username";
  } else if (!email) {
    return "Please enter Email";
  } else if (!emailRegex.test(email)) {
    return "Please enter a valid Email";
  } else if (!password) {
    return "Please enter Password";
  } else {
    return null;
  }
};

function RegisterPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const { login, signup, currentUser, createUser } = useAuth();
  //console.log(currentUser);

  const submitHandler = async () => {
    setError(ValidationFunction(username, email, password));
    if (error === null) {
      console.log(`username=${username}; email=${email}; password=${password}`);
      const result = await createUser(email, password, username);
      console.log(result);
    }
  };
  return (
    <div className="min-w-screen min-h-screen flex justify-center items-center bg-gradient-to-r from-purple-200 via-purple-400 to-purple-800">
      <div className="w-[350px] h-[480px] p-5 flex flex-col gap-5 border bg-slate-900 text-white shadow-2xl shadow-violet-600">
        <div className="text-xl font-bold uppercase flex justify-center items-center">
          Register
        </div>
        {error && (
          <div className="flex justify-center text-red-700">{error}</div>
        )}
        <div className="flex flex-col gap-2">
          <div className="flex flex-col">
            <label>User Name</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="outline-none bg-slate-800 p-2"
            />
          </div>
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
              onClick={() => submitHandler()}
              className="outline-none w-[100px] bg-slate-800 p-2 border border-slate-900 hover:bg-violet-500 rounded-lg "
            >
              Submit
            </button>
          </div>
          <div className="flex flex-row justify-center text-xs gap-2">
            <div>Already have account? </div>
            <div className="underline text-violet-500 cursor-pointer">
              Login
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
