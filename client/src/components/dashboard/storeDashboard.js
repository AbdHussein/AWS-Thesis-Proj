import React from "react";

class StoreDashboard extends React.Component {
  state = {
    name: "",
    price: "",
    pic: "",
  };
  handelChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }
  handleClick(event) {
    event.preventDefault();
  }
  render() {
    return (
      <div className="store-dashboard">
        <h2>Add Your Product</h2>
        <div className="product-data">
          <form>
            <label htmlFor="name">Product Name: </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Product Name"
              value={this.state.name}
              onChange={this.handelChange.bind(this)}
            ></input>
            <br />
            <br />
            <label htmlFor="price">Product Price: </label>
            <input
              type="text"
              id="price"
              name="price"
              placeholder="Product Price"
              value={this.state.price}
              onChange={this.handelChange.bind(this)}
            ></input>
            <br />
            <br />
            <label htmlFor="pic">Product Picture: </label>
            <input
              type="text"
              id="pic"
              name="pic"
              placeholder="Product Picture"
              value={this.state.pic}
              onChange={this.handelChange.bind(this)}
            ></input>
            <br />
            <br />
            <button
              className="add-product"
              onClick={this.handleClick.bind(this)}
            >
              Add Product
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default StoreDashboard;
