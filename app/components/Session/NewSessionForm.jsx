import React, { Component, PropTypes } from 'react';


// A form into which the user can enter details of a new session
class NewSessionForm extends Component {

    sendValue(handler) {
        return (ev) => {
            handler(ev.target.value);
        };
    }

    adminsDroplist() {
        if (this.props.isFetchingAdmins) {
            return <select><option>Loading admins...</option></select>;
        }

        return (
            <select
              id="admin"
              name="admin"
              value={this.props.adminId}
              onChange={this.sendValue(this.props.adminSelected)}
            >
              <option value=""></option>
              {
                  this.props.admins.map(s =>
                    <option key={`adm-${s.id}`} value={s.id}>{`${s.forename} ${s.surname}`}</option>
                  )
              }
            </select>
        );
    }

    speakersDroplist() {
        if (this.props.isFetchingSpeakers) {
            return <select><option>Loading speakers...</option></select>;
        }

        return (
            <select
              id="speaker"
              name="speaker"
              value={this.props.speakerId}
              onChange={this.sendValue(this.props.speakerSelected)}
            >
              <option value=""></option>
              {
                  this.props.speakers.map(s =>
                    <option key={`spk-${s.id}`} value={s.id}>{`${s.forename} ${s.surname}`}</option>
                  )
              }
            </select>
        );
    }

    submitButton() {
        const buttonAttributes = {};

        const anythingIsInvalid =
            this.props.titleValidationMessage ||
            this.props.descriptionValidationMessage ||
            this.props.dateValidationMessage ||
            this.props.adminIdValidationMessage ||
            this.props.speakerIdValidationMessage;

        if (anythingIsInvalid) {
            buttonAttributes.disabled = 'disabled';
        }

        return (
            <input type="submit" value="Submit" {...buttonAttributes} />
        );
    }

    render() {
        return (
            <div>
              <h1>Create New Session</h1>
              <form
                onSubmit={(event) => { event.preventDefault(); this.props.submit(); return false; } }
              >
                  <fieldset>
                  <legend>New session details</legend>
                    <table>
                      <tbody>
                        <tr>
                          <td><label htmlFor="title">Title <span className="error">*</span></label></td>
                          <td>
                            <input
                              type="text"
                              id="title"
                              name="title"
                              size="40"
                              value={this.props.title}
                              onChange={this.sendValue(this.props.titleEntered)}
                            />
                          </td>
                          <td>{this.props.titleValidationMessage}</td>
                        </tr>
                        <tr>
                          <td><label htmlFor="description">Description <span className="error">*</span></label></td>
                          <td>
                            <input
                              type="text"
                              id="description"
                              name="description"
                              size="40"
                              value={this.props.description}
                              onChange={this.sendValue(this.props.descriptionEntered)}
                            />
                          </td>
                          <td>{this.props.descriptionValidationMessage}</td>
                        </tr>
                        <tr>
                          <td><label htmlFor="date">Session date <span className="error">*</span></label></td>
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
                          <td><label htmlFor="speaker">Speaker <span className="error">*</span></label></td>
                          <td>{this.speakersDroplist()}</td>
                          <td>{this.props.speakerIdValidationMessage}</td>
                        </tr>
                        <tr>
                          <td><label htmlFor="admin">Admin <span className="error">*</span></label></td>
                          <td>{this.adminsDroplist()}</td>
                          <td>{this.props.adminIdValidationMessage}</td>
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


NewSessionForm.propTypes = {
    // Data captured by the form
    title: PropTypes.string,
    titleValidationMessage: PropTypes.string,

    description: PropTypes.string,
    descriptionValidationMessage: PropTypes.string,

    date: PropTypes.string,
    dateValidationMessage: PropTypes.string,

    speakerId: PropTypes.string,
    speakerIdValidationMessage: PropTypes.string,

    adminId: PropTypes.string,
    adminIdValidationMessage: PropTypes.string,

    error: PropTypes.string,

    // Droplists async population
    admins: PropTypes.array,
    speakers: PropTypes.array,
    isFetchingAdmins: PropTypes.bool,
    isFetchingSpeakers: PropTypes.bool,

    // Saving
    submitMessage: PropTypes.string,

    // Handlers for user actions
    submit: PropTypes.func,
    titleEntered: PropTypes.func,
    descriptionEntered: PropTypes.func,
    dateEntered: PropTypes.func,
    speakerSelected: PropTypes.func,
    adminSelected: PropTypes.func,
};

export default NewSessionForm;
