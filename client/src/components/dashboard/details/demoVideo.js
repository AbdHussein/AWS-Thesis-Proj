import React from "react";
import VideoUpload from "../../videoUpload/videoUpload";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";
import CheckCircleOutlinedIcon from "@material-ui/icons/CheckCircleOutlined";
import Constatnts from "../../constants/Queries";
import $ from "jquery";

class DemoVideo extends React.Component {
  // classes = useStyles();
  state = {
    vidUrl: null,
  };
  componentDidMount() {
    $(".MuiCircularProgress-svg").hide();
  }

  uploadStarted() {
    $(".MuiCircularProgress-svg").show();
    $(".btn").hide();
  }

  getVidUrl(url) {
    this.setState(
      {
        vidUrl: url,
      },
      () => {
        //TODO Enable button
        $(".MuiCircularProgress-svg").hide();
        $(".btn").show();
      }
    );
  }

  onSubmit() {
    const addVidQuery = Constatnts.addVideo(this.props.id, this.state.vidUrl);
    console.log(addVidQuery);
    Constatnts.request(addVidQuery)
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  }

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
            {/* <ImageUpload ButtonText={"Add your Thumbnail"} /> */}
            <VideoUpload
              getVidUrl={this.getVidUrl.bind(this)}
              uploadStarted={this.uploadStarted.bind(this)}
            />
          </div>
          <br></br>
          <div>
            <CircularProgress />
          </div>
          <br></br>
          <button
            type="button"
            id="uploadVideoBtn"
            className="btn"
            onClick={this.onSubmit.bind(this)}
          >
            Add Video
          </button>
        </div>
        <div className="success-add-demo-main">
          <div className="success-add-demo">
            <h3>
              <CheckCircleOutlinedIcon />
              <span>Success</span>
            </h3>
            <hr />
            <p>Perfect the demo successfully added.</p>
          </div>
        </div>
        <div className="fail-demo-main">
          <div className="fail-demo">
            <h3>
              <ErrorOutlineIcon />
              <span>Failing</span>
            </h3>
            <hr />
            <p>Error!! Demo video not added</p>
          </div>
        </div>
      </div>
    );
  }
}

export default DemoVideo;
