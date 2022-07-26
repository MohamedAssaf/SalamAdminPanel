import DisplayCard from '../DisplayCard/DisplayCard';
import './Cards.css';

const Cards = function({ items, ...props }) {
  
  return (
    <div className="cards-container">
      {
        items.map((item) => {
          return (
            <DisplayCard
              item={item}
              detailsLink={`${props.detailsBaseLink}/${item.codeId}`}  
            />
          )
        })
      }
    </div>
  );
}

export default Cards;