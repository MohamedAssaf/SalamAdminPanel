import { Card } from 'react-bootstrap';
import './DisplayCard.css';
import testImage from '../../../Assets/Charity.jpeg'

function DisplayCard({name, phone, phoneNumber, image, details}) {
    return(
        <Card style={{}}>
            <Card.Img variant="top" src={image ? image.url : testImage} />
            <Card.Body>
              <Card.Title>{name}</Card.Title>
              <Card.Subtitle>Phone Number</Card.Subtitle>
              <br/>
              <Card.Subtitle>{phone}</Card.Subtitle>
              <Card.Text>
                {phoneNumber}
              </Card.Text>
              <Card.Link href='/home'>More details</Card.Link>
            </Card.Body>
        </Card>
    );
};

export default DisplayCard;