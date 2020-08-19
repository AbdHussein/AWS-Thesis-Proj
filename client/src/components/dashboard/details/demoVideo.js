import React from "react";
import VideoUpload from "../../videoUpload/videoUpload";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import Constatnts from "../../constants/Queries";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";
import CheckCircleOutlinedIcon from "@material-ui/icons/CheckCircleOutlined";
import $ from "jquery";

class DemoVideo extends React.Component {
  // classes = useStyles();
  state = {
    vidUrl: null,
  };
  componentDidMount() {
    $("#videoProgress").hide();
  }

  uploadStarted() {
    $("#videoProgress").show();
    $(".btn").hide();
  }

  getVidUrl(url) {
    this.setState(
      {
        vidUrl: url,
      },
      () => {
        //TODO Enable button
        $("#videoProgress").hide();
        $(".btn").show();
      }
    );
  }

  onSubmit() {
    const addVidQuery = Constatnts.addVideo(this.props.id, this.state.vidUrl);
    console.log(addVidQuery);
    Constatnts.request(addVidQuery)
      .then((response) => {
        if (response.data.Errors) {
          $(".fail-demo-main").show();
          setTimeout(function () {
            $(".fail-demo-main").hide();
          }, 1000);
        } else {
          $(".success-add-demo-main").show();
          setTimeout(function () {
            $(".success-add-demo-main").hide();
          }, 1000);
        }
      })
      .catch((err) => {
        console.log(err);
        // $(".fail-demo-main").show();
        // setTimeout(function () {
        //   $(".fail-demo-main").hide();
        // }, 1000);
      });
  }
//Add Your Thumbnail
  render() {
    return (
      <div className="Demo-div">
   <div className="Thumbnail">
          <div className="upload-Thumbnail">
           <h3>Add Your Thumbnail</h3>
          {/*<ImageUpload ButtonText={"Add your Thumbnail"} /> */}
        </div>
        </div>
        <div className="demo-video">
        <div className="upload-video">
            <h3>Add Your Demo Video</h3>
            <VideoUpload
              getVidUrl={this.getVidUrl.bind(this)}
              uploadStarted={this.uploadStarted.bind(this)}
            />
          <br></br>
          <div id="videoProgress">
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
      </div>
    );
  }
}

export default DemoVideo;
