import "./Users.css";
import { useRecoilState } from "recoil";
import { websiteLanguageState } from "../../../RecoilResources/Atoms";
import { getLanguageConstant } from "../../../Utilities/Helpers";
import { Container } from "react-bootstrap";

const Users = function() {
    
    const [lang] = useRecoilState(websiteLanguageState);
    
    return (
        <Container className="main-container">
            <div>
                <h1>{getLanguageConstant(lang, "Users")}</h1>
            </div>
        </Container>
    )
}

export default Users;