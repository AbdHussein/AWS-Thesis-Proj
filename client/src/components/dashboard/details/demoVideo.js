import React from "react";
import ImageUpload from "../../imageUpload/imageUpload";
import VideoUpload from "../../videoUpload/videoUpload";
import CircularProgress from "@material-ui/core/CircularProgress";
import Constatnts from "../../constants/Queries";
import swal from "sweetalert";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";
import CheckCircleOutlinedIcon from "@material-ui/icons/CheckCircleOutlined";
import $ from "jquery";

class DemoVideo extends React.Component {
  // classes = useStyles();
  state = {
    vidUrl: null,
    imgUrl: null,
  };

  componentDidMount() {
    $("#videoProgress").hide();
    $("#ImageProgress").hide();
  }

  uploadStarted() {
    $("#videoProgress").show();
    $("#uploadVideoBtn").hide();
  }

  imgUploadStarted() {
    $("#ImageProgress").show();
    $("#uploadImageBtn").hide();
  }

  getImgUrl(url) {
    this.setState(
      {
        imgUrl: url,
      },
      () => {
        //TODO Enable button
        $("#ImageProgress").hide();
        $("#uploadImageBtn").show();
      }
    );
  }

  getVidUrl(url) {
    this.setState(
      {
        vidUrl: url,
      },
      () => {
        //TODO Enable button
        $("#videoProgress").hide();
        $("#uploadVideoBtn").show();
      }
    );
  }

  onVidSubmit() {
    const addVidQuery = Constatnts.addVideo(this.props.id, this.state.vidUrl);
    console.log(addVidQuery);
    Constatnts.request(addVidQuery)
      .then((response) => {
        if (response.data.Errors) {
          swal("OoOps!", " Demo video not added.", "error");
          // $(".fail-demo-main").show();
          // setTimeout(function () {
          //   $(".fail-demo-main").hide();
          // }, 1000);
        } else {
          swal("Good job!", "Perfect the demo successfully added.", "success");
          // $(".success-add-demo-main").show();
          // setTimeout(function () {
          //   $(".success-add-demo-main").hide();
          // }, 1000);
          // $(".success-add-demo-main").show();

          // setTimeout(function () {
          //   $(".success-add-demo-main").hide();
          // }, 1000);
        }
      })
      .catch((err) => {
        console.log(err);
        swal("OoOps!", " Demo video not added.", "error");
        // $(".fail-demo-main").show();
        // setTimeout(function () {
        //   $(".fail-demo-main").hide();
        // }, 1000);
      });
  }

  onImgSubmit() {
    const addThumbnailQuery = Constatnts.addThumbnail(
      this.props.id,
      this.state.imgUrl
    );
    console.log(addThumbnailQuery);
    Constatnts.request(addThumbnailQuery)
      .then((response) => {
        console.log(response);
        if (response.data.Errors) {
          swal("OoOps!", " Thumbnail not added.", "error");
        } else {
          swal("Good job!", "Perfect the Thumbnail successfully added.", "success");
        }
      })
      .catch((err) => {
        console.log(err);
        swal("OoOps!", " Thumbnail not added.", "error");
      });
  }

  //Add Your Thumbnail
  render() {
    return (
      <div className="Demo-div">
        <div className="Thumbnail">
          <div className="upload-Thumbnail">
            <h3>Add Your Thumbnail</h3>
            <ImageUpload
              getImgUrl={this.getImgUrl.bind(this)}
              uploadStarted={this.imgUploadStarted.bind(this)}
            />
            <br />
            <div id="ImageProgress">
              <CircularProgress />
            </div>
            <br />
            <button
              type="button"
              id="uploadImageBtn"
              className="btn"
              onClick={this.onImgSubmit.bind(this)}
            >
              Add Thumbnail
            </button>
          </div>
        </div>
        <br />
        <br />
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
              onClick={this.onVidSubmit.bind(this)}
            >
              Add Video
            </button>
          </div>
        </div>

        {/* <div className="fail-demo-main">
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
        </div> */}
      </div>
    );
  }
}

export default DemoVideo;
