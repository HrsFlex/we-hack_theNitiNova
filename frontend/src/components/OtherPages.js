import React from "react";
import Feature from "./pages-ai-waqueel/Feature";
import AiLawyer from "./pages-ai-waqueel/AiLawyer";
import AiLawyerBetter from "./pages-ai-waqueel/AiLawyerBetter";
import AiLearn from "./pages-ai-waqueel/AiLearn";
import FundamentalRights from "../components/pages-ai-waqueel/FundamentalRights";
import AiLawyerNews from "./pages-ai-waqueel/AiLawyerNews";
// import LegalServices from "./pages-ai-waqueel/LegalServices";

const OtherPages = () => {
  return (
    <>
      <div>
        <Feature />
        <AiLawyer />
        <AiLawyerBetter />
        <AiLearn />
        <AiLawyerNews />
        <FundamentalRights />
        {/* <LegalServices /> */}
      </div>
    </>
  );
};

export default OtherPages;
