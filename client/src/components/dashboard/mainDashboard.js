import React from "react";
import WarningIcon from '@material-ui/icons/Warning';
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
        <div className="delete-waring">
          <h3><WarningIcon />Warning</h3>
          <p>
            Do you want to <strong>DELETE</strong> this post?
          </p>
          <button>Yes</button>
          <button>No</button>
        </div>
            {/* <div className="popup-delete">
                <div className="popup-content">
                    test
                </div>
            </div> */}
      </div>
    );
  }
}

export default MainDashboard;
