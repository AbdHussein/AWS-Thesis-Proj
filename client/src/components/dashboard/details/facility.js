import React from 'react';

class Facility extends React.Component {
  state = {
    facility: [
      { id: 1, value: 'Free Wi Fi' },
      { id: 2, value: 'Online Ordering' },
      { id: 3, value: 'Elevator In Buliding' },
      { id: 4, value: ' Air Conditioned' },
      { id: 5, value: ' Pet Friendly' },
      { id: 6, value: ' Free Parking' },
      { id: 7, value: ' Smoking Room' },
      { id: 8, value: ' Self Service' },
      { id: 9, value: ' Discounts' },
      { id: 10, value: ' Booking' },
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
    console.log(this.state.checkedItems);
    // this.state.checkedItems.forEach((item, i) => {
    //   this.state.chosenFac.push(this.state.facility[item]);
    // });
    // console.log(this.state.chosenFac);
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
