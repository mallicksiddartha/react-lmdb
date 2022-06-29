import React, { Component } from "react";
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
class SearchBar extends Component {
    state = {
        value: '',
    };
    timeout = null;

    componentDidUpdate(_prevProps, prevState) {
        if (this.state.value !== prevState.value) {
            const { setSearchTerm } = this.props;

            clearTimeout(this.timeout);
            this.timeout = setTimeout(() => {
                const { value } = this.state;
                setSearchTerm(value);
            }, 1000);
        }

    };

    render() {
        const { value } = this.state;

        return (
            <Wrapper>
                <Content>
                    <img src={searchIcon} alt="search-icon" />
                    <input
                        type="text"
                        placeholder="Search movie"
                        onChange={event => this.setState({
                            ...this.prevState,
                            value: event.currentTarget.value
                        })}
                        value={value}
                    />
                </Content>
            </Wrapper>
        );
    }
};
SearchBar.propTypes = {
    setSearchTerm: PropTypes.string
};

export default SearchBar;