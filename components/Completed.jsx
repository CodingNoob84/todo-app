import React from "react";
import { MdDelete } from "react-icons/md";
import { TbReload } from "react-icons/tb";

function Completed({ todos, handleCompleted }) {
  return (
    <div className="relative">
      <div className="absolute -top-2 left-[90px] w-[120px] bg-red-900 px-2 text-xl font-bold text-center rounded-md">
        Completed
      </div>
      <div className="border bg-slate-900 text-white w-[300px]">
        <div className="flex flex-col p-[20px] pt-10 gap-2">
          {todos?.map((todo, i) => (
            <div
              key={i}
              className="border border-cyan-500 flex flex-row justify-center items-center gap-1 px-3"
            >
              <div className="flex-1 py-2 text-xs">{todo.desc}</div>
              <TbReload
                size={30}
                className="scale-75 hover:scale-110 hover:text-cyan-500 cursor-pointer"
                onClick={() => handleCompleted(todo.id, "new")}
              />

              <MdDelete
                size={30}
                className="scale-75 hover:scale-110 hover:text-cyan-500 cursor-pointer"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Completed;
