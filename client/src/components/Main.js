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
        fetch(`http://127.0.0.1:8000/api/tickets/${id}/upcount`, {
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
        fetch(`http://127.0.0.1:8000/api/tickets/${id}/downcount`, {
            method: "PUT"
        });
        this.setState(state => {
            const downVotedTicket = state.tickets.find(
                ticket => ticket.id === id
            );
            downVotedTicket.count = downVotedTicket.count - 1;
            return state;
        });
    };

    handleSubmit = post => {
        const data = new FormData(post);
        fetch("http://127.0.0.1:8000/api/tickets", {
            method: "POST",
            body: data
        }).then(() => {
            this.fetchApi();
        });
    };

    fetchApi = () => {
        this.setState({ isLoading: true });
        fetch("http://127.0.0.1:8000/api/tickets")
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
                <div
                    className="d-flex justify-content-between border border-info align-items-center rounded m-2 bc-light-white"
                    key={ticket.id}
                >
                    <div className="p-3 ml-5">
                        <h4>{ticket.title}</h4>
                        <h5>Score : {ticket.count}</h5>
                    </div>
                    <div className="p-3 ml-5">
                        <button
                            className="btn btn-outline-success m-2"
                            onClick={() => this.handleUpVote(ticket.id)}
                        >
                            +1
                        </button>
                        <button
                            className="btn btn-outline-danger m-2"
                            onClick={() => this.handleDownVote(ticket.id)}
                        >
                            -1
                        </button>
                    </div>
                </div>
            );
        });
        return (
            <div className="container mt-5">
                <AddTicket onSubmit={this.handleSubmit} />
                <h1>{this.state.isLoading && "Loading"}</h1>

                {listTickets}
            </div>
        );
    }
}

export default Main;
