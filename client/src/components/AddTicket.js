import React, { Component } from "react";

class AddTicket extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ""
    };
  }

  handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.target);

    fetch("http://127.0.0.1:8000/tickets", {
      method: "POST",
      body: data
    });
    console.log(data);
  }
  render() {
    console.log(this.state.tickets);
    return (
      <div className="container">
        <h2>form</h2>
        <form id="new-ticket-form" onSubmit={this.handleSubmit}>
          <label>
            <span className="text">Post Your Idea :</span>
            <input type="text" name="title" onChange={this.onChange} />
            <br />
          </label>

          <input type="hidden" value="0" name="count" />

          <div className="align-right">
            <button>Submit</button>
          </div>
        </form>
      </div>
    );
  }
}

export default AddTicket;
