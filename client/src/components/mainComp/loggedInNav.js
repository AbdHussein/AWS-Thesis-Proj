import React from 'react'
import Avatar from '@material-ui/core/Avatar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


class LoggedInNavbar extends React.Component {
    render() {
        return (
            <div className="logged-nav">
                <div className="user-logged-info">
                    <Avatar className="avatar">D</Avatar> <span>Doly test</span>
                </div>
            </div>
        )
    }
}

export default LoggedInNavbar;