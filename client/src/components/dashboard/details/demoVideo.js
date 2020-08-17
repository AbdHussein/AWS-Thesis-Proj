import React from "react";
import VideoUpload from "../../videoUpload/videoUpload";
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Constatnts from '../../constants/Queries';
import $ from 'jquery';


class DemoVideo extends React.Component {
  // classes = useStyles();
  state ={
    vidUrl: null
  }
  componentDidMount(){
    $('.MuiCircularProgress-svg').hide();
  }

  uploadStarted(){
    $('.MuiCircularProgress-svg').show();
    $('.btn').hide();
  }

  getVidUrl(url){
    this.setState({
      vidUrl: url
    }, () =>{
      //TODO Enable button
      $('.MuiCircularProgress-svg').hide();
      $('.btn').show();
    })
  }

  onSubmit(){
    const addVidQuery = Constatnts.addDesc(
      this.props.id,
      this.state.vidUrl
    );
    Constatnts.request(addVidQuery).then(response => {
      if(response.data.errors){
        console.log(response.data.errors[0]);
      } else {
        alert('Video saved successfully');
      }
    }).catch(err => {
      console.log(err);
    })
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
            <VideoUpload getVidUrl={this.getVidUrl.bind(this)} uploadStarted={this.uploadStarted.bind(this)}/>
          </div>
          <br></br>
          <div>
          <CircularProgress />
          </div>
          <br></br>
          <button
            type='button'
            id = 'uploadVideoBtn'
            className='btn'
            onClick={this.onSubmit.bind(this)}
          >
            Add Video
          </button>
        </div>
      </div>
    );
  }
}

export default DemoVideo;
