import React, { Component } from "react";

class AddTicket extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ""
    };
  }

  render() {
    console.log(this.state.tickets);
    return (
      <div className="container">
        <h4>form</h4>
      </div>
    );
  }
}

export default AddTicket;
