import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import NewSessionForm from '../components/Session/NewSessionForm.jsx';

// React container component for creating a new session.
// Acts as a container for the display-only NewSessionForm component.
class NewSession extends Component {

    constructor(props) {
        super(props);
        this.titleEntered = this.titleEntered.bind(this);
        this.descriptionEntered = this.descriptionEntered.bind(this);
        this.dateEntered = this.dateEntered.bind(this);
        this.speakerSelected = this.speakerSelected.bind(this);
        this.adminSelected = this.adminSelected.bind(this);
        this.submit = this.submit.bind(this);
    }

    componentDidMount() {
        alert('TODO: get all speakers & admins for droplist');
    }


    titleEntered(title) {
        alert('TODO: dispatch action to set value in redux store');
    }

    descriptionEntered(description) {
        alert('TODO: dispatch action to set value in redux store');
    }

    dateEntered(date) {
        alert('TODO: dispatch action to set value in redux store');
    }

    speakerSelected(speakerId) {
        alert('TODO: dispatch action to set value in redux store');
    }

    adminSelected(adminId) {
        alert('TODO: dispatch action to set value in redux store');
    }

    submit() {
        alert('TODO: dispatch action to make REST call to save session');
    }

    render() {
        return (
          <NewSessionForm
            title={this.props.title}
            titleValidation={this.props.titleValidation}
            description={this.props.description}
            descriptionValidation={this.props.descriptionValidation}
            date={this.props.date}
            dateValidation={this.props.dateValidation}
            speakerId={this.props.speakerId}
            speakerIdValidation={this.props.speakerIdValidation}
            adminId={this.props.adminId}
            adminIdValidation={this.props.adminIdValidation}
            error={this.props.error}

            // TODO: replace dummy data with actual retrieved data
            admins={[{ forename: 'Joe', surname: 'Bloggs', id: '1111.2222' }]}
            speakers={[{ forename: 'Blodwyn', surname: 'Jones', id: '3333.4444' }]}

            isFetchingAdmins={this.props.isFetchingAdmins}
            isFetchingSpeakers={this.props.isFetchingSpeakers}
            submitMessage={this.props.submitMessage}

            submit={this.submit}
            titleEntered={this.titleEntered}
            descriptionEntered={this.descriptionEntered}
            dateEntered={this.dateEntered}
            speakerSelected={this.speakerSelected}
            adminSelected={this.adminSelected}
          />
        );
    }
}

function mapStateToProps(state) {
    return {
        // TODO: map redux state to properties for sub-components
    };
}

NewSession.contextTypes = {
    router: PropTypes.func.isRequired,
};


NewSession.propTypes = {
    title: PropTypes.string,
    titleValidation: PropTypes.string,
    description: PropTypes.string,
    descriptionValidation: PropTypes.string,
    date: PropTypes.string,
    dateValidation: PropTypes.string,
    speakerId: PropTypes.string,
    speakerIdValidation: PropTypes.string,
    adminId: PropTypes.string,
    adminIdValidation: PropTypes.string,
    error: PropTypes.string,
    isFetchingAdmins: PropTypes.bool,
    isFetchingSpeakers: PropTypes.bool,
    submitMessage: PropTypes.string,
    submit: PropTypes.func,
    titleEntered: PropTypes.func,
    descriptionEntered: PropTypes.func,
    dateEntered: PropTypes.func,
    speakerSelected: PropTypes.func,
    adminSelected: PropTypes.func,
    dispatch: PropTypes.func,
    admins: PropTypes.array,
    speakers: PropTypes.array,
};

export default connect(mapStateToProps)(NewSession);
