import React, { Component } from "react";
//routing
import { useParams } from "react-router-dom";

//config
import { IMAGE_BASE_URL, POSTER_SIZE } from "../config";

//components
import Grid from "./Grid";
import TwoSpinner from "./Spinner";
import BreadCrumb from "./BreadCrumb";
import MovieInfo from "./MovieInfo";
import MovieInfoBar from "./MovieInfoBar";
import Actor from "./Actor";

//API
import API from "../API";

//images
import NoImage from "../images/no_image.jpg";


var counter = 1;

class Movie extends Component {

    state = {
        movie: {},
        loading: true,
        error: false
    };

    fetchMovie = async () => {
        const { movieId } = this.props.params;


        try {
            this.setState({ loading: true, error: false });

            const movie = await API.fetchMovie(movieId);
            const credits = await API.fetchCredits(movieId);

            //get directors
            const directors = credits.crew.filter(
                member => member.job === 'Director'
            );

            this.setState({
                movie: {
                    ...movie,
                    actors: credits.cast,
                    directors
                },
                loading: false
            });

        } catch (error) {
            this.setState({ loading: false, error: true });
        }
    }

    componentDidMount() {
        this.fetchMovie();
    }

    render() {
        const { movie, loading, error } = this.state;

        if (loading) return <TwoSpinner />;
        if (error) return <div>Something went wrong...</div>;

        return (
            <>
                <BreadCrumb movieTitle={movie.original_title} />
                <MovieInfo movie={movie} />
                <MovieInfoBar
                    runtime={movie.runtime}
                    budget={movie.budget}
                    revenue={movie.revenue}
                />
                <Grid header='Actors'>
                    {
                        movie.actors.map(actor => (
                            <Actor
                                key={actor.credit_id}
                                name={actor.name}
                                character={actor.character}
                                imageUrl={actor.profile_path
                                    ? `${IMAGE_BASE_URL}${POSTER_SIZE}${actor.profile_path}`
                                    : NoImage
                                }
                            />
                        ))
                    }
                </Grid>
            </>
        )

    }



};


const MovieWithParams = props => <Movie {...props} params={useParams()} />

export default MovieWithParams;