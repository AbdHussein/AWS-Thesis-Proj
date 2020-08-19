import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";
import CheckCircleOutlinedIcon from "@material-ui/icons/CheckCircleOutlined";
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
    const {serviceName, email , mobile, address, cover} = this.props.provider;
    this.setState({
      serviceName,
      email,
      mobile,
      address,
      imgUrl : cover,
    }, () => {
      console.log(this.state);
    });
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

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  async handleClick(event) {
    try{
        event.preventDefault();
        const { serviceName, email, mobile, address, imgUrl } = this.state;
        const editProviderInfoQuery = Constants.editProviderInfo(
          this.props.provider.id,
          serviceName,
          email,
          mobile,
          address,
          imgUrl,
        );
        const request = await Constants.request(editProviderInfoQuery);
        if(request.data.Errors){
          $(".fail-edit-dashboard-main").show();
          setTimeout(function () {
            $(".fail-edit-dashboard-main").hide();
          }, 1000);
        }else{
          $(".success-edit-dashboard-main").show();
          setTimeout(function () {
            $(".success-edit-dashboard-main").hide();
          }, 1000);
       
        }
    } catch(err) {
      console.log(err);
      $(".fail-edit-dashboard-main").show();
      setTimeout(function () {
        $(".fail-edit-dashboard-main").hide();
      }, 1000);
    }
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
                required={true}
                value={this.state.serviceName}
                onChange={this.handleChange.bind(this)}
              ></input>
              <br />
              <br />
              <label htmlFor='email'>Email: </label>
              <input
                type='text'
                id='email'
                name='email'
                required={true}
                value={this.state.email}
                onChange={this.handleChange.bind(this)}
              ></input>
              <br />
              <br />
              <label htmlFor='mobile'>Mobile: </label>
              <input
                type='text'
                id='mobile'
                name='mobile'
                required={true}
                value={this.state.mobile}
                onChange={this.handleChange.bind(this)}
              ></input>
              <br />
              <br />
              <label htmlFor='adress'>Address: </label>
              <input
                type='text'
                id='address'
                name='address'
                required={true}
                value={this.state.address}
                onChange={this.handleChange.bind(this)}
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
                onChange={this.handleChange.bind(this)}
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
        <div className="success-edit-dashboard-main">
          <div className="success-edit-dashboard">
            <h3>
              <CheckCircleOutlinedIcon />
              <span>Success</span>
            </h3>
            <hr />
            <p>Perfect your information successfully updated.</p>
          </div>
        </div>
        <div className="fail-edit-dashboard-main">
          <div className="fail-edit-dashboard">
            <h3>
              <ErrorOutlineIcon />
              <span>Failing</span>
            </h3>
            <hr />
            <p>
              Error!!  in updating info.</p>
          </div>
        </div>
      </div>
    );
  }
}

export default DashProviderInfo;
