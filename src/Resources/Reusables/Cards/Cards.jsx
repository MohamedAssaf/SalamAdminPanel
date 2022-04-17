import DisplayCard from '../DisplayCard/DisplayCard';
import './Cards.css';

const Cards = function({ items }) {
  
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