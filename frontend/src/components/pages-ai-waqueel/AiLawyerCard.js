import React from "react";
import { RiUser3Line } from "react-icons/ri";
import { FaBalanceScaleLeft } from "react-icons/fa";
import { PiHouseLineBold } from "react-icons/pi";
import { IoBookOutline } from "react-icons/io5";

const AiLawyerCard = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 p-5 text-white">
      {/* First Card */}
      <div className="bg-transparent border border-gray-700 p-5 rounded-xl shadow-xl shadow-gray-600 flex flex-col items-center hover:scale-105 transition-transform duration-300 ease-in-out">
        <span className="text-2xl">
          <RiUser3Line />
        </span>
        <div className="text-center mt-3">
          <h1 className="text-lg font-medium">AI for Legal Consumers</h1>
          <p className="text-sm mt-2 w-[200px]">
            From deciphering complex terms to understanding rights, we've got
            you covered.
          </p>
        </div>
        <img
          src="https://framerusercontent.com/images/MnCpn4abG6da9dzhmWIiGbX3ug.png"
          alt="Internet-powered"
          className="w-[150px] h-auto rounded-full mt-3 shadow-2xl shadow-gray-600"
        />
      </div>

      {/* Second Card */}
      <div className="bg-transparent border border-gray-700 p-5 rounded-xl shadow-xl shadow-gray-600 flex flex-col items-center hover:scale-105 transition-transform duration-300 ease-in-out">
        <span className="text-2xl">
          <FaBalanceScaleLeft />
        </span>
        <div className="text-center mt-3">
          <h1 className="text-lg font-medium">AI for Lawyers</h1>
          <p className="text-sm mt-2 w-[200px]">
            Let us handle the research and paperwork while you elevate client
            relationships.
          </p>
        </div>
        <img
          src="https://framerusercontent.com/images/J7RSnxadoGrkoRLnldFXCwbrJ7Y.png?scale-down-to=512"
          alt="Internet-powered"
          className="w-[150px] h-auto rounded-full mt-3 shadow-2xl shadow-gray-600"
        />
      </div>

      {/* Third Card */}
      <div className="bg-transparent border border-gray-700 p-5 rounded-xl shadow-xl shadow-gray-600 flex flex-col items-center hover:scale-105 transition-transform duration-300 ease-in-out">
        <span className="text-2xl">
          <PiHouseLineBold />
        </span>
        <div className="text-center mt-3">
          <h1 className="text-lg font-medium">AI for Law Firms</h1>
          <p className="text-sm mt-2 w-[200px]">
            Streamlining processes and boosting efficiency, we're
            revolutionizing the way law firms operate.
          </p>
        </div>
        <img
          src="https://framerusercontent.com/images/ovkMIu63Sh3wgt0cz4HpINJD4.png?scale-down-to=512"
          alt="Internet-powered"
          className="w-[150px] h-auto rounded-full mt-3 shadow-2xl shadow-gray-600"
        />
      </div>

      {/* Fourth Card */}
      <div className="bg-transparent border border-gray-700 p-5 rounded-xl shadow-xl shadow-gray-600 flex flex-col items-center hover:scale-105 transition-transform duration-300 ease-in-out">
        <span className="text-2xl">
          <IoBookOutline />
        </span>
        <div className="text-center mt-3">
          <h1 className="text-lg font-medium">AI for Law Students</h1>
          <p className="text-sm mt-2 w-[200px]">
            We've made a perfect learning tool. It helps students prepare for a
            career in law.
          </p>
        </div>
        <img
          src="https://framerusercontent.com/images/3RGh0i14WJV20WtKJRpNTA7En84.png?scale-down-to=512"
          alt="Internet-powered"
          className="w-[150px] h-auto rounded-full mt-3 shadow-2xl shadow-gray-600"
        />
      </div>
    </div>
  );
};

export default AiLawyerCard;
