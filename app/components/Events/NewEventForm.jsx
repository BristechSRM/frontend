import React, { Component, PropTypes } from 'react';

// A form into which the user can enter details of a new event
class NewEventForm extends Component {

    sendValue(handler) {
        return (ev) => {
            handler(ev.target.value);
        };
    }

    submitButton() {
        const buttonAttributes = {};

        const somethingIsInvalid =
            this.props.nameValidationMessage ||
            this.props.dateValidationMessage;

        if (somethingIsInvalid) {
            buttonAttributes.disabled = 'disabled';
        }

        return (
            <input type="submit" value="Submit" {...buttonAttributes} />
        );
    }

    render() {
        return (
            <div>
              <h1>Create New Event</h1>
              <form
                onSubmit={(event) => { event.preventDefault(); this.props.submit(); return false; } }
              >
                  <fieldset>
                  <legend>New event details</legend>
                    <table>
                      <tbody>
                        <tr>
                          <td><label htmlFor="name">Name <span className="error">*</span></label></td>
                          <td>
                            <input
                              type="text"
                              id="name"
                              name="name"
                              size="40"
                              value={this.props.name}
                              onChange={this.sendValue(this.props.nameEntered)}
                            />
                          </td>
                          <td>{this.props.nameValidationMessage}</td>
                        </tr>
                        <tr>
                          <td><label htmlFor="date">Event date <span className="error">*</span></label></td>
                          <td>
                            <input
                              type="text"
                              id="date"
                              name="date"
                              size="10"
                              value={this.props.date}
                              onChange={this.sendValue(this.props.dateEntered)}
                            />
                            <span className="note">DD/MM/YYYY</span>
                          </td>
                          <td>{this.props.dateValidationMessage}</td>
                        </tr>
                        <tr>
                          <td></td>
                          <td>
                            {this.submitButton()}
                            {this.props.submitMessage}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                </fieldset>
              </form>
            </div>
        );
    }
}


NewEventForm.propTypes = {
    // Data captured by the form
    name: PropTypes.string,
    nameValidationMessage: PropTypes.string,

    date: PropTypes.string,
    dateValidationMessage: PropTypes.string,

    error: PropTypes.string,

    // Saving
    submitMessage: PropTypes.string,

    // Handlers for user actions
    submit: PropTypes.func,
    nameEntered: PropTypes.func,
    dateEntered: PropTypes.func,
};

export default NewEventForm;
