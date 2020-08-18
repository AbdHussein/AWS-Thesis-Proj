import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import $ from 'jquery';
import ImageUpload from '../imageUpload/imageUpload';
import Constants from '../constants/Queries';
class DashProviderInfo extends React.Component {
  state = {
    serviceName: '',
    email: '',
    mobile: '',
    address: '',
    imgUrl: '',
    facebook: '',
    instgram: '',
    twitter: '',
  };

  componentDidMount() {  
    $('#providerInfoProgress').hide();
  }

  uploadStarted(){
    $('#providerInfoProgress').show();
    $('#btn').hide();
  }

  updateImgUrl(url) {
    this.setState({
      imgUrl: url,
    },() => {
      $('#providerInfoProgress').hide();
      $('#btn').show();
    });
  }

  handelChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }
  async handleClick(event) {
    event.preventDefault();
    const { serviceName, email, mobile, address } = this.state;
    const editProviderInfoQuery = Constants.editProviderInfo(
      this.props.id,
      serviceName,
      email,
      mobile,
      address,
      this.state.imgUrl
    );
    const request = await Constants.request(editProviderInfoQuery);
  }
  render() {
    return (
      <div className='dash-provider-info'>
        <div className='your-profile'>
          <h1>Your Profile</h1>
          <div className='your-profile-div'>
            <form>
              <label htmlFor='serviceName'>Service name: </label>
              <input
                type='text'
                id='serviceName'
                name='serviceName'
                placeholder='Nadera Mobile'
                value={this.state.serviceName}
                onChange={this.handelChange.bind(this)}
              ></input>
              <br />
              <br />
              <label htmlFor='email'>Email: </label>
              <input
                type='text'
                id='email'
                name='email'
                placeholder='naderamobile@gmail.com'
                value={this.state.email}
                onChange={this.handelChange.bind(this)}
              ></input>
              <br />
              <br />
              <label htmlFor='mobile'>Mobile: </label>
              <input
                type='text'
                id='mobile'
                name='mobile'
                placeholder='059994415'
                value={this.state.phone}
                onChange={this.handelChange.bind(this)}
              ></input>
              <br />
              <br />
              <label htmlFor='adress'>Adress: </label>
              <input
                type='text'
                id='address'
                name='address'
                placeholder='Palestine Gaza'
                value={this.state.adress}
                onChange={this.handelChange.bind(this)}
              ></input>
              <br />
              <br />
              <div className='upload-cover-img'>
                <label htmlFor='Change-cover'>Change your cover photo : </label>
                <br />
                <br />
                <div className='upload'>
                  <ImageUpload getImgUrl={this.updateImgUrl.bind(this)} uploadStarted={this.uploadStarted.bind(this)}/>
                </div>                
                <div id="providerInfoProgress">
                  <CircularProgress />
                </div>
                <br />
              </div>
              <button
                className='button-edit'
                id="btn"
                onClick={this.handleClick.bind(this)}
              >
                Edit
              </button>
            </form>
          </div>
        </div>

        {/* <div className="your-socials">
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

        {/* <label htmlFor="from">From:</label>
            <input type="time" id="from" name="from" /> */}

        <div className="dash-working-hours">
          <h1>Add Your Working Hours</h1>
          <div className="Working-hours-dash">
            <div className="main-enter-workHours">
              <ul>
                <li>
                  <span>
                    <label>Saturday:</label>
                  </span>
                  <span>
                    <select>
                      <option>1:00 AM</option>
                      <option>2:00 AM</option>
                      <option>3:00 AM</option>
                      <option>4:00 AM</option>
                      <option>5:00 AM</option>
                      <option>6:00 AM</option>
                      <option>7:00 AM</option>
                      <option>8:00 AM</option>
                      <option>9:00 AM</option>
                      <option>10:00 AM</option>
                      <option>11:00 AM</option>
                      <option>12:00 AM</option>
                    </select>
                  </span>
                  <span>To</span>
                  <span>
                    <select>
                      <option>1:00 PM</option>
                      <option>2:00 PM</option>
                      <option>3:00 PM</option>
                      <option>4:00 PM</option>
                      <option>5:00 PM</option>
                      <option>6:00 PM</option>
                      <option>7:00 PM</option>
                      <option>8:00 PM</option>
                      <option>9:00 PM</option>
                      <option>10:00 PM</option>
                      <option>11:00 PM</option>
                      <option>12:00 PM</option>
                    </select>
                  </span>
                </li>
                <li>
                  <span>
                    <label>Sunday:</label>
                  </span>
                  <span>
                    <select>
                      <option>1:00 AM</option>
                      <option>2:00 AM</option>
                      <option>3:00 AM</option>
                      <option>4:00 AM</option>
                      <option>5:00 AM</option>
                      <option>6:00 AM</option>
                      <option>7:00 AM</option>
                      <option>8:00 AM</option>
                      <option>9:00 AM</option>
                      <option>10:00 AM</option>
                      <option>11:00 AM</option>
                      <option>12:00 AM</option>
                    </select>
                  </span>
                  <span>To</span>
                  <span>
                    <select>
                      <option>1:00 PM</option>
                      <option>2:00 PM</option>
                      <option>3:00 PM</option>
                      <option>4:00 PM</option>
                      <option>5:00 PM</option>
                      <option>6:00 PM</option>
                      <option>7:00 PM</option>
                      <option>8:00 PM</option>
                      <option>9:00 PM</option>
                      <option>10:00 PM</option>
                      <option>11:00 PM</option>
                      <option>12:00 PM</option>
                    </select>
                  </span>
                </li>
                <li>
                  <span>
                    <label>Monday:</label>
                  </span>
                  <span>
                    <select>
                      <option>1:00 AM</option>
                      <option>2:00 AM</option>
                      <option>3:00 AM</option>
                      <option>4:00 AM</option>
                      <option>5:00 AM</option>
                      <option>6:00 AM</option>
                      <option>7:00 AM</option>
                      <option>8:00 AM</option>
                      <option>9:00 AM</option>
                      <option>10:00 AM</option>
                      <option>11:00 AM</option>
                      <option>12:00 AM</option>
                    </select>
                  </span>
                  <span>To</span>
                  <span>
                    <select>
                      <option>1:00 PM</option>
                      <option>2:00 PM</option>
                      <option>3:00 PM</option>
                      <option>4:00 PM</option>
                      <option>5:00 PM</option>
                      <option>6:00 PM</option>
                      <option>7:00 PM</option>
                      <option>8:00 PM</option>
                      <option>9:00 PM</option>
                      <option>10:00 PM</option>
                      <option>11:00 PM</option>
                      <option>12:00 PM</option>
                    </select>
                  </span>
                </li>
                <li>
                  <span>
                    <label>Tuesday:</label>
                  </span>
                  <span>
                    <select>
                      <option>1:00 AM</option>
                      <option>2:00 AM</option>
                      <option>3:00 AM</option>
                      <option>4:00 AM</option>
                      <option>5:00 AM</option>
                      <option>6:00 AM</option>
                      <option>7:00 AM</option>
                      <option>8:00 AM</option>
                      <option>9:00 AM</option>
                      <option>10:00 AM</option>
                      <option>11:00 AM</option>
                      <option>12:00 AM</option>
                    </select>
                  </span>
                  <span>To</span>
                  <span>
                    <select>
                      <option>1:00 PM</option>
                      <option>2:00 PM</option>
                      <option>3:00 PM</option>
                      <option>4:00 PM</option>
                      <option>5:00 PM</option>
                      <option>6:00 PM</option>
                      <option>7:00 PM</option>
                      <option>8:00 PM</option>
                      <option>9:00 PM</option>
                      <option>10:00 PM</option>
                      <option>11:00 PM</option>
                      <option>12:00 PM</option>
                    </select>
                  </span>
                </li>
                <li>
                  <span>
                    <label>Wednesday:</label>
                  </span>
                  <span>
                    <select>
                      <option>1:00 AM</option>
                      <option>2:00 AM</option>
                      <option>3:00 AM</option>
                      <option>4:00 AM</option>
                      <option>5:00 AM</option>
                      <option>6:00 AM</option>
                      <option>7:00 AM</option>
                      <option>8:00 AM</option>
                      <option>9:00 AM</option>
                      <option>10:00 AM</option>
                      <option>11:00 AM</option>
                      <option>12:00 AM</option>
                    </select>
                  </span>
                  <span>To</span>
                  <span>
                    <select>
                      <option>1:00 PM</option>
                      <option>2:00 PM</option>
                      <option>3:00 PM</option>
                      <option>4:00 PM</option>
                      <option>5:00 PM</option>
                      <option>6:00 PM</option>
                      <option>7:00 PM</option>
                      <option>8:00 PM</option>
                      <option>9:00 PM</option>
                      <option>10:00 PM</option>
                      <option>11:00 PM</option>
                      <option>12:00 PM</option>
                    </select>
                  </span>
                </li>
                <li>
                  <span>
                    <label>Thursday:</label>
                  </span>
                  <span>
                    <select>
                      <option>1:00 AM</option>
                      <option>2:00 AM</option>
                      <option>3:00 AM</option>
                      <option>4:00 AM</option>
                      <option>5:00 AM</option>
                      <option>6:00 AM</option>
                      <option>7:00 AM</option>
                      <option>8:00 AM</option>
                      <option>9:00 AM</option>
                      <option>10:00 AM</option>
                      <option>11:00 AM</option>
                      <option>12:00 AM</option>
                    </select>
                  </span>
                  <span>To</span>
                  <span>
                    <select>
                      <option>1:00 PM</option>
                      <option>2:00 PM</option>
                      <option>3:00 PM</option>
                      <option>4:00 PM</option>
                      <option>5:00 PM</option>
                      <option>6:00 PM</option>
                      <option>7:00 PM</option>
                      <option>8:00 PM</option>
                      <option>9:00 PM</option>
                      <option>10:00 PM</option>
                      <option>11:00 PM</option>
                      <option>12:00 PM</option>
                    </select>
                  </span>
                </li>
                <li>
                  <span>
                    <label>Friday:</label>
                  </span>
                  <span>
                    <select>
                      <option>1:00 AM</option>
                      <option>2:00 AM</option>
                      <option>3:00 AM</option>
                      <option>4:00 AM</option>
                      <option>5:00 AM</option>
                      <option>6:00 AM</option>
                      <option>7:00 AM</option>
                      <option>8:00 AM</option>
                      <option>9:00 AM</option>
                      <option>10:00 AM</option>
                      <option>11:00 AM</option>
                      <option>12:00 AM</option>
                    </select>
                  </span>
                  <span>To</span>
                  <span>
                    <select>
                      <option>1:00 PM</option>
                      <option>2:00 PM</option>
                      <option>3:00 PM</option>
                      <option>4:00 PM</option>
                      <option>5:00 PM</option>
                      <option>6:00 PM</option>
                      <option>7:00 PM</option>
                      <option>8:00 PM</option>
                      <option>9:00 PM</option>
                      <option>10:00 PM</option>
                      <option>11:00 PM</option>
                      <option>12:00 PM</option>
                    </select>
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default DashProviderInfo;
