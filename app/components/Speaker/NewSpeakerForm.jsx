import React, { Component, PropTypes } from 'react';

class NewSpeakerForm extends Component {

    sendValue(handler) {
        return (ev) => {
            handler(ev.target.value);
        };
    }

    submitButton() {
        const buttonAttributes = {};

        const anythingIsInvalid =
            this.props.forenameValidationMessage ||
            this.props.surnameValidationMessage;

        if (anythingIsInvalid) {
            buttonAttributes.disabled = 'disabled';
        }

        return (
            <input type="submit" value="Submit" {...buttonAttributes} />
        );
    }

    render() {
        return (
          <form
            onSubmit={(event) => { event.preventDefault(); this.props.submit(); return false; } }
          >
              <fieldset>
              <legend>New speaker details</legend>
                <table>
                  <tbody>
                    <tr>
                      <td><label htmlFor="forename">Forename<span className="error">*</span></label></td>
                      <td>
                        <input
                          type="text"
                          id="forename"
                          name="forename"
                          size="40"
                          value={this.props.forename}
                          onChange={this.sendValue(this.props.forenameChanged)}
                        />
                      </td>
                      <td>{this.props.forenameValidationMessage}</td>
                    </tr>
                    <tr>
                      <td><label htmlFor="surname">Surname<span className="error">*</span></label></td>
                      <td>
                        <input
                          type="text"
                          id="surname"
                          name="surname"
                          size="40"
                          value={this.props.surname}
                          onChange={this.sendValue(this.props.surnameChanged)}
                        />
                      </td>
                      <td>{this.props.surnameValidationMessage}</td>
                    </tr>
                    <tr>
                      <td><label htmlFor="imageUri">Profile Image</label></td>
                      <td>
                        <input
                          type="text"
                          id="imageUri"
                          name="imageUri"
                          size="10"
                          value={this.props.imageUri}
                          onChange={this.sendValue(this.props.imageUriChanged)}
                        />
                      </td>
                      <td>
                          <img
                            src={this.props.imageUri}
                            width="100px"
                            height="100px"
                            style={{ width: '100px', height: '100px', backgroundColor: '#DDDDDD' }}
                          />
                      </td>
                    </tr>
                    <tr>
                      <td><label htmlFor="bio">Speaker Bio</label></td>
                      <td>
                        <textarea
                          type="text"
                          id="bio"
                          name="bio"
                          value={this.props.bio}
                          onChange={this.sendValue(this.props.bioChanged)}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>Create new Session next?</td>
                      <td>
                        <input
                          type="checkbox"
                          checked={this.props.createSessionNextSelected}
                          onChange={() => this.props.createSessionNextChanged(!this.props.createSessionNextSelected)}
                        />
                      </td>
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
        );
    }
}

NewSpeakerForm.propTypes = {
    // Data captured by the form
    forename: PropTypes.string,
    forenameValidationMessage: PropTypes.string,

    surname: PropTypes.string,
    surnameValidationMessage: PropTypes.string,

    imageUri: PropTypes.string,

    bio: PropTypes.string,

    createSessionNextSelected: PropTypes.bool,
    error: PropTypes.string,

    // Saving
    submitMessage: PropTypes.string,

    // Handlers for user actions
    submit: PropTypes.func,
    createSessionNextChanged: PropTypes.func,
    forenameChanged: PropTypes.func,
    surnameChanged: PropTypes.func,
    imageUriChanged: PropTypes.func,
    bioChanged: PropTypes.func,
};

export default NewSpeakerForm;
