import React from "react";
import ImageUpload from "../imageUpload/imageUpload";
class DashProviderInfo extends React.Component {
  state = {
    email: "",
    phone: "",
    adress: "",
    facebook: "",
    instgram: "",
    twitter: "",
  };

  handelChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }
  handleSubmit(event) {
    event.preventDefault();
  }
  render() {
    return (
      <div className="dash-provider-info">
        <div className="your-profile">
          <h2>Your Profile</h2>
          <div className="your-profile-div">
            <form onSubmit={this.handleSubmit}>
              <label for="service-name">Service name: </label>
              <input
                type="text"
                id="service-name"
                name="service-name"
                placeholder="Nadera Mobile"
                disabled
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
              <label for="phone">Phone: </label>
              <input
                type="text"
                id="phone"
                name="phone"
                placeholder="059994415"
                value={this.state.phone}
                onChange={this.handelChange.bind(this)}
              ></input>
              <br />
              <br />
              <label for="adress">Adress: </label>
              <input
                type="text"
                id="adress"
                name="adress"
                placeholder="Palestine Gaza"
                value={this.state.adress}
                onChange={this.handelChange.bind(this)}
              ></input>
              <br />
              <br />
              <input type="submit" value="Edit"></input>
            </form>
          </div>
          <div className="upload-cover-img">
            <label for="Change-cover">Change your cover photo : </label>
            <br />
            <br />
                    <ImageUpload ButtonText={"Upload Image"} />
                    <br />
            <br />
          </div>
        </div>

        <div className="your-socials">
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
            <input type="submit" value="change"></input>
          </form>
        </div>
      </div>
    );
  }
}

export default DashProviderInfo;
