import React, { Component } from "react";
import AddTicket from "./AddTicket";

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tickets: [],
            isLoading: false
        };
    }

    handleUpVote = id => {
        fetch(`http://127.0.0.1:8000/tickets/${id}/upcount`, {
            method: "PUT"
        });
        this.setState(state => {
            const upVotedTicket = state.tickets.find(
                ticket => ticket.id === id
            );
            upVotedTicket.count += 1;
            return state;
        });
    };

    handleDownVote = id => {
        fetch(`http://127.0.0.1:8000/tickets/${id}/downcount`, {
            method: "PUT"
        });
        this.setState(state => {
            const upVotedTicket = state.tickets.find(
                ticket => ticket.id === id
            );
            upVotedTicket.count -= 1;
            return state;
        });
    };

    handleSubmit = post => {
        const data = new FormData(post);
        fetch("http://127.0.0.1:8000/tickets", {
            method: "POST",
            body: data
        }).then(() => {
            this.fetchApi();
        });
    };

    fetchApi = () => {
        this.setState({ isLoading: true });
        fetch("http://127.0.0.1:8000/tickets")
            .then(response => {
                return response.json();
            })
            .then(responseJson => {
                this.setState({ tickets: responseJson, isLoading: false });
            });
    };

    componentDidMount() {
        this.fetchApi();
    }
    render() {
        const sortedTickets = [...this.state.tickets].sort(
            (ticket1, ticket2) => ticket2.count - ticket1.count
        );
        var listTickets = sortedTickets.map(ticket => {
            return (
                <div>
                    <h4 key={ticket.id}>{ticket.title}</h4>
                    <h4>{ticket.count}</h4>
                    <button onClick={() => this.handleUpVote(ticket.id)}>
                        +1
                    </button>
                    <button>-1</button>
                </div>
            );
        });
        return (
            <div className="App">
                {listTickets}
                {this.state.isLoading && "Loading"}
                <AddTicket onSubmit={this.handleSubmit} />
            </div>
        );
    }
}

export default Main;
