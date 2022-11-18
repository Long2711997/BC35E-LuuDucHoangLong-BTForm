import React, { Component } from 'react'

export default class Form extends Component {
  state = {
    values: {
      id: "",
      name: "",
      price: "",
      productType: "phone",
      image: "",
      description: "",
    },
    errors: {
      id: "",
      name: "",
      price: "",
      image: "",
      description: "",
    },
    valid: false,
  };

  handleSubmit = (e) => {
    e.preventDefault();
    // console.log("hello");
    if (!this.checkValid()) {
      return;
    }
  };

  checkValid = () => {
    let valid = true;
    let { values, errors } = this.state;
    for (let key in this.state.values) {
      if (errors[key] !== "" || values[key] == "") {
        return false;
      }
    }
    return true;
  };

  handleInputChange = (e) => {
    let { id, value, regex } = e.target;

     let dataAttrRegex = e.target.getAttribute("data-regex");
     let type = e.target.getAttribute("data-type");
    //  console.log("dataAttrRegex: ", dataAttrRegex);

    let newValues = this.state.values;
    newValues[id] = value;

    let newErrors = this.state.errors;
    let messErr = "";
    if (value.trim() === "") {
      messErr = id + " cannot be blank";
    } else {
      if (type === "number") {
        let regexNumber = /^\d+$/;
        if (!regexNumber.test(value)) {
          messErr = id + " is invalid";
        }
      }
      if (type === "string") {
        let regexChar = /^[A-Za-z\s]+$/;
        if (!regexChar.test(value)) {
          messErr = id + " is invalid (Characters only)"
        }
      }
    }
    newErrors[id] = messErr;

    this.setState(
      {
        values: newValues,
        errors: newErrors,
      },
      () => {
        // console.log(this.state);
        let valid = this.checkValid();
        this.setState({
          valid: valid,
        });
      }
    );
  };

  render() {
    return (
      <form action="" className="container" onSubmit={this.handleSubmit}>
        <h3>Create Product</h3>
        <div className="card">
          <h3 className="card-header">Product Infor</h3>
          <div className="card-body">
            <div className="row">
              <div className="col-6">
                <div className="form-group">
                  <p>ID:</p>
                  <input
                    type="text"
                    className="form-control"
                    id="id"
                    name="id"
                    onInput={this.handleInputChange}
                  />
                  {this.state.errors.id !== "" && (
                    <div className="alert alert-danger mt-2">
                      {this.state.errors.id}
                    </div>
                  )}
                </div>
                <div className="form-group">
                  <p>Name:</p>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    data-type="string"
                    data-regex="^[A-Za-z]+$"
                    onInput={this.handleInputChange}
                  />
                  {this.state.errors.name !== "" && (
                    <div className="alert alert-danger mt-2">
                      {this.state.errors.name}
                    </div>
                  )}
                </div>
                <div className="form-group">
                  <p>Price:</p>
                  <input
                    type="text"
                    className="form-control"
                    id="price"
                    name="price"
                    data-type="number"
                    data-regex="^\d+$"
                    onInput={this.handleInputChange}
                  />
                  {this.state.errors.price !== "" && (
                    <div className="alert alert-danger mt-2">
                      {this.state.errors.price}
                    </div>
                  )}
                </div>
              </div>
              <div className="col-6">
                <div className="form-group">
                  <p>Image:</p>
                  <input
                    type="text"
                    className="form-control"
                    id="image"
                    name="image"
                    onInput={this.handleInputChange}
                  />
                  {this.state.errors.image !== "" && (
                    <div className="alert alert-danger mt-2">
                      {this.state.errors.image}
                    </div>
                  )}
                </div>
                <div className="form-group">
                  <p>Product Type:</p>
                  <select
                    className="form-control"
                    id="productType"
                    onInput={this.handleInputChange}
                  >
                    <option value={"phone"}>Phone</option>
                    <option value={"tablet"}>Tablet</option>
                    <option value={"laptop"}>Laptop</option>
                  </select>
                </div>
                <div className="form-group">
                  <p>Description:</p>
                  <input
                    type="text"
                    className="form-control"
                    id="description"
                    name="description"
                    onInput={this.handleInputChange}
                  />
                  {this.state.errors.description !== "" && (
                    <div className="alert alert-danger mt-2">
                      {this.state.errors.description}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="card-footer">
            <button className="btn btn-success" type="submit">
              Submit
            </button>
          </div>
        </div>
      </form>
    );
  }
}
