import React from 'react';
import { Container } from '@material-ui/core';
import Navbar from '../mainComp/navbar';

class MyCart extends React.Component {
    state = {
        provider: null
    }
    render() {
        return (
            <div className="my-cart">
                <Navbar />
                <Container>
                </Container>
            </div>
        )
    }
}

export default MyCart;