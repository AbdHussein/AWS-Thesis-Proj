import React from 'react';
import { Container } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar } from '@fortawesome/free-regular-svg-icons';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';

class Feeds extends React.Component {
    render() {
        return (
            <div className="feeds">
                <header>
                    <div className="overlay">
                        <Container>
                            <h2>Our Last News</h2>
                            <hr />
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut nec tincidunt arcu, sit amet fermentum sem.</p>
                        </Container>
                    </div>
                </header>
                <Container>
                    <div className="feeds-content">
                        {/* Start Post */}
                        <div className="feeds-post">
                            <div className="feeds-img">
                                <img src={require(`../../images/unnamed.jpg`)} alt="Feeds Image" />
                            </div>
                            <div className="feeds-post-content">
                                <p>Ut euismod ultricies sollicitudin. Curabitur sed dapibus nulla. Nulla eget iaculis lectus. Mauris ac maximus neque. Nam in mauris quis libero sodales eleifend. Morbi varius, nulla sit amet rutrum elementum, est elit finibus tellus, ut tristique elit risus at metus.</p>
                                <hr />
                                <FontAwesomeIcon icon={faCalendar} /> <span>25 April 2018</span> <button>Read More <FontAwesomeIcon icon={faChevronRight} /></button>
                            </div>
                        </div>
                        {/* End Post */}
                    </div>
                    <div className="feeds-sidebar">
                        Test From Sidebar
                    </div>
                </Container>
            </div>
        )
    }
}

export default Feeds;