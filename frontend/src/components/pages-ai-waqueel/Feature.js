import React from "react";
import { AiOutlineThunderbolt } from "react-icons/ai";
import FeatureCard from "./FeatureCard";

const Feature = () => {
  return (
    <>
      <div className="flex flex-col items-center mt-32 gap-6">
        <div className="flex text-blue-700 text-center gap-3 text-lg items-center border-2 border-slate-300 w-fit p-2 pr-4 pl-4 rounded-3xl">
          <AiOutlineThunderbolt />
          <span>Features</span>
        </div>
        <div className="flex items-center flex-col">
          <h1 className="text-5xl font-medium text-white">
            Features of AI Waqeel
          </h1>
          <br />
          <p className="text-lg w-[600px] text-center text-teal-600">
            Explore features that boost your productivity. From document
            automation to advanced research, we've got the hard work covered.
          </p>
        </div>
        <FeatureCard />
      </div>
    </>
  );
};

export default Feature;
