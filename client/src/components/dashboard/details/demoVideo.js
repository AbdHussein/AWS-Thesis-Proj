import React from "react";
import ImageUpload from "../../imageUpload/imageUpload";
class DemoVideo extends React.Component {
  render() {
    return (
      <div className="demo-video">
        <div className="upload-video">
          {/* <h3>Add Your Demo Video</h3>
          <ImageUpload ButtonText={"Add your demo"} /> */}
        </div>

        <div className="Thumbnail">
          <div className="upload-Thumbnail">
            <h3>Add Your Thumbnail</h3>
            <ImageUpload ButtonText={"Add your Thumbnail"} />
          </div>
        </div>
      </div>
    );
  }
}

export default DemoVideo;
