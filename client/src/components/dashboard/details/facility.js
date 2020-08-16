import React from "react";

class Facility extends React.Component {
  constructor() {
    super();
    this.state = {
      facility: [
        { id: 1, value: "Free Wi Fi" },
        { id: 2, value: "Online Ordering" },
        { id: 3, value: "Elevator In Buliding" },
        { id: 4, value: " Air Conditioned" },
        { id: 5, value: " Pet Friendly" },
        { id: 6, value: " Free Parking" },
        { id: 7, value: " Smoking Room" },
        { id: 8, value: " Self Service" },
        { id: 9, value: " Discounts" },
        { id: 10, value: " Booking" },
      ],
      checkedItems: new Map(),
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    var isChecked = event.target.checked;
    var item = event.target.value;

    this.setState((prevState) => ({
      checkedItems: prevState.checkedItems.set(item, isChecked),
    }));
  }

  handleSubmit(event) {
    console.log(this.state);
    event.preventDefault();
  }

  render() {
    return (
      <div className="facility">
        <h2>What are facilities your shop have? </h2>

        <form onSubmit={this.handleSubmit}>
          {this.state.facility.map((item) => (
            <li>
              <label>
                <input
                  type="checkbox"
                  value={item.id}
                  onChange={this.handleChange}
                />{" "}
                {item.value}
              </label>
            </li>
          ))}

          <br />
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default Facility;
