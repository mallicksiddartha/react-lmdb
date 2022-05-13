import { useState, useEffect } from "react";
//API
import API from "../API";
//helpers
import { isPersistedState } from "../helpers";

//initial State

const initialState = {
    page: 0,
    results: [],
    total_pages: 0,
    total_results: 0
};


export const useHomeFetch = () => {

    const [state, setState] = useState(initialState);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [isLoadMore, setIsLoadMore] = useState(false);

    console.log(" Search term typed - " + searchTerm);

    const fetchMovies = async (page, searchTerm = '') => {
        try {
            setError(false);
            setLoading(true);
            const movies = await API.fetchMovies(searchTerm, page);
            // console.log(movies);

            setState(prev => ({
                ...movies,
                results:
                    page > 1 ? [...prev.results, ...movies.results] : [...movies.results]
            }))

        } catch (error) {
            setError(true);
        }
        setLoading(false);
    }

    //initial data and searched data
    useEffect(() => {
        if (!searchTerm) {
            const sessionState = isPersistedState('homeState');

            if (sessionState) {
                console.log('From sessionStorage');
                setState(sessionState);
                return;
            }
        }
        console.log('From API');
        setState(initialState);
        fetchMovies(1, searchTerm);
    }, [searchTerm])

    /**
     * Effect for pressing load more button
     */
    useEffect(() => {
        if (!isLoadMore) return;
        fetchMovies(state.page + 1, searchTerm);
        setIsLoadMore(false);

    }, [searchTerm, state.page, isLoadMore]);

    // Write to sessionStorage
    useEffect(() => {
        if (!searchTerm) {
            sessionStorage.setItem('homeState', JSON.stringify(state));
        }

    }, [searchTerm, state]);

    return { state, loading, error, searchTerm, setSearchTerm, setIsLoadMore }
}