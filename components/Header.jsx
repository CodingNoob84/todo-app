import React from "react";
import { IoLogOut } from "react-icons/io5";

function Header({ currentUser }) {
  return (
    <div className="w-full flex flex-row px-[20px] items-center justify-between bg-slate-900 text-slate-200 h-[50px]">
      <div className="text-bold text-xl uppercase">Todo-App</div>
      <div className="flex flex-row items-center gap-[10px]">
        <div className="text-md">{currentUser?.displayName}</div>
        <div className="text-md hover:text-xl hover:text-violet-500 cursor-pointer">
          <IoLogOut />
        </div>
      </div>
    </div>
  );
}

export default Header;
