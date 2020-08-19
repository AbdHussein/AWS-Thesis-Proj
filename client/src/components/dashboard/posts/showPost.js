import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";
import $ from "jquery";
import Constants from "../../constants/Queries";

class Show extends React.Component {
  async componentDidMount() {
    $(".edit-icon").hover(function () {
      $(this).siblings(".edit-hover").toggle();
    });
    $(".delete-icon").hover(function () {
      $(this).siblings(".delete-hover").toggle();
    });
  }

  async handleDelete(id) {
    const mutation = Constants.deletePost(id);
    await Constants.request(mutation);
    const query = Constants.getUserByToken(localStorage.getItem("xTown"));
    const requestForProviderID = await Constants.request(query);
    const provider = requestForProviderID.data.data.user;
    const allPostsQuery = Constants.getPostByProviderID(provider.id);
    const requestForPosts = await Constants.request(allPostsQuery);
    this.setState({
      posts: requestForPosts.data.data.posts,
    });
  }

  async handleEdit(id) {
    console.log("Edit clicked");
  }

  render() {
    return (
      <div className="dash-show">
        <h1>Your Posts</h1>
        {this.props.posts &&
          this.props.posts.map((post, index) => {
            return (
              <div className="post-block" key={index}>
                <div className="drop-delete">
                  <div className="delete-waring">
                    <h3>
                      <ErrorOutlineIcon />
                      <span>Delete this post</span>
                    </h3>
                    <hr />
                    <p>
                      Do you want to <strong>DELETE</strong> this post?
                    </p>
                    <button
                      className="yes-btn"
                      id="yes"
                      onClick={() => {
                        this.handleDelete(post.id);
                        this.props.posts.splice(index, 1);
                      }}
                    >
                      Yes
                    </button>
                    <button
                      className="no-btn"
                      id="no"
                      onClick={() => {
                        $(".drop-delete").hide();
                      }}
                    >
                      No
                    </button>
                  </div>
                </div>
                <div className="post-img-div">
                  {" "}
                  <img src={post.image} />
                  {/* <img src='https://townhub.kwst.net/images/all/1.jpg' /> */}
                </div>
                <div className="post-descri-div">
                  {/* <h4>New Version for huawai</h4>
                <p>40 Journal Square Plaza, NJ, USA</p> */}
                  <h4>{post.text}</h4>
                  <p>{post.date}</p>
                </div>
                <div className="post-edit-delete">
                  <FontAwesomeIcon
                    icon={faEdit}
                    className="edit-icon"
                    onClick={() => {
                      this.handleEdit(post.id);
                    }}
                  />
                  <p className="edit-hover">Edit</p>
                  <FontAwesomeIcon
                    icon={faTrash}
                    className="delete-icon"
                    onClick={() => {
                      $(".drop-delete").show();
                    }}
                  />
                  <p className="delete-hover">Delete</p>
                </div>
              </div>
            );
          })}
      </div>
    );
  }
}

export default Show;
