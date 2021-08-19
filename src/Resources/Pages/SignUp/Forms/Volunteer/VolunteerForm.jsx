import "./VolunteerForm.css";
import volunteer from "../../../../../Assets/Volunteer.png";
import { Button, Form, Modal } from "react-bootstrap";
import {
  getLanguageError,
  getLanguageConstant,
} from "../../../../../Utilities/Helpers";
import { websiteLanguageState } from "../../../../../RecoilResources/Atoms";
import { useRecoilState } from "recoil";
import { useState } from "react";
import * as validator from "../../../../../Utilities/Validators";
import * as _ from "lodash";
import { signUp } from "../../../../../Utilities/Firebase";
import { v4 as uuidv4 } from "uuid";
import { DynamicFormLabel } from "../../../../Reusables";
import Loader from "react-loader-spinner";

const VolunteerForm = function () {
  const [lang] = useRecoilState(websiteLanguageState);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const [gender, setGender] = useState("");
  const [phone, setPhone] = useState("");
  const [fbLink, setFbLink] = useState("");
  const [errors, setErrors] = useState({});
  const [idFront, setIdFront] = useState({});
  const [idBack, setIdBack] = useState({});
  const [photo, setPhoto] = useState({});
  const [show, setShow] = useState(false);

  const hasError = (field) => {
    return errors[field];
  };

  const submit = async () => {
    setShow(true);
    let errorsObj = {};
    let codeCheck = await validator.validateInvitationCode(code);
    console.log(codeCheck);
    if (validator.validateName(name).status == 0) {
      errorsObj.name = getLanguageError(
        lang,
        validator.validateName(name).error
      );
    }
    if (validator.validateEmail(email).status == 0) {
      errorsObj.email = getLanguageError(
        lang,
        validator.validateEmail(email).error
      );
    }
    if (validator.validatePhoneNumber(phone).status == 0) {
      errorsObj.phone = getLanguageError(
        lang,
        validator.validatePhoneNumber(phone).error
      );
    }
    if (validator.validatePassword(password).status == 0) {
      errorsObj.password = getLanguageError(
        lang,
        validator.validatePassword(password).error
      );
    }
    if (codeCheck.status == 0) {
      errorsObj.code = getLanguageError(lang, codeCheck.error);
    }
    if (validator.validateGender(gender).status == 0) {
      errorsObj.gender = getLanguageError(
        lang,
        validator.validateGender(gender).error
      );
    }
    if (codeCheck.status == 0) {
      errorsObj.code = getLanguageError(lang, codeCheck.error);
    }
    if (validator.validateFile(photo).status == 0) {
      errorsObj.photo = getLanguageError(
        lang,
        validator.validateFile(photo).error
      );
    }
    if (!_.isEmpty(errorsObj)) {
      setErrors(errorsObj);
      setShow(false);
      return;
    }

    let signUpObj = {
      name,
      email,
      password,
      gender,
      code,
      phone,
      fbLink,
      type: 0,
      status: 2,
      codeId: codeCheck.data,
    };
    let filesArray = [];
    filesArray.push({
      name: uuidv4() + photo.name,
      file: photo,
      id: "photo",
      path: "Pphotos/",
    });
    if (validator.validateFile(idFront).status == 1) {
      filesArray.push({
        name: uuidv4() + idFront.name,
        file: idFront,
        id: "idFront",
      });
    }
    if (validator.validateFile(idBack).status == 1) {
      filesArray.push({
        name: uuidv4() + idBack.name,
        file: idBack,
        id: "idBack",
      });
    }
    await signUp(lang, signUpObj, filesArray);
    setShow(false);
  };

  return (
    <div className="volunteer-form">
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
      <div className="row">
        <div className="col-md-3"></div>
        <div className="sign-up-role col-md-4">
          <h1>{getLanguageConstant(lang, "Volunteer")}</h1>
        </div>
        <img
          src={volunteer}
          height="20%"
          className="col-md-2"
          alt="volunteer"
        />
      </div>

      <Form className="form-sign-up-labels">
        <Form.Group className="mb-3" controlId="formName">
          <DynamicFormLabel
            lang={lang}
            text={getLanguageConstant(lang, "Name")}
          />{" "}
          <Form.Control
            type="name"
            placeholder={getLanguageConstant(lang, "NamePlaceHolder")}
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={hasError("name") ? "error" : ""}
          />
          {hasError("name") && (
            <Form.Text className="text-mute err-message">
              {errors.name}
            </Form.Text>
          )}
        </Form.Group>

        <Form.Group className="mb-3" controlId="formEmail">
          <DynamicFormLabel
            lang={lang}
            text={getLanguageConstant(lang, "Email")}
          />{" "}
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
          />{" "}
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

        <Form.Group className="mb-3" controlId="formGender">
          <DynamicFormLabel
            lang={lang}
            text={getLanguageConstant(lang, "Gender")}
          />{" "}
          <Form.Control
            as="select"
            value={gender}
            onChange={(e) => {
              setGender(e.target.value);
            }}
            className={hasError("gender") ? "error" : ""}
          >
            <option value="">
              {getLanguageConstant(lang, "GenderPlaceHolder")}
            </option>
            <option value="m">{getLanguageConstant(lang, "Male")}</option>
            <option value="f">{getLanguageConstant(lang, "Female")}</option>
          </Form.Control>
          {hasError("gender") && (
            <Form.Text className="text-mute err-message">
              {errors.gender}
            </Form.Text>
          )}
        </Form.Group>

        <Form.Group className="mb-3" controlId="formPhoneNumber">
          <DynamicFormLabel
            lang={lang}
            text={getLanguageConstant(lang, "PhoneNumber")}
          />{" "}
          <Form.Control
            type="text"
            placeholder="+201000000000"
            name="phoneNumber"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className={hasError("phone") ? "error" : ""}
          />
          {hasError("phone") && (
            <Form.Text className="text-mute err-message">
              {errors.phone}
            </Form.Text>
          )}
        </Form.Group>

        <Form.Group className="mb-3" controlId="formReferralCode">
          <DynamicFormLabel
            lang={lang}
            text={getLanguageConstant(lang, "ReferralCode")}
          />
          <Form.Control
            type="referral"
            placeholder={getLanguageConstant(lang, "ReferralCodePlaceHolder")}
            name="code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className={hasError("code") ? "error" : ""}
          />
          {hasError("code") && (
            <Form.Text className="text-mute err-message">
              {errors.code}
            </Form.Text>
          )}
        </Form.Group>

        <Form.Group className="mb-3" controlId="formReferralCode">
          <DynamicFormLabel
            lang={lang}
            text={getLanguageConstant(lang, "FbProfileLink")}
          />{" "}
          <Form.Control
            type="link"
            placeholder={getLanguageConstant(lang, "FbPlaceHolder")}
            name="fbLink"
            value={fbLink}
            onChange={(e) => setFbLink(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formPersonalPhoto">
          <DynamicFormLabel
            lang={lang}
            text={getLanguageConstant(lang, "Photo")}
          />
          <div
            className={hasError("code") ? "input-group error" : "input-group"}
          >
            <div className="custom-file">
              <input
                type="file"
                id="inputGroupFile01"
                aria-describedby="inputGroupFileAddon01"
                onChange={(e) => setPhoto(e.target.files[0])}
                className="custom-file-input"
                accept="image/*"
              />
              <label className="custom-file-label" htmlFor="inputGroupFile01">
                {_.isEmpty(photo.name)
                  ? getLanguageConstant(lang, "ChooseFile")
                  : photo.name}
              </label>
            </div>
          </div>
          {hasError("photo") && (
            <Form.Text className="text-mute err-message">
              {errors.photo}
            </Form.Text>
          )}
        </Form.Group>

        <Form.Group className="mb-3" controlId="formReferralCode">
          <DynamicFormLabel
            lang={lang}
            text={getLanguageConstant(lang, "UploadIdFront")}
          />

          <div className="input-group">
            <div className="custom-file">
              <input
                type="file"
                className="custom-file-input"
                id="inputGroupFile01"
                aria-describedby="inputGroupFileAddon01"
                onChange={(e) => setIdFront(e.target.files[0])}
                accept="image/*"
              />
              <label className="custom-file-label" htmlFor="inputGroupFile01">
                {_.isEmpty(idFront.name)
                  ? getLanguageConstant(lang, "ChooseFile")
                  : idFront.name}
              </label>
            </div>
          </div>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formReferralCode">
          <DynamicFormLabel
            lang={lang}
            text={getLanguageConstant(lang, "UploadIdBack")}
          />
          <div className="input-group">
            <div className="custom-file">
              <input
                type="file"
                className="custom-file-input"
                id="inputGroupFile01"
                aria-describedby="inputGroupFileAddon01"
                onChange={(e) => setIdBack(e.target.files[0])}
                accept="image/*"
              />
              <label className="custom-file-label" htmlFor="inputGroupFile01">
                {_.isEmpty(idBack.name)
                  ? getLanguageConstant(lang, "ChooseFile")
                  : idBack.name}
              </label>
            </div>
          </div>
        </Form.Group>

        <Button variant="primary" onClick={submit}>
          Submit
        </Button>
      </Form>
    </div>
  );
};
export default VolunteerForm;
