import "./Posts.css";
import { useRecoilState } from "recoil";
import { websiteLanguageState } from "../../../RecoilResources/Atoms";
import { getLanguageConstant } from "../../../Utilities/Helpers";
import { Container } from "react-bootstrap";

const Posts = function() {
    
    const [lang] = useRecoilState(websiteLanguageState);
    
    return (
        <Container className="main-container">
            <div>
                <h1>{getLanguageConstant(lang, "Posts")}</h1>
            </div>
        </Container>
    )
}

export default Posts;