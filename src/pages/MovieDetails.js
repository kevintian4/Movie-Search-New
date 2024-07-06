import { useParams } from 'react-router-dom';
import { getItemDetails } from '../services/api';
import { useState, useEffect } from 'react';
import { marked } from 'marked';

function MovieDetails() {
  const { id } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    getItemDetails('movie', id)
    .then((data) => {
        setData(data);
    });
  }, [id]);

  if (!data) {
    return <div>Loading...</div>;
  }

  function formatRuntime(runtime) {
    if (runtime < 60) {
      return `${runtime}m`;
    } else {
      const hours = Math.floor(runtime / 60);
      const minutes = runtime % 60;
      return `${hours}h ${minutes}m`;
    }
  }  

  const trailer = data.videos.results.find(video => video.type === 'Trailer' && video.site === 'YouTube');
  const videoKey = trailer ? trailer.key : null;

  const reviews = data.reviews.results.length > 0 ? data.reviews.results : null;
  console.log(reviews)
  return (
    <div className="movie-details">
      <header className="movie-header" style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original/${data.backdrop_path})` }}>
        <div className="movie-header-content">
          <h1>{data.title}</h1>
          <p className="tagline">{data.tagline}</p>
          <div className="movie-info">
            <div className="movie-genres">
              {data.genres.map((genre) => (
                <span key={genre.id} className="genre">{genre.name}</span>
              ))}
            </div>
            <div className="movie-details-extra">
              <span><strong>Release Date:</strong> {data.release_date}</span>
              <span><strong>Runtime:</strong> {formatRuntime(data.runtime)} </span>
            </div>
          </div>
        </div>
      </header>

      <main>
        <section className="movie-overview">
          <h2>Overview</h2>
          <p>{data.overview}</p>
        </section>

        {videoKey && (
          <section className="movie-trailer">
            <h2>Trailer</h2>
            <iframe
              className="movie-page-trailer"
              src={`https://www.youtube.com/embed/${videoKey}`}
              allowFullScreen
              title="Movie Trailer"
            />
          </section>
        )}
        
        {reviews && (
          <section className="movie-reviews">
            <h2>Reviews</h2>
            {reviews.map((review) => (
              <div key={review.id} className="review">
                <h3 className="author">{review.author}</h3>
                  <div className="review-content" 
                  dangerouslySetInnerHTML={{ __html: marked.parse(review.content.replace(/\n/g, '<br />')) }} 
                />
              </div>
            ))}
          </section>
        )}

      </main>
    </div>
  );
}

export default MovieDetails;