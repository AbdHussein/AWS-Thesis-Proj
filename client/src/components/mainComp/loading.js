import React from 'react';
import $ from 'jquery';

class Loading extends React.Component {

    componentDidMount() {
        $(window).on('load', function () {
            $('.dots-container').fadeOut();
        })
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