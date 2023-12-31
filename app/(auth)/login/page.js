"use client";
import { useAuth } from "@/context/AuthContext";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import { FaSpinner } from "react-icons/fa";

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
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { login, signupwithGoogle, currentUser } = useAuth();
  useEffect(() => {
    if (currentUser) {
      router.push("/");
    }
  }, [currentUser, router]);
  const handleGoogleSignIn = async () => {
    await signupwithGoogle()
      .then((result) => {
        setLoading(false);
        if (result.success) {
          router.push("/");
        } else {
          setError(result.error);
        }
      })
      .catch((error) => {
        setError("An unexpected error occurred:");
      });
    //console.log(result);
  };

  const handleLogin = async () => {
    setError(null);
    setLoading(true);
    setError(ValidationFunction(email, password));
    if (error === null) {
      await login(email, password)
        .then((result) => {
          setLoading(false);
          if (result.success) {
            router.push("/");
          } else {
            setError(result.error);
          }
        })
        .catch((error) => {
          setError("An unexpected error occurred:");
        });
    }
  };

  return (
    <div className="min-w-screen min-h-screen flex justify-center items-center bg-gradient-to-r from-purple-200 via-purple-400 to-purple-800">
      <div className="w-[350px] h-[480px] p-5 flex flex-col gap-5 border bg-slate-900 text-white shadow-2xl shadow-violet-600">
        <div className="text-xl font-bold uppercase flex justify-center items-center">
          Login
        </div>
        {error && (
          <div className="flex justify-center text-red-700 text-sm">
            {error}
          </div>
        )}
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
          <div className="flex justify-center items-center my-[10px] ">
            <button
              type="button"
              className="outline-none flex justify-center w-[100px] bg-slate-800 p-2 border border-slate-900 hover:bg-violet-500 rounded-lg "
              onClick={() => handleLogin()}
            >
              {loading ? (
                <FaSpinner className="transition-all duration-100 animate-spin" />
              ) : (
                "Submit"
              )}
            </button>
          </div>
          <div className="flex justify-center items-center">or</div>
          <div
            className="flex flex-row border border-violet-400 px-3 py-2 justify-center items-center hover:bg-violet-400 hover:text-slate-200 cursor-pointer"
            onClick={() => handleGoogleSignIn()}
          >
            <FcGoogle />
            <div className="ml-4">Login with Google</div>
          </div>

          <div className="flex flex-row justify-center text-xs gap-2">
            <div>Create a new account? </div>
            <div
              className="underline text-violet-500 cursor-pointer"
              onClick={() => router.push("/register")}
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
