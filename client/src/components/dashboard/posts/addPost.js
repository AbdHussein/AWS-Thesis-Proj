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
                <h2>Add your Post</h2>
                <h4>What Is New?!</h4>
                <form>
                    <textarea  className="post-area"name="text" cols="80" rows="10" value={this.state.text} onChange={this.handelChange.bind(this)}></textarea>
                    {/* <input type="file" name="image"  value={this.state.image} onChange={this.handelChange.bind(this)}/> */}
                    <h4>Choose Post's Image</h4>
                    <div className="upload">
                        <ImageUpload text = {this.state.text} ButtonText = {"Add Post"}/>
                    </div>
                </form>
            </div>
        )
    }
}

export default Add;