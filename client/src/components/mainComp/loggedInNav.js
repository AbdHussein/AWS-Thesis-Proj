import React from 'react'
import Avatar from '@material-ui/core/Avatar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import $ from 'jquery';

class LoggedInNavbar extends React.Component {
    render() {
        return (
            <div className="logged-nav">
                <div className="user-logged-info">
                    <Avatar className="avatar">D</Avatar> <span>Hello, Doly test <FontAwesomeIcon icon={faChevronDown} /> </span>
                </div>
                <div className="user-details">
                    <ul>
                        <li>Edit Profile</li>
                        <li>Logout</li>
                    </ul>
                </div>
            </div>
        )
    }
}

export default LoggedInNavbar;

$(document).ready(function () {
    $('.user-logged-info').click(function () {
        $('.user-details ul').slideToggle();
    })
});