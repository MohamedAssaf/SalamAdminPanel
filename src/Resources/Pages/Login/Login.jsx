import React, { useState } from "react";
import backgroundDot from "../../../Assets/salam_background_edited1.png";
import logo from "../../../Assets/SLogo1.png";
import "./Login.css";
import { useRecoilState } from "recoil";
import { websiteLanguageState } from "../../../RecoilResources/Atoms";
import {
  getLanguageConstant,
  getLanguageError,
} from "../../../Utilities/Helpers";
import { DynamicFormLabel } from "../../Reusables";
import * as validator from "../../../Utilities/Validators";
import * as _ from "lodash";
import Loader from "react-loader-spinner";
import { Button, Form, Modal } from "react-bootstrap";
import { logIn } from "../../../Utilities/Firebase";

const Login = function () {
  const [lang] = useRecoilState(websiteLanguageState);
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const hasError = (field) => {
    return errors[field];
  };
  const submit = async () => {
    setShow(true);
    let errorsObj = {};
    if (validator.validateEmail(email).status == 0) {
      errorsObj.email = getLanguageError(
        lang,
        validator.validateEmail(email).error
      );
    }
    if (validator.validateLogInPassword(password).status == 0) {
      errorsObj.password = getLanguageError(
        lang,
        validator.validateLogInPassword(password).error
      );
    }
    if (!_.isEmpty(errorsObj)) {
      setErrors(errorsObj);
      setShow(false);
      return;
    }

    let logInObj = {
      email,
      password,
    };

    await logIn(lang, logInObj);
    // setTimeout(() => setShow(false), 3000)
    setShow(false);
  };
  return (
    <div
      className="Body "
      style={{
        backgroundImage: `url(${backgroundDot})`,
        backgroundSize: "50px",
      }}
    >
      <div className="log-in-main row">
        <div className="col-md-7">
          <div className="intro">
            <img src={logo} width={350} alt="logo"></img>
          </div>
        </div>
        <div className="col-md-4">
          <div className="log-in-form">
            <Form className="form-sign-up-labels">
              <Form.Group className="mb-3" controlId="formEmail">
                <DynamicFormLabel
                  lang={lang}
                  text={getLanguageConstant(lang, "Email")}
                />
                <Form.Control
                  type="email"
                  placeholder={getLanguageConstant(lang, "EmailPlaceHolder")}
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={hasError("email") ? "error" : ""}
                />
                {hasError("email") && (
                  <Form.Text className="text-mute err-message">
                    {errors.email}
                  </Form.Text>
                )}
              </Form.Group>

              <Form.Group className="mb-3" controlId="formPassword">
                <DynamicFormLabel
                  lang={lang}
                  text={getLanguageConstant(lang, "Password")}
                />
                <Form.Control
                  type="password"
                  placeholder={getLanguageConstant(lang, "PasswordPlaceHolder")}
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={hasError("password") ? "error" : ""}
                />
                {hasError("password") && (
                  <Form.Text className="text-mute err-message">
                    {errors.password}
                  </Form.Text>
                )}
              </Form.Group>
              <div className="log-in-submit">
                <Button
                  variant="primary"
                  onClick={submit}
                  className="log-in-button"
                >
                  {getLanguageConstant(lang, "LogInButton")}
                </Button>
              </div>
            </Form>
          </div>
        </div>
      </div>

      <Modal show={show} backdrop="static" keyboard={false}>
        <Modal.Body className="modal-body-volunteer">
          Salam!
          <br />
          <Loader
            type="MutatingDots"
            color="#832685"
            secondaryColor="#1ac8dc"
            height={100}
            width={100}
          />
          <br />
          Please wait while we validate your data
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Login;
