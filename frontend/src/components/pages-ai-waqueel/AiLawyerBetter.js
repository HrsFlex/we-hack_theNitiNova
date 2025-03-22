import React from "react";
import { FaPlus } from "react-icons/fa6";
import AiLawyerBetterCard from "./AiLawyerBetterCard";

const AiLawyerBetter = () => {
  return (
    <>
      <div className="flex flex-col items-center mt-32 gap-6">
        <div className="flex text-blue-700 text-center gap-3 text-lg items-center border-2 border-slate-300 w-fit p-2 pr-4 pl-4 rounded-3xl">
          <FaPlus />
          <span>Advantages</span>
        </div>
        <div className="flex items-center flex-col">
          <h1 className="text-5xl font-medium text-white">
            Why our AI in law is better?
          </h1>
          <br />
          <p className="text-lg w-[600px] text-center text-teal-600">
            In contrast to others, our LegalTech software is quick, easy, and
            wallet-friendly.
          </p>
        </div>
        <AiLawyerBetterCard />
      </div>
    </>
  );
};

export default AiLawyerBetter;
