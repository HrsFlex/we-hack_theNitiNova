import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "../components/Header.css";
import logo from "../logo.png";

const Header = () => {
  useEffect(() => {
    if (
      !document.querySelector(
        'script[src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"]'
      )
    ) {
      const googleTranslateScript = document.createElement("script");
      googleTranslateScript.src =
        "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      googleTranslateScript.type = "text/javascript";
      googleTranslateScript.async = true;
      document.body.appendChild(googleTranslateScript);

      window.googleTranslateElementInit = () => {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: "en",
            includedLanguages: "hi,en,kn,mr,ur,te,ta,sa,pa,kok,gu,ml,bn,kn",
          },
          "google_translate_element"
        );
      };
    }

    const removePoweredByText = () => {
      const intervalId = setInterval(() => {
        const googleGadget = document.querySelector(".goog-te-gadget");
        if (googleGadget) {
          googleGadget.childNodes.forEach((node) => {
            if (
              node.nodeType === Node.TEXT_NODE &&
              node.nodeValue.includes("Powered by")
            ) {
              node.remove();
            }
          });

          if (!googleGadget.innerText.includes("Powered by")) {
            clearInterval(intervalId);
          }
        }
      }, 100);
    };

    setTimeout(removePoweredByText, 500);

    return () => {};
  }, []);

  const openStreamlitApp = () => {
    window.open("https://ai-waqeel.streamlit.app/", "_blank");
  };

  return (
    <header className="bg-slate-800 p-5 flex flex-wrap justify-between items-center gap-2 md:gap-6 lg:gap-8 ">
      {/* Logo */}
      <div className="w-full sm:w-auto flex justify-center sm:justify-start">
        <img
          className="w-32 md:w-44 object-contain"
          src={logo}
          alt="Company Logo"
        />
      </div>

      {/* Navigation Links */}
      <nav className="flex flex-col sm:flex-row gap-2 sm:gap-4 w-full sm:w-auto justify-center sm:justify-end">
        <Link
          to="/"
          className="text-white bg-olive-600 font-bold px-4 py-2 text-sm sm:text-base hover:underline"
        >
          Home
        </Link>
        <Link
          to="/live-hearings"
          className="text-white bg-olive-600 font-bold px-4 py-2 text-sm sm:text-base hover:underline"
        >
          Live Hearings
        </Link>
        <Link
          to="/find-lawyers"
          className="text-white bg-olive-600 font-bold px-5 py-2 hover:underline"
        >
          Find Lawyers
        </Link>
        <Link
          to="/keep-notes"
          className="text-white bg-olive-600 font-bold px-5 py-2 hover:underline"
        >
          Keep Notes
        </Link>
        <select
          className="bg-slate-900 rounded-lg text-white font-bold px-3 py-2 text-sm sm:text-base"
          aria-label="Navigation Dropdown"
          onChange={(e) => {
            if (e.target.value) {
              window.location.href = e.target.value;
            }
          }}
        >
          <option className="text-white" value="">
            Documents Sharing
          </option>
          <option value="/upload-documents">Upload Documents</option>
          <option value="/access-documents">Access Documents</option>
        </select>

        <div className="relative">
          <select
            className="bg-slate-900 rounded-lg text-white font-bold px-3 py-2 text-sm sm:text-base"
            aria-label="Navigation Dropdown"
            onChange={(e) => {
              if (e.target.value) {
                window.location.href = e.target.value;
              }
            }}
          >
            <option className="text-white" value="">
              Reading Material
            </option>
            <option value="/constitution">Constitution</option>
            <option value="/bns-section">BNS Section</option>

          </select>
        </div>
      </nav>

      {/* Login Button and Google Translate */}
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-5 items-center w-full sm:w-auto justify-center sm:justify-end">
        <button
          onClick={openStreamlitApp}
          className="bg-yellow-400 px-5 py-2 rounded-lg font-bold text-sm sm:text-base"
        >
          Login
        </button>
        <div className="right" id="google_translate_element"></div>
      </div>
    </header>
  );
};

export default Header;
