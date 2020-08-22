import React from 'react';
import $ from 'jquery';

class Loading extends React.Component {

    componentDidMount() {

        setTimeout(() => {
            $('.dots-container').fadeOut();
        }, 3000)
    }

    render() {
        return (
            <div class="dots-container">
                <div class="dots"></div>
                <div class="dots"></div>
                <div class="dots"></div>
                <div class="dots"></div>
                <div class="dots"></div>
            </div>
        )
    }
}

export default Loading;