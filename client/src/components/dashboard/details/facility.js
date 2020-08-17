import React from 'react';

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
      { id: 7, value: 'Self Service' },
      { id: 8, value: 'Discounts' },
      { id: 9, value: 'Booking' },
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

  handleSubmit(event) {
    event.preventDefault();
    this.state.checkedItems.forEach((item, i) => {
      if (item[1]) {
        this.state.chosenFac.push(this.state.facility[item[0]]);
      }
    });
    console.log(this.state.chosenFac);
    this.setState({
      chosenFac: [],
    });
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
      </div>
    );
  }
}

export default Facility;
