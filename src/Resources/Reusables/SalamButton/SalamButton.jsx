import React from "react";
import "./SalamButton.css";
const Button = ({text}) => (
  <div className="sign-up-button-div">
    <p className="sign-up-button">
        {text}
    </p>
  </div>
);

export default Button;
