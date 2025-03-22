import React from "react";
import { LuUsers } from "react-icons/lu";
import AiLawyerCard from "./AiLawyerCard";
const AiLawyer = () => {
  return (
    <>
      <div className="flex flex-col items-center mt-32 gap-6">
        <div className="flex text-blue-700 text-center gap-3 text-lg items-center border-2 border-slate-300 w-fit p-2 pr-4 pl-4 rounded-3xl">
          <LuUsers />
          <span>Users</span>
        </div>
        <div className="flex items-center flex-col">
          <h1 className="text-5xl font-medium text-white">
            Why Vidhi-Shiksha AI?
          </h1>
          <br />
          <p className="text-lg w-[600px] text-center text-teal-600">
            Our goal is simple: to make justice widely available. Whether you're
            a consumer, practicing law, or studying it, we're here for you.
          </p>
        </div>
        <AiLawyerCard />
      </div>
    </>
  );
};

export default AiLawyer;
