import React from 'react'
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


class LoggedOutNavbar extends React.Component {
    render() {
        return (
            <div className="auth">
                <a href="/signIn"><FontAwesomeIcon icon={faUser} /> Sign In </a>
                <span>|</span>
                <a href="/signUp"><FontAwesomeIcon icon={faUserPlus} /> Sign Up</a>
            </div>
        )
    }
}

export default LoggedOutNavbar;