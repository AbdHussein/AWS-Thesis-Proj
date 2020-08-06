import React from 'react';
import { Container } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faKeyboard } from '@fortawesome/free-regular-svg-icons';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import Navbar from '../mainComp/navbar';

class Landing extends React.Component {

    render() {
        return (
            <div className="landing">
                <Navbar />
                <header>
                    <div className="overlay">
                        <Container>
                            <h1>Explore Best Places In City</h1>
                            <h3>Find some of the best tips from around the city from our partners and friends.</h3>

                            <div className="search-bar">
                                <div className="search">
                                    <FontAwesomeIcon icon={faKeyboard} />
                                    <input type="text" name="search" placeholder="What Are You Looking For?" />
                                </div>
                                <div className="between"></div>
                                <div className="location">
                                    <FontAwesomeIcon icon={faKeyboard} />
                                    <input type="text" name="search" placeholder="Location" />
                                </div>
                                <div className="between"></div>
                                <div className="categories">
                                    <FontAwesomeIcon icon={faKeyboard} />
                                    <input type="text" name="search" placeholder="All Categories" />
                                </div>
                                <div className="between"></div>
                                <div className="search-button">
                                    <button>Search <FontAwesomeIcon icon={faSearch} /> </button>
                                </div>
                            </div>
                        </Container>
                    </div>
                </header>
            </div>
        )
    }
}

export default Landing;