import React from "react";
import { LanguageButton } from "../../Components";
import { Navbar, Container, Nav } from "react-bootstrap";
import logo from "../../../Assets/SLogo1.png";
import { getLanguageConstant } from "../../../Utilities/Helpers";
import { useRecoilState } from "recoil";
import { websiteLanguageState } from "../../../RecoilResources/Atoms";

import "./Header.css";
const Header = function () {
  const [lang] = useRecoilState(websiteLanguageState);

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
            />{"      "}
            {getLanguageConstant(lang, "Salam")}
          </Navbar.Brand>{" "}
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              {/* <Nav.Link href="home">{getLanguageConstant(lang, "Home")}</Nav.Link> */}
              <LanguageButton />
            </Nav>
            <Nav>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default Header;
