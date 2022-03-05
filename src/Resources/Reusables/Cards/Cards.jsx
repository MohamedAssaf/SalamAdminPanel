import DisplayCard from '../DisplayCard/DisplayCard';
import { Row } from 'react-bootstrap';
import './Cards.css';

const Cards = function({ items }) {

  console.log(`Type of users ${typeof(items)}`);
  
  return (
    <div className="cards-container">
      {
        items.map((item) => {
          return (
            <DisplayCard name={item.name} phone={item.phone} image={item.photo}/>
          )
        })
      }
    </div>
  );
}

export default Cards;