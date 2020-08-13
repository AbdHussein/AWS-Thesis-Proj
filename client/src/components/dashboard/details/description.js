import React from 'react';
import ImageUpload from '../../imageUpload/imageUpload';
import PermMediaIcon from '@material-ui/icons/PermMedia';
class Description extends React.Component {
    state = {
        text: "",
       };      
        
        handelChange(e) {
          this.setState({
            [e.target.name]: e.target.value
          });
        }
    render() {
        return (
            <div className="description">
                {/* <div className="add-gallery">
                    <h3>Add Photes To Your Gallery</h3>
                   <ImageUpload ButtonText = {"Add image"}/>
                </div> */}
                <form>
                    <textarea className="post-area"
                        name="text"
                        cols="80"
                        rows="30"
                        value={this.state.text}
                        onChange={this.handelChange.bind(this)}>
                    </textarea>
                    <button>Add Description</button>
                </form>
            </div>
        )
    }
}

export default Description;