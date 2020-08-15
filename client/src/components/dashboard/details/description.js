import React from "react";
import ImageUpload from "../../imageUpload/imageUpload";
import PermMediaIcon from "@material-ui/icons/PermMedia";
class Description extends React.Component {
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
      <div className="description">
        {/* <div className="add-gallery">
                    <h3>Add Photes To Your Gallery</h3>
                   <ImageUpload ButtonText = {"Add image"}/>
                </div> */}
        <div className="description-div">
          <h2>Add your Description</h2>
          <form>
            <textarea
              className="post-area"
              name="text"
              cols="80"
              rows="20"
              value={this.state.text}
              onChange={this.handelChange.bind(this)}
            ></textarea>
            <button className="description-btn">Add Description</button>
          </form>
        </div>

        <div className="gallrey">
          <h2>Add Photos To Your Gallrey</h2>
          <div className="upload-gallrey-img">
            <ImageUpload text={this.state.text} ButtonText={"Add Image"} />
          </div>
        </div>
      </div>
    );
  }
}

export default Description;
