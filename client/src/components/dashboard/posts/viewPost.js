import React from 'react';
import { Container } from "@material-ui/core";
import Navbar from '../../mainComp/navbar';
import Avatar from "@material-ui/core/Avatar";
import { faCalendar, faEye, faTags, faChevronDown, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';

class ViewPost extends React.Component {
    render() {
        return (
            <div className="view-post">
                <Navbar />
                <Container>
                    <div className="main-view-post">
                        <div className="whole-post">
                            <div className="img">
                                <img src={require(`../../../images/29.jpg`)} alt="View Post Image" />
                            </div>
                            <div className="str">
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis mollis et sem sed sollicitudin. Donec non odio neque. Aliquam hendrerit sollicitudin purus, quis rutrum mi accumsan nec. Quisque bibendum orci ac nibh facilisis, at malesuada orci congue. Nullam tempus sollicitudin cursus. Ut et adipiscing erat. Curabitur this is a text link libero tempus congue.

Duis mattis laoreet neque, et ornare neque sollicitudin at. Proin sagittis dolor sed mi elementum pretium. Donec et justo ante. Vivamus egestas sodales est, eu rhoncus urna semper eu. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Integer tristique elit lobortis purus bibendum, quis dictum metus mattis. Phasellus posuere felis sed eros porttitor mattis. Curabitur massa magna, tempor in blandit id, porta in ligula. Aliquam laoreet nisl massa, at interdum mauris sollicitudin et</p>
                                <hr />
                                <div className="poster-info">
                                    <Avatar className="avatar">D</Avatar>
                                    <p>By, Dany Cohen</p>
                                    <p><FontAwesomeIcon icon={faCalendar} /> 25 April 2018</p>
                                    <p><FontAwesomeIcon icon={faEye} /> 251</p>
                                    <FormControlLabel
                                        control={<Checkbox icon={<FavoriteBorder />} checkedIcon={<Favorite />} name="checkedH" />}
                                        label="25 Like"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="posts-comments">
                            <div>Post Comments - <span>2</span> <FontAwesomeIcon icon={faChevronDown} /></div>
                            <div>
                                <div className="post-img">
                                    <Avatar className="avatar">N</Avatar>
                                </div>
                                <div className="comment">
                                    <h3>Ibrahim Nemer</h3>
                                    <p>" Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. "</p>
                                    <hr />
                                    <FontAwesomeIcon icon={faCalendar} /> <span>12 April 2018</span>
                                </div>
                            </div>
                        </div>
                        <div className="add-comments">
                            <div>Add Comment<FontAwesomeIcon icon={faChevronDown} /></div>
                            <div>
                                <form>
                                    <textarea name="comment" id="" cols="30" rows="10"></textarea>
                                    <button>Submit Comment <FontAwesomeIcon icon={faPaperPlane} /> </button>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="sidebar-post">
                        sidebar
                    </div>
                </Container>
            </div>
        )
    }
}

export default ViewPost;