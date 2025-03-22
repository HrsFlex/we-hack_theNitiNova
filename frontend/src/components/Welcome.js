import React, { useState } from "react";
import model5 from "../model5.png";

const Welcome = () => {
  const [isTextVisible, setIsTextVisible] = useState(false);
  const [isTextVisible2, setIsTextVisible2] = useState(false);
  const [isTextVisible3, setIsTextVisible3] = useState(false);

  const handleClick = () => {
    setIsTextVisible(true);
    setIsTextVisible2(false);
    setIsTextVisible3(false);
  };

  const handleClick2 = () => {
    setIsTextVisible2(true);
    setIsTextVisible3(false);
    setIsTextVisible(false);
  };
  const handleClick3 = () => {
    setIsTextVisible3(true);
    setIsTextVisible2(false);
    setIsTextVisible(false);
  };

  const openStreamlitApp = () => {
    window.open("https://ai-waqeel.streamlit.app/", "_blank");
  };

  return (
    <>
      <div className="w-[80%] max-w-6xl bg-transparent border-gray-800 border shadow-2xl shadow-gray-700 rounded-2xl p-5 mx-auto mt-8 flex flex-col lg:flex-row justify-evenly items-center ">
        <div className="flex flex-col w-full lg:w-1/2 gap-8 p-5">
          <div>
            <h1 className="text-4xl md:text-5xl font-medium text-white">
              <span className="text-yellow-400">Vidhi-Shiksha AI : </span> your
            </h1>
            <h2 className="text-4xl md:text-5xl font-medium text-white">
              personal legal
            </h2>
            <h2 className="text-4xl md:text-5xl font-medium text-white">
              AI assistant
            </h2>
          </div>
          <div className="flex flex-wrap gap-4 items-center">
            <button
              onClick={handleClick}
              className="bg-slate-200 hover:bg-yellow-500 p-2 pl-4 pr-4 shadow-2xl text-lg font-medium border-2 border-white rounded-lg"
            >
              For Consumers
            </button>
            <button
              onClick={handleClick2}
              className="bg-slate-200 hover:bg-yellow-500 p-2 pl-4 pr-4 shadow-2xl text-lg font-medium border-2 border-white rounded-lg"
            >
              For Lawyers
            </button>
            <button
              onClick={handleClick3}
              className="bg-slate-200 hover:bg-yellow-500 p-2 pl-4 pr-4 shadow-2xl text-lg font-medium border-2 border-white rounded-lg"
            >
              For Students
            </button>
          </div>
          <div className="h-16 md:h-20">
            {isTextVisible && (
              <p
                className="w-full md:w-[350px] text-center lg:text-left text-white
              "
              >
                "Say goodbye to expensive legal consultations, long waits for
                appointments, and confusing legal texts."
              </p>
            )}
            {isTextVisible2 && (
              <p className="w-full md:w-[350px] text-center lg:text-left text-white">
                "Say goodbye to routine tasks. AI Lawyer automates your legal
                research and paperwork, granting you more free time."
              </p>
            )}
            {isTextVisible3 && (
              <p className="w-full md:w-[350px] text-center lg:text-left text-white">
                "Wave goodbye to tedious study routines. AI Tutor streamlines
                your learning and research, giving you more time to excel and
                explore."
              </p>
            )}
          </div>
          <button
            onClick={openStreamlitApp}
            className="border-2 border-white shadow-2xl bg-yellow-400 hover:bg-slate-200 font-medium p-3 text-lg md:text-xl rounded-2xl"
          >
            Use Vidhi-Shiksha AI
          </button>
        </div>
        <div className="w-full lg:w-1/2 flex justify-center mt-8 lg:mt-0">
          <img
            className="w-full sm:w-[90%] md:w-[80%] lg:w-[700px] xl:w-[900px] h-auto transition-transform duration-500 ease-in-out ml-10 dark:opacity-90 hover:scale-105 "
            src={model5}
            alt="AI Lawyer illustration"
          />
        </div>
      </div>
    </>
  );
};

export default Welcome;




