import React from 'react'
import Navbar from '../mainComp/navbar'
import Filter from '../mainComp/filterComp';

class Map extends React.Component {
    render() {
        return (
            <div className="map">
                <Navbar />
                <div className="map-header">
                    test
                </div>
                <Filter />
            </div>
        )
    }
}
export default Map