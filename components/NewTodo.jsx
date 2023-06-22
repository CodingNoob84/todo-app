import { useAuth } from "@/context/AuthContext";
import { db } from "@/firebase/firebaseConfig";
import { doc, setDoc } from "firebase/firestore";
import React from "react";
import { MdEdit, MdDelete } from "react-icons/md";
import { TiTick } from "react-icons/ti";

function NewTodo({ todos, handleCompleted, setTodo, setTodoId }) {
  return (
    <div className="relative">
      <div className="absolute -top-2 left-[115px] w-[70px] bg-violet-600 px-2 text-xl font-bold text-center rounded-md">
        New
      </div>
      <div className="border bg-slate-900 text-white w-[300px]">
        <div className="flex flex-col p-[20px] pt-10 gap-2">
          {todos?.map((todo, i) => (
            <div
              key={i}
              className="border border-violet-500 flex flex-row justify-center items-center gap-1 px-3 scale-80 transition-all duration-200 hover:scale-110 hover:border-violet-700 "
            >
              <div className="flex-1 py-2 text-xs">{todo.desc}</div>
              <TiTick
                size={30}
                className="scale-75 hover:scale-110 hover:text-violet-500 cursor-pointer"
                onClick={() => handleCompleted(todo.id, "completed")}
              />
              <MdEdit
                size={30}
                className="scale-75 hover:scale-110 hover:text-violet-500 cursor-pointer"
                onClick={() => {
                  setTodo(todo.desc);
                  setTodoId(todo.id);
                }}
              />
              <MdDelete
                size={30}
                className="scale-75 hover:scale-110 hover:text-violet-500 cursor-pointer"
                onClick={() => handleCompleted(todo.id, "deleted")}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default NewTodo;
