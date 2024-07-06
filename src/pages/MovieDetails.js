import { useParams } from 'react-router-dom';

function MovieDetails() {
    const { id } = useParams();

    return (
        <div>
            <h1>Movie Details</h1>
            <p>Movie ID: {id}</p>
        </div>
    );
}

export default MovieDetails;