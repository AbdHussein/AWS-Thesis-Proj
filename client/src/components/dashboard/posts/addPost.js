import React from 'react';
import ImageUpload from '../../imageUpload/imageUpload';
class Add extends React.Component {
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
            <div className="dash-add">
                <form>
                    <textarea  className="post-area"name="text" cols="80" rows="30" value={this.state.text} onChange={this.handelChange.bind(this)}></textarea>
                    {/* <input type="file" name="image"  value={this.state.image} onChange={this.handelChange.bind(this)}/> */}
                    <ImageUpload text = {this.state.text} ButtonText = {"Add Post"}/>
                </form>
            </div>
        )
    }
}

export default Add;