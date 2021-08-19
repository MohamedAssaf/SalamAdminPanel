import React from "react";
import { getLanguageConstant } from "../../../Utilities/Helpers";
import { useRecoilState } from "recoil";
import { Link } from "react-router-dom";
import { websiteLanguageState } from "../../../RecoilResources/Atoms";

import "./SignUpBar.css";
const SignUpBar = function () {
  const [lang] = useRecoilState(websiteLanguageState);

  return (
    <div className="sign-up-bar-root-div">
      <div className="sign-up-title">
        {getLanguageConstant(lang, "SignUpTitle")}
      </div>
      <div
        className="row sign-up-bar"
      >
        <div className="col-md-4 sign-up-div">
          <p className="sign-up-button">
            <Link to="/sign_up?type=0" className="sign_up_link">
              {getLanguageConstant(lang, "Volunteer")}{" "}
            </Link>
          </p>
        </div>
        <div className="col-md-4 sign-up-div">
          <p className="sign-up-button">
            <Link to="/sign_up?type=1"  className="sign_up_link"> {getLanguageConstant(lang, "Disabled")}</Link>
          </p>
        </div>
        <div className="col-md-4 sign-up-div">
          <p className="sign-up-button">
            <Link to="/sign_up?type=2" className="sign_up_link">
              {getLanguageConstant(lang, "CharityInstitution")}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUpBar;
