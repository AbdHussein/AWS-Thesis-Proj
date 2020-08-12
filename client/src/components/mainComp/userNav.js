import React from "react";
import Avatar from "@material-ui/core/Avatar";
import { Container } from "@material-ui/core";
import EmojiTransportationIcon from "@material-ui/icons/EmojiTransportation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class UserNavbar extends React.Component {
  render() {
    return (
      <nav>
        <Container>
          <div className="brand">
            <EmojiTransportationIcon /> x<span>-town</span>
          </div>
          <ul>
            <li>
              <a href="#">Home</a>
            </li>
            <li>
              <a href="#">Feeds</a>
            </li>
          </ul>
        </Container>
      </nav>
    );
  }
}

export default UserNavbar;
