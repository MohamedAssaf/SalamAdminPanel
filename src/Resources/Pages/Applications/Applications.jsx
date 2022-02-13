import "./Applications.css";
import { useRecoilState } from "recoil";
import { websiteLanguageState } from "../../../RecoilResources/Atoms";
import { getLanguageConstant } from "../../../Utilities/Helpers";
import { Container } from "react-bootstrap";

const Applications = function() {
    
    const [lang] = useRecoilState(websiteLanguageState);
    
    return (
        <Container className="main-container">
            <div>
                <h1>{getLanguageConstant(lang, "Applications")}</h1>
            </div>
        </Container>
    )
}

export default Applications;