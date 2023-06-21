"use client";
import useFetchTodos from "@/hooks/fetchTodos";
import React, { useState } from "react";
import { doc, setDoc, deleteField, serverTimestamp } from "firebase/firestore";
import { db } from "@/firebase/firebaseConfig";
import { useAuth } from "@/context/AuthContext";

function ToAddBar({ todo, setTodo, todos, setTodos }) {
  //const { todos, setTodos, loading, error } = useFetchTodos();
  const { currentUser } = useAuth();
  const handleAdd = async () => {
    console.log("added", todo);
    if (!todo) {
      return;
    }
    let highestId = 0;
    if (todos) {
      highestId = todos.reduce((maxId, todo) => {
        return Math.max(maxId, todo.id || 0);
      }, 0);
    }

    const newItem = {
      id: highestId + 1,
      desc: todo,
      stage: "new",
      datetime: new Date(),
    };
    setTodos((prevTodos) => [...prevTodos, newItem]);
    const userRef = doc(db, "users", currentUser.uid);
    await setDoc(userRef, { todos: [...todos, newItem] }, { merge: true });
    setTodo("");
  };
  return (
    <div className="flex justify-center items-center">
      <div className="bg-slate-900 m-4 md:w-[600px] ">
        <div className="flex flex-row justify-center items-center m-5 text-white ">
          <input
            type="text"
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
            className="bg-slate-700 flex-1 p-2 outline-none focus-none"
          />
          <button
            type="button"
            onClick={() => handleAdd()}
            className="bg-slate-800 p-2 hover:bg-violet-500 py-2"
          >
            ADD
          </button>
        </div>
      </div>
    </div>
  );
}

export default ToAddBar;
