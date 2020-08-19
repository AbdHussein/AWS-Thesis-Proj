import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";
import CheckCircleOutlinedIcon from "@material-ui/icons/CheckCircleOutlined";
import $ from "jquery";
import ImageUpload from "../../imageUpload/imageUpload";
import constants from "../../constants/Queries";
const jwt = require("jsonwebtoken");

class Add extends React.Component {
  state = {
    text: "",
    imgUrl: null,
  };
  // $('.delete-waring button').click(function () {
  //     $('.popup-delete').show();
  // })
  //}
  componentDidMount() {
    $("#addPostProgress").hide();
  }

  uploadStarted() {
    $("#addPostProgress").show();
    $("#addPost").hide();
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  updateImgUrl(url) {
    this.setState(
      {
        imgUrl: url,
      },
      () => {
        $("#addPostProgress").hide();
        $("#addPost").show();
      }
    );
  }

  async onSubmit() {
    console.log(this.state.imgUrl);
    try {
      const data = jwt.verify(
        localStorage.getItem("xTown"),
        "somesuperdupersecret",
        {
          algorithm: "HS256",
        }
      );
      const addPost = await constants.addPost(
        data.id,
        this.state.imgUrl,
        this.state.text
      );
      constants
        .request(addPost)
        .then(async (result) => {
          if (result.data.errors) {
            $(".fail-add-Photopost-main").show();
            setTimeout(function () {
              $(".fail-add-Photopost-main").hide();
            }, 1000);
          } else {
            await this.props.getProvider();
            $(".success-add-post-main").show();
            setTimeout(function () {
              $(".success-add-post-main").hide();
            }, 1000);
          }
        })
        .catch((err) => {
          $(".fail-add-post-main").show();
          setTimeout(function () {
            $(".fail-add-post-main").hide();
          }, 1000);
        });
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    return (
      <div className="dash-add">
        <h2>Add your Post</h2>
        <form>
          <h4>What Is New?!</h4>
          <textarea
            className="post-area"
            name="text"
            cols="80"
            rows="10"
            value={this.state.text}
            onChange={this.handleChange.bind(this)}
          ></textarea>
          {/* <input type="file" name="image"  value={this.state.image} onChange={this.handelChange.bind(this)}/> */}
          <h4>Choose Post's Image</h4>
          <div className="upload">
            <ImageUpload
              getImgUrl={this.updateImgUrl.bind(this)}
              uploadStarted={this.uploadStarted.bind(this)}
            />
          </div>
          <br></br>
          <div id="addPostProgress">
            <CircularProgress />
          </div>
          <br></br>
          <button
            type="button"
            className="btn"
            id="addPost"
            onClick={this.onSubmit.bind(this)}
          >
            Add Post
          </button>
        </form>
        <div className="success-add-post-main">
          <div className="success-add-post">
            <h3>
              <CheckCircleOutlinedIcon />
              <span>Success</span>
            </h3>
            <hr />
            <p>Perfect the post successfully added.</p>
          </div>
        </div>
        <div className="fail-add-post-main">
          <div className="fail-add-post">
            <h3>
              <ErrorOutlineIcon />
              <span>Failing</span>
            </h3>
            <hr />
            <p>Error!! Post not added</p>
          </div>
        </div>
        <div className="fail-add-Photopost-main">
          <div className="fail-add-Photopost">
            <h3>
              <ErrorOutlineIcon />
              <span>Failing</span>
            </h3>
            <hr />
            <p>Failed add Photo</p>
          </div>
        </div>
      </div>
    );
  }
}
export default Add;
