//Import from react-bootstrap 
import { Button, Card } from 'react-bootstrap';

//Import style
import './DisplayCard.css';

//Import default image
import testImage from '../../../Assets/SalamLogo.jpeg';

//Import from react-router-dom
import { Link } from 'react-router-dom';

//Import from atoms
import { userDetails, websiteLanguageState } from '../../../RecoilResources/Atoms';

//Import from recoil
import { useRecoilState } from 'recoil';
 
function DisplayCard({ item, ...props }) {

  const [lang] = useRecoilState(websiteLanguageState);
  const [displaiedUserDetails, setDisplaiedUserDetails] = useRecoilState(userDetails);
    
  const handleDetailsClick = () => {
    setDisplaiedUserDetails(item);
  }

  return(
      <Card style={{}}>
          <Card.Img variant="top" src={item.photo ? item.photo.url : testImage} />
          <Card.Body>
            <Card.Title>{item.name}</Card.Title>
            <Card.Subtitle>Phone Number</Card.Subtitle>
            <br/>
            <Card.Subtitle>{item.phone}</Card.Subtitle>
            <Card.Text>
              {item.phoneNumber}
            </Card.Text>
            <Link to={props.detailsLink}>
              <Button onClick={() => handleDetailsClick()}>
                More details
              </Button>
            </Link>
          </Card.Body>
      </Card>
  );
};

export default DisplayCard;