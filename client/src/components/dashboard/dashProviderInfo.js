import React from "react";
import ImageUpload from "../imageUpload/imageUpload";
class DashProviderInfo extends React.Component {
  state = {
    username:"",
    serviceName: "",
    email: "",
    mobile: "",
    address: "",
    imgUrl: "",
    facebook: "",
    instgram: "",
    twitter: "",
  };

  updateImgUrl(url) {
    this.setState({
      imgUrl: url,
    });
  }

  handelChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }
  handleClick(event) {
    event.preventDefault();
  }
  render() {
    return (
      <div className="dash-provider-info">
        <div className="your-profile">
          <h1>Your Profile</h1>
          <div className="your-profile-div">
            <form>
            <label htmlFor="username">User name: </label>
              <input
                type="text"
                id="username"
                name="username"
                placeholder="username"
                value={this.state.username}
                onChange={this.handelChange.bind(this)}
              ></input>
              <br />
              <br />
              <label htmlFor="password">Change your password: </label>
              <input
                type="text"
                id="password"
                name="password"
                placeholder="password"
                value={this.state.password}
                onChange={this.handelChange.bind(this)}
              ></input>
              <br />
              <br />
              <label htmlFor="serviceName">Service name: </label>
              <input
                type="text"
                id="serviceName"
                name="serviceName"
                placeholder="Nadera Mobile"
                value={this.state.serviceName}
                onChange={this.handelChange.bind(this)}
              ></input>
              <br />
              <br />
              <label htmlFor="email">Email: </label>
              <input
                type="text"
                id="email"
                name="email"
                placeholder="naderamobile@gmail.com"
                value={this.state.email}
                onChange={this.handelChange.bind(this)}
              ></input>
              <br />
              <br />
              <label htmlFor="mobile">Mobile: </label>
              <input
                type="text"
                id="mobile"
                name="mobile"
                placeholder="059994415"
                value={this.state.phone}
                onChange={this.handelChange.bind(this)}
              ></input>
              <br />
              <br />
              <label htmlFor="adress">Adress: </label>
              <input
                type="text"
                id="address"
                name="address"
                placeholder="Palestine Gaza"
                value={this.state.adress}
                onChange={this.handelChange.bind(this)}
              ></input>
              <br />
              <br />
              <button className="button-edit" onClick={this.handleClick}>
                Edit
              </button>
            </form>

            <div className="upload-cover-img">
              <label htmlFor="Change-cover">Change your cover photo : </label>
              <br />
              <br />
              <div className="upload">
                <ImageUpload getImgUrl={this.updateImgUrl.bind(this)} />
              </div>
              <br />
              <br />
              {/* <div className="upload-avatar-img">
              <label htmlFor="Change-avatar">Change your avatar photo : </label>
              <br />
              <br />
              <div className="upload-avatar">
                <ImageUpload getImgUrl={this.updateImgUrl.bind(this)} />
              </div>
              <br />
              <br /> */}
            </div>
          </div>
        </div>

        <div className="your-socials">
          <h1>Your Socials</h1>
          <div className="your-socials-div">
            <form onSubmit={this.handleSubmit}>
              <label htmlFor="facebook">Facebook: </label>
              <input
                type="text"
                id="facebook"
                name="facebook"
                placeholder="facebook.com"
                value={this.state.facebook}
                onChange={this.handelChange.bind(this)}
              ></input>
              <br />
              <br />
              <label htmlFor="instgram">Instgram: </label>
              <input
                type="text"
                id="instgram"
                name="instgram"
                placeholder="instgram.com"
                value={this.state.instgram}
                onChange={this.handelChange.bind(this)}
              ></input>
              <br />
              <br />
              <label htmlFor="twitter">Twitter: </label>
              <input
                type="text"
                id="twitter"
                name="twitter"
                placeholder="twitter.com"
                value={this.state.twitter}
                onChange={this.handelChange.bind(this)}
              ></input>
              <br />
              <br />
              <br />
              <button className="button-change" onClick={this.handleClick}>
                Change
              </button>
            </form>
          </div>
        </div>
        </div>
       // </div>
    );
  }
}

export default DashProviderInfo;
