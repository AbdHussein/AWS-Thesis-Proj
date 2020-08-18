import React from 'react';
import { Container } from '@material-ui/core';
import Navbar from '../mainComp/navbar';
import Constants from '../constants/Queries'

class WishList extends React.Component {
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
                <div className="wish-list">
                </div>
            </div>
        )
    }
}

export default WishList;