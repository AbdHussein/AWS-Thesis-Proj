import React from 'react';
import CheckCircleOutlinedIcon from "@material-ui/icons/CheckCircleOutlined";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";
import Constants from '../../constants/Queries';
import $ from "jquery";
class Facility extends React.Component {
  state = {
    facility: [
      { id: 0, value: 'Free Wi Fi' },
      { id: 1, value: 'Online Ordering' },
      { id: 2, value: 'Elevator In Buliding' },
      { id: 3, value: 'Air Conditioned' },
      { id: 4, value: 'Pet Friendly' },
      { id: 5, value: 'Free Parking' },
      { id: 6, value: 'Smoking Room' },
      { id: 7, value: 'Discounts' },
      { id: 8, value: 'Booking' },
    ],
    checkedItems: new Map(),
    chosenFac: [],
  };

  handleChange(event) {
    var isChecked = event.target.checked;
    var item = event.target.value;

    this.setState((prevState) => ({
      checkedItems: prevState.checkedItems.set(item, [item, isChecked]),
    }));
  }

  async handleSubmit(event) {
    event.preventDefault();
    this.state.checkedItems.forEach((item, i) => {
      if (item[1]) {
        this.state.chosenFac.push(this.state.facility[item[0]]);
      }
    });
    this.setState({
      chosenFac: [],
    });
    var facilities = JSON.stringify(this.state.chosenFac);
    var arrOfFac = facilities.split('');
    for (let i = 0; i < arrOfFac.length; i++) {
      if (arrOfFac[i] == '"') {
        arrOfFac.splice(i, 1, '\\"');
      }
    }
    facilities = arrOfFac.join('');
    const addFs = Constants.addFacilities(this.props.id, facilities);
    const request = await Constants.request(addFs)
    .then(async (result) => {
      
        $(".success-add-facility-main").show();
    setTimeout(function () {
      $(".success-add-facility-main").hide();
    }, 1000);
      
    })
    .catch((err) => {
      $(".fail-add-facility-main").show();
      setTimeout(function () {
        $(".fail-add-facility-main").hide();
      }, 1000);
    });
} catch (err) {
  console.log(err);
}
    
  render() {
    return (
      <div className='facility'>
        <h2>What are facilities your shop have? </h2>
        <div className='facility-div'>
          <form onSubmit={this.handleSubmit.bind(this)}>
            {this.state.facility.map((item, index) => (
              <li key={index}>
                <label>
                  <input
                    type='checkbox'
                    value={item.id}
                    onChange={this.handleChange.bind(this)}
                  />{' '}
                  {item.value}
                </label>
              </li>
            ))}

            <br />
            <input type='submit' value='Submit' />
          </form>
        </div>
        <div className="success-add-facility-main">
          <div className="success-add-facility">
            <h3>
              <CheckCircleOutlinedIcon />
              <span>Success</span>
            </h3>
            <hr />
            <p>Perfect your new facility successfully added.</p>
          </div>
        </div>
        <div className="fail-add-facility-main">
          <div className="fail-add-facility">
            <h3>
              <ErrorOutlineIcon />
              <span>Failing</span>
            </h3>
            <hr />
            <p>
              Error!! Your facility not added</p>
          </div>
        </div>
      </div>
    );
  }
}

export default Facility;
