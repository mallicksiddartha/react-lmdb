import React, { useState, useEffect } from "react";
//API
import API from "../API";

// Config
import { POSTER_SIZE, BACKDROP_SIZE, IMAGE_BASE_URL } from "../config";

// components
import HeroImage from "./HeroImage";
import Grid from "./Grid";
import Thumb from "./Thumb";
import TwoSpinner from "./Spinner";
import SearchBar from "./SearchBar";
import Button from "./Button";

// hooks
import { useHomeFetch } from "../hooks/useHomeFetch";

// images
import NoImage from "../images/no_image.jpg";

const Home = () => {
    const {
        state,
        loading,
        error,
        searchTerm,
        setSearchTerm,
        setIsLoadMore
    } = useHomeFetch();

    // console.log(state);
    return (
        <>
            {
                !searchTerm && state.results[0] ? <HeroImage
                    image={`${IMAGE_BASE_URL}${BACKDROP_SIZE}${state.results[0].backdrop_path}`}
                    title={state.results[0].original_title}
                    text={state.results[0].overview}
                /> : null
            }
            <SearchBar setSearchTerm={setSearchTerm} />
            <Grid header={searchTerm ? "Search Results" : "Popular Movies"}>
                {
                    state.results.map(movie => (
                        <Thumb
                            key={movie.id}
                            clickable
                            image={
                                movie.poster_path
                                    ? IMAGE_BASE_URL + POSTER_SIZE + movie.poster_path
                                    : NoImage
                            }
                            movieId={movie.id}
                        />)
                    )
                }
            </Grid>
            {
                loading && <TwoSpinner />
            }
            {
                state.page < state.total_pages && !loading && (
                    <Button text="Load more" callback={() => setIsLoadMore(true)} />
                )
            }
        </>
    )
}

export default Home;