import React, { Component } from "react";

class AddTicket extends Component {
    handleSubmit = event => {
        event.preventDefault();
        this.props.onSubmit(event.target);
        this.formRef.reset();
    };
    render() {
        return (
            <div className="container">
                <h2>form</h2>
                <form
                    id="new-ticket-form"
                    onSubmit={this.handleSubmit}
                    ref={ref => (this.formRef = ref)}
                >
                    <label>
                        <span className="text">Post Your Idea :</span>
                        <input type="text" name="title" />
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
