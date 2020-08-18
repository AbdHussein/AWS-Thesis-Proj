import React from 'react';
import Navbar from '../mainComp/navbar';
import { Container } from '@material-ui/core';
import Constants from '../constants/Queries';
import Footer from '../footer/footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkedAlt, faChevronRight } from '@fortawesome/free-solid-svg-icons';

class FavProviders extends React.Component {
    state = {
        user: null
    }

    async componentDidMount() {
        if (localStorage.getItem('xTown')) {
            const query = Constants.getUserByToken(localStorage.getItem('xTown'));
            console.log(query);
            const request = await Constants.request(query);
            console.log(request);
            const { user } = request.data.data;
            this.setState({
                user,
            });
        }
    }

    render() {
        return (
            <div>
                <Navbar provider={this.state.user} />
                <div className="fav-provider">
                    <Container>
                        <div className="fav-content">
                            <div className="fav">
                                <div className="fav-cover">
                                    <img src={require(`../../images/29.jpg`)} alt="Fav Provider Image" />
                                </div>
                                <div className="fav-info">
                                    <h4>Header Test</h4>
                                    <span><FontAwesomeIcon icon={faMapMarkedAlt} />  75 Prince St, NY, USA</span>
                                </div>
                                <div className="fav-options">
                                    <button>unsaved</button>
                                    <button>Visit <FontAwesomeIcon icon={faChevronRight} /></button>
                                </div>
                            </div>
                        </div>
                        <div className="fav-sidebar">
                            Test From SideBar
                        </div>
                    </Container>
                </div>
                <Footer />
            </div>
        )
    }
}

export default FavProviders;