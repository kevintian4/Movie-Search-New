import { TVCard } from './TVCard';

function TVList({ items }) {
  return (
    <>
      {items.length > 0 && 
        <>  
          <h2 className="list-header">TV Shows</h2> 
          <hr />
        </>
      }
      <div className="item-list" id="tv-list">
        {items.length === 0 ? (
          <></>
        ) : (
          items.map((show) => (
            <TVCard key={show.id} show={show} />
          ))
        )}
      </div>
    </>
  );
}

export default TVList;
