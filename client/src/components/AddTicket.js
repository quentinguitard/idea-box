import React, { Component } from "react";

class AddTicket extends Component {
    handleSubmit = event => {
        event.preventDefault();
        this.props.onSubmit(event.target);
        this.formRef.reset();
    };
    render() {
        return (
            <div className="container mb-4">
                <form
                    id="new-ticket-form"
                    onSubmit={this.handleSubmit}
                    ref={ref => (this.formRef = ref)}
                >
                    <div className="">
                        <div className="form-group">
                            <label for="title">
                                <h4>Post Your Idea :</h4>
                            </label>

                            <input
                                className="form-control"
                                type="text"
                                name="title"
                                id="title"
                            />
                            <br />

                            <input type="hidden" value="0" name="count" />
                            <button className="btn btn-light">Submit</button>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

export default AddTicket;
