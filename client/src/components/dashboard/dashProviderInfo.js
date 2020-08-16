import React from "react";
import ImageUpload from "../imageUpload/imageUpload";
class DashProviderInfo extends React.Component {
  state = {
    serviceName:"",
    email: "",
    mobile: "",
    address: "",
    facebook: "",
    instgram: "",
    twitter: "",
  };

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
              <label for="serviceName">Service name: </label>
              <input
                type="text"
                id="serviceName"
                name="serviceName"
                placeholder="Nadera Mobile"
              ></input>
              <br />
              <br />
              <label for="email">Email: </label>
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
              <label for="mobile">Mobile: </label>
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
              <label for="adress">Adress: </label>
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
              <button class="button-edit" onClick={this.handleClick}>
                Edit
              </button>
            </form>
          
          <div className="upload-cover-img">
            <label for="Change-cover">Change your cover photo : </label>
            <br />
            <br />
            <ImageUpload ButtonText={"Upload Image"} />
            <br />
            <br />
            </div>
          </div>
        </div>

        <div className="your-socials">
          <h1>Your Socials</h1>
          <div className="your-socials-div">
          <form onSubmit={this.handleSubmit}>
            <label for="facebook">Facebook: </label>
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
            <label for="instgram">Instgram: </label>
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
            <label for="twitter">Twitter: </label>
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
            <button class="button-change" onClick={this.handleClick}>
                Change
              </button>
          </form>
          </div>
          </div>
      </div>
    );
  }
}

export default DashProviderInfo;
