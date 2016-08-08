import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import NewSessionForm from '../components/Session/NewSessionForm.jsx';
import {
    newSessionTitleEntered,
    newSessionDescriptionEntered,
    newSessionDateEntered,
    newSessionSpeakerSelected,
    newSessionAdminSelected,
    getAllSpeakers,
    getAllAdmins,
    submitNewSession,
} from '../actions';
// TBD import styles from './session.scss';


// Container component for creating a new session.
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
        this.props.dispatch(getAllSpeakers());
        this.props.dispatch(getAllAdmins());
    }


    titleEntered(title) {
        this.props.dispatch(newSessionTitleEntered(title));
    }

    descriptionEntered(description) {
        this.props.dispatch(newSessionDescriptionEntered(description));
    }

    dateEntered(date) {
        this.props.dispatch(newSessionDateEntered(date));
    }

    speakerSelected(speakerId) {
        this.props.dispatch(newSessionSpeakerSelected(speakerId));
    }

    adminSelected(adminId) {
        this.props.dispatch(newSessionAdminSelected(adminId));
    }

    submit() {
        this.props.dispatch(submitNewSession(this.context.router));
    }

    // http://stackoverflow.com/questions/591539/can-form-styling-be-done-without-tables
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
            admins={this.props.admins}
            speakers={this.props.speakers}
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
        admins: state.newsession.admins,
        speakers: state.newsession.speakers,
        isFetchingAdmins: state.newsession.isFetchingAdmins,
        isFetchingSpeakers: state.newsession.isFetchingSpeakers,
        submitMessage: state.newsession.submitMessage,
        title: state.newsession.title,
        titleValidation: state.newsession.titleValidation,
        description: state.newsession.description,
        descriptionValidation: state.newsession.descriptionValidation,
        date: state.newsession.date,
        dateValidation: state.newsession.dateValidation,
        speakerId: state.newsession.speakerId,
        speakerIdValidation: state.newsession.speakerIdValidation,
        adminId: state.newsession.adminId,
        adminIdValidation: state.newsession.adminIdValidation,
        error: state.newsession.error,
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
