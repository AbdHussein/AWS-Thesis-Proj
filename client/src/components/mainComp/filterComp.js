import React from 'react'
import { Container } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

class Filter extends React.Component {
    render() {
        return (
            <Container>
                <div className="filter-search">
                    <div className="first">
                        <div><input type="text" name="" id="" placeholder="What Are You Looking For?" /></div>
                        <div><input type="text" name="" id="" placeholder="All Categories" /></div>
                        <div><input type="text" name="" id="" placeholder="All Cities" /></div>
                    </div>
                    <div className="second">
                        <div><input type="text" name="" id="" placeholder="Where To Look?" /></div>
                        <div><input type="text" name="" id="" placeholder="price" /></div>
                        <div><button><FontAwesomeIcon icon={faSearch} /> | Search </button></div>
                    </div>
                </div>
            </Container>
        )
    }
}

export default Filter;