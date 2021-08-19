import React from "react";
import backgroundDot from "../../../Assets/salam_background_edited1.png";
import logo from "../../../Assets/SLogo1.png";
import "./Main.css";
import { useRecoilState } from "recoil";
import { websiteLanguageState } from "../../../RecoilResources/Atoms";
import { getLanguagePhrase, getLanguageConstant } from "../../../Utilities/Helpers";
import { AboutUs, DualAboutUs } from "../../Reusables";
import { SignUpBar } from "../../Components";
import visionLogo from '../../../Assets/roundWorldResize.png';
import missionLogo from '../../../Assets/mission.jpeg';
import swal from "sweetalert";

const Main = function () {
  const [lang] = useRecoilState(websiteLanguageState);

  return (
    <div
      className="Body"
      style={{
        backgroundImage: `url(${backgroundDot})`,
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
