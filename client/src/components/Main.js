import React, { Component } from "react";
import AddTicket from "./AddTicket";

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tickets: []
    };
  }

  fetchApi = () => {
    fetch("http://127.0.0.1:8000/tickets")
      .then(response => {
        return response.json();
      })
      .then(responseJson => {
        this.setState({ tickets: responseJson });
      });
  };

  render() {
    console.log(this.state.tickets);
    var list_tickets = this.state.tickets.map(function(ticket, i) {
      return <h4 key={i}>{ticket.title}</h4>;
    });
    return (
      <div className="App">
        {list_tickets}
        <AddTicket />
      </div>
    );
  }
}

export default Main;
