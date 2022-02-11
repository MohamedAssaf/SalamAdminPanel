import React from "react";
import logo from "../../../Assets/SLogo1.png";
import "./Main.css";
import { useRecoilState } from "recoil";
import { websiteLanguageState } from "../../../RecoilResources/Atoms";
import { getLanguagePhrase, getLanguageConstant } from "../../../Utilities/Helpers";

const Main = function () {
  const [lang] = useRecoilState(websiteLanguageState);

  return (
    <div
      className="Body"
      style={{
        backgroundSize: "50px",
      }}
    >
      <div className="intro">
        <img src={logo} width={350} alt="logo"></img>
      </div>

    </div>
  );
};

export default Main;
