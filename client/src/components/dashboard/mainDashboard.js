import React from "react";
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import $ from 'jquery';
class MainDashboard extends React.Component {

    componentDidMount() {
        // $('.delete-waring button').click(function () {
        //     $('.popup-delete').show();
        // })
    }
  render() {
    return (
        <div className="dash-main-dashboard">
            <div className="drop-delete">
        <div className="delete-waring">
          <h3><ErrorOutlineIcon /><span>Delete this post</span></h3><hr/>
          <p>
            Do you want to <strong>DELETE</strong> this post?
          </p>
          <button className="yes-btn">Yes</button>
          <button className="no-btn">No</button>
        </div>
            {/* <div className="popup-delete">
                <div className="popup-content">
                    test
                </div>
            </div> */}
            </div>
        </div>
    );
  }
}

export default MainDashboard;
