import React from "react";
import { AiFillFire } from "react-icons/ai";
import { FaCarSide } from "react-icons/fa";
import { FcLike } from "react-icons/fc";

function Footer() {
  return (
    <div className="w-full mt-[10px] flex flex-row px-[20px] items-center justify-center bg-slate-900 text-slate-200 h-[50px]">
      <div className="flex flex-row justify-center items-center">
        Created with <FcLike className="mx-1" /> and by{" "}
        <FaCarSide className="ml-1" />
        <AiFillFire className="mr-1 text-red-600" />{" "}
      </div>
    </div>
  );
}

export default Footer;
