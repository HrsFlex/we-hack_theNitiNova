import React from "react";
import { useTranslation } from "react-i18next";
import {
  FaFileAlt,
  FaPencilAlt,
  FaCode,
  FaUsers,
  FaEnvelope,
  FaGavel,
  FaStop,
  FaCalculator,
  FaRobot,
  FaSyncAlt,
  FaBriefcase,
  FaAmbulance,
  FaHandshake,
  FaShieldAlt,
  FaKey,
  FaUserCircle,
  FaSearch,
  FaSearchPlus,
  FaRegFilePdf,
  FaChild,
  FaNewspaper,
  FaSearchengin,
} from "react-icons/fa";
import { IoMdClose } from "react-icons/io";

// Import the JSON data
import data from "./legalServices.json";

// Map of icon names to their respective components
const iconMap = {
  FaFileAlt: FaFileAlt,
  FaPencilAlt: FaPencilAlt,
  FaCode: FaCode,
  FaChild: FaChild,
  FaNewspaper: FaNewspaper,
  FaUsers: FaUsers,
  FaEnvelope: FaEnvelope,
  FaGavel: FaGavel,
  FaStop: FaStop,
  FaCalculator: FaCalculator,
  FaRobot: FaRobot,
  FaSyncAlt: FaSyncAlt,
  FaBriefcase: FaBriefcase,
  FaAmbulance: FaAmbulance,
  FaHandshake: FaHandshake,
  FaShieldAlt: FaShieldAlt,
  FaKey: FaKey,
  FaUserCircle: FaUserCircle,
  FaSearch: FaSearch,
  FaSearchPlus: FaSearchPlus,
  FaRegFilePdf: FaRegFilePdf,
  FaSearchengin: FaSearchengin,
  IoMdClose: IoMdClose, // Default icon if no match is found
};

// Function to get the icon component based on the icon name
const getIconComponent = (iconName) => {
  const IconComponent = iconMap[iconName];
  return IconComponent || IoMdClose; // Default to IoMdClose if not found
};

const LegalServices = () => {
  const { t } = useTranslation();

  // Convert the imported data to an array of services
  const services = Object.keys(data);

  return (
    <>
      <div className="flex flex-col items-center mt-20 gap-4 px-4">
        <div className="flex text-blue-700 text-center gap-3 text-lg items-center border border-slate-300 w-fit px-4 py-2 rounded-3xl">
          <FaUserCircle />
          <span>{t("Use Cases")}</span>
        </div>
        <div className="flex items-center flex-col text-center">
          <h1 className="text-4xl sm:text-5xl font-medium">
            {t("Want more use cases?")}
          </h1>
          <p className="text-base sm:text-lg text-teal-600 mt-2 max-w-lg">
            {t(
              "See how we expand our capabilities to meet all your scenarios."
            )}
          </p>
        </div>
      </div>

      <div className="px-4 sm:px-10 mt-10">
        <h1 className="text-xl font-bold mb-8 text-center">
          {t("Legal Services")}
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 ">
          {services.map((service, index) => {
            const iconName = data[service].icon;
            const IconComponent = getIconComponent(iconName); // Get the icon component
            return (
              <div
                key={index}
                className="bg-yellow-50 p-4 pr-2 pl-2 rounded-lg shadow-md flex flex-col text-center items-center"
              >
                <IconComponent className="text-3xl text-teal-700" />
                <h2 className="text-lg font-semibold mt-4">{t(service)}</h2>
                <p className="text-sm mt-2">{t(data[service].description)}</p>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default LegalServices;
