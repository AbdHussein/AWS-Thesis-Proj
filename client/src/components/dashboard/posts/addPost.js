import React from "react";
import ImageUpload from "../../imageUpload/imageUpload";
class Add extends React.Component {
  state = {
    text: "",
  };

  handelChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }
  render() {
    return (
      <div className="dash-add">
        <h1>Add your Post</h1>
        <div className="dash-add-div">
          <h4>What Is New?!</h4>
          <form>
            <textarea
              className="post-area"
              name="text"
              cols="60"
              rows="10"
              value={this.state.text}
              onChange={this.handelChange.bind(this)}
            ></textarea>
            {/* <input type="file" name="image"  value={this.state.image} onChange={this.handelChange.bind(this)}/> */}
            
                    <div className="upload">
                        <h4>Choose Post's Image</h4>
              <ImageUpload text={this.state.text} ButtonText={"Add Post"} />
            </div>
          </form>
        </div>
      </div>
    );
  }
}
export default Add;
