import React from "react";
import { LanguageButton } from "../../Components";
import { Navbar, Container, Nav } from "react-bootstrap";
import logo from "../../../Assets/SLogo1.png";
import { getLanguageConstant } from "../../../Utilities/Helpers";
import { useRecoilState } from "recoil";
import {
  websiteLanguageState,
  userState,
} from "../../../RecoilResources/Atoms";
import * as _ from 'lodash';
import "./Header.css";
import { logOut } from "../../../Utilities/Firebase";
const Header = function () {
  const [lang] = useRecoilState(websiteLanguageState);
  const [currentUser, setCurrentUser] = useRecoilState(userState);
  console.log(currentUser)
  let LogOutUser = async function () {
    let result = await logOut();
    if (result == 1) {
      setCurrentUser(null);
    }
  };

  return (
    <div className="header">
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="home">
            <img
              alt=""
              src={logo}
              width="30"
              height="30"
              className="header-logo"
            />
            {"      "}
            {getLanguageConstant(lang, "Salam")}
          </Navbar.Brand>{" "}
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              {!_.isEmpty(currentUser) && 
              <Nav.Link href="users">{getLanguageConstant(lang, "Users")}</Nav.Link> 
              &&
              <Nav.Link href="posts">{getLanguageConstant(lang, "Posts")}</Nav.Link>
              &&
              <Nav.Link href="Applications">{getLanguageConstant(lang, "Applications")}</Nav.Link>
              &&
              <Nav.Link href="ReferralCodes">{getLanguageConstant(lang, "ReferralCodes")}</Nav.Link>
              }
              <LanguageButton />
            </Nav>
          </Navbar.Collapse>
          {/* <i class="fa fa-user" aria-hidden="true" style={{fontSize: "1.5em"}}></i> */}
          {!_.isEmpty(currentUser) && (
            <div className="log-out-div">
              <p className="log-out" onClick={LogOutUser}>
                <strong>Log Out</strong>
              </p>
            </div>
          )}
        </Container>
      </Navbar>
    </div>
  );
};

export default Header;
