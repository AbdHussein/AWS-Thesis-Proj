import React from 'react';
import Navbar from '../mainComp/navbar';
import { Container } from '@material-ui/core';
import Constants from '../constants/Queries';
import Footer from '../footer/footer';

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
                            Test From Content
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