import React from "react";
import { ImPower } from "react-icons/im";
import { LuCircleDollarSign } from "react-icons/lu";
import { MdOutlineSupport } from "react-icons/md";
import { FcPrivacy } from "react-icons/fc";

const AiLawyerBetterCard = () => {
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 p-5">
        {/* First card */}
        <div className="bg-yellow-50 p-5 rounded-xl shadow-2xl flex flex-col items-center hover:scale-105 transition-transform duration-300 ease-in-out">
          <span className="text-2xl">
            <ImPower />
          </span>
          <div className="text-center mt-3">
            <h1 className="text-lg font-medium">Fast</h1>
            <p className="text-sm mt-2 w-full max-w-[200px]">
              The fastest online lawyer service, ideal for avoiding expenses and
              appointments.
            </p>
          </div>
        </div>

        {/* Second card */}
        <div className="bg-yellow-50 p-5 rounded-xl shadow-2xl flex flex-col items-center hover:scale-105 transition-transform duration-300 ease-in-out">
          <span className="text-2xl">
            <LuCircleDollarSign />
          </span>
          <div className="text-center mt-3">
            <h1 className="text-lg font-medium">Cost-effective</h1>
            <p className="text-sm mt-2 w-full max-w-[200px]">
              Forget the high costs of traditional law market. The artificial
              intelligence lawyer is budget-friendly.
            </p>
          </div>
        </div>

        {/* Third card */}
        <div className="bg-yellow-50 p-5 rounded-xl shadow-2xl flex flex-col items-center hover:scale-105 transition-transform duration-300 ease-in-out">
          <span className="text-2xl">
            <MdOutlineSupport />
          </span>
          <div className="text-center mt-3">
            <h1 className="text-lg font-medium">24/7 Support</h1>
            <p className="text-sm mt-2 w-full max-w-[200px]">
              Our customer support team is always available to assist you with
              any questions about the platform.
            </p>
          </div>
        </div>

        {/* Fourth card */}
        <div className="bg-yellow-50 p-5 rounded-xl shadow-2xl flex flex-col items-center hover:scale-105 transition-transform duration-300 ease-in-out">
          <span className="text-2xl">
            <FcPrivacy />
          </span>
          <div className="text-center mt-3">
            <h1 className="text-lg font-medium">Private</h1>
            <p className="text-sm mt-2 w-full max-w-[200px]">
              We stand firm on privacy, ensuring that users' conversations
              remain secure and anonymous.
            </p>
          </div>
        </div>
      </div>

      {/* Lower Section */}
      <div className="flex flex-col lg:flex-row justify-center items-center gap-5 mt-16 px-5">
        <h1 className="text-3xl lg:text-5xl text-slate-500 text-center lg:text-left w-full lg:w-[500px]">
          Measuring our impact on your performance.
        </h1>
        {/* First Stat */}
        <div className="flex flex-col items-center lg:items-start gap-2 mt-8 lg:mt-0">
          <h1 className="text-2xl lg:text-3xl text-white">
            5 <span className="text-blue-600">Sec</span>
          </h1>
          <span className="text-center lg:text-left w-full max-w-[200px] text-white">
            To summarize any document.
          </span>
        </div>
        <div className="hidden lg:block border-2 border-white h-16 w-0"></div>

        {/* Second Stat */}
        <div className="flex flex-col items-center lg:items-start gap-2 mt-8 lg:mt-0">
          <h1 className="text-2xl lg:text-3xl text-white">
            75 <span className="text-blue-600">%</span>
          </h1>
          <span className="text-center lg:text-left w-full max-w-[200px] text-white">
            Time saved: On routine tasks.
          </span>
        </div>
        <div className="hidden lg:block border-2 border-white h-16 w-0"></div>

        {/* Third Stat */}
        <div className="flex flex-col items-center lg:items-start gap-2 mt-8 lg:mt-0">
          <h1 className="text-2xl lg:text-3xl text-white">
            90 <span className="text-blue-600">%</span>
          </h1>
          <span className="text-center lg:text-left w-full max-w-[200px] text-white">
            Cost reduction: In legal services.
          </span>
        </div>
      </div>
    </>
  );
};

export default AiLawyerBetterCard;
