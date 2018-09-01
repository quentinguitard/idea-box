import React, { Component } from "react";

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tickets: []
    };
  }

  componentDidMount() {
    fetch("http://127.0.0.1:8000/tickets")
      .then(response => {
        return response.json();
      })
      .then(responseJson => {
        this.setState({ tickets: responseJson });
      });
  }

  render() {
    console.log(this.state.tickets);
    return (
      <div className="App">
        {this.state.tickets.map(function(ticket, i) {
          return <h4 key={i}>{ticket.title}</h4>;
        })}
      </div>
    );
  }
}

export default Main;
