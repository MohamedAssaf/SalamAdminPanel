import { Card } from 'react-bootstrap';
import './DisplayCard.css';

function DisplayCard({name, userType, phoneNumber, image, details}) {
    return(
        <Card classname="card">
            <Card.Img variant="top" src={image} />
            <Card.Body>
              <Card.Title>{name}</Card.Title>
              <Card.Subtitle>{userType}</Card.Subtitle>
              <Card.Text>
                {phoneNumber}
              </Card.Text>
              <Card.Link href='/home'>More details</Card.Link>
            </Card.Body>
        </Card>
    );
};

export default DisplayCard;