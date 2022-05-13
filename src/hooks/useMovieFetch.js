import { useState, useEffect } from "react";
import API from "../API";
// Helper
import { isPersistedState } from "../helpers";

export const useMovieFetch = movieId => {
    const [state, setState] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);


    useEffect(() => { 
        const fetchMovie = async () => {
            try {
                setLoading(true);
                setError(false);

                const movie = await API.fetchMovie(movieId);
                const credits = await API.fetchCredits(movieId);

                //get directors
                const directors = credits.crew.filter(
                    member => member.job === 'Director'
                );

                setState({
                    ...movie,
                    actors: credits.cast,
                    directors
                });
                console.log('From API, movie - ' + movie.original_title);

            } catch (error) {
                setError(true);
            }

            setLoading(false);
        }

        const sessionMovie = isPersistedState(movieId);
        if(sessionMovie) {
            console.log('From session, movie - ' + sessionMovie.original_title);
            setLoading(false);
            setState(sessionMovie);
            return;
        }

        fetchMovie();

    }, [movieId]);

    // Write loaded movie in sessionStorage
    useEffect(() => {
        sessionStorage.setItem(movieId, JSON.stringify(state));

    }, [movieId, state]);

    return { state, loading, error };
};
