import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";

//images
import searchIcon from "../../images/search-icon.svg"

//styles
import { Wrapper, Content } from "./SearchBar.styles";

/**
 * 
 * @param { setSearchTerm The setter function for search term typed by user} param0 
 * @returns Search bar for movies with related functionality
 */
const SearchBar = ({ setSearchTerm }) => {
    const [ state, setState ] = useState('');

    const initial = useRef(true);

    useEffect (() => {
        if(initial.current) {
            initial.current = false;
             return;
        }

        const timer = setTimeout(() => {
            setSearchTerm(state);
        }, 1000);

        return () => clearTimeout(timer);

    },[setSearchTerm, state]);

    return (
        <Wrapper>
            <Content>
                <img src={searchIcon} alt="search-icon" />
                <input 
                    type="text"
                    placeholder="Search movie"
                    onChange={event => setState(event.currentTarget.value)}
                    value={ state }
                />
            </Content>
        </Wrapper>
    );

};
SearchBar.propTypes = {
    setSearchTerm: PropTypes.string
};

export default SearchBar;