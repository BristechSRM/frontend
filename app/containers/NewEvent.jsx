import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import NewEventForm from '../components/Events/NewEventForm.jsx';
import {
    newEventNameEntered,
    newEventDateEntered,
    submitNewEvent,
} from '../actions';

// React container component for creating a new event.
// Acts as a container for the display-only NewEventForm component.
class NewEvent extends Component {

    constructor(props) {
        super(props);
        this.nameEntered = this.nameEntered.bind(this);
        this.dateEntered = this.dateEntered.bind(this);
        this.submit = this.submit.bind(this);
    }

    componentDidMount() {
    }


    nameEntered(name) {
        this.props.dispatch(newEventNameEntered(name));
    }

    dateEntered(date) {
        this.props.dispatch(newEventDateEntered(date));
    }

    submit() {
        this.props.dispatch(submitNewEvent(this.context.router));
    }

    render() {
        return (
          <NewEventForm
            name={this.props.name}
            nameValidationMessage={this.props.nameValidationMessage}
            date={this.props.date}
            dateValidationMessage={this.props.dateValidationMessage}
            error={this.props.error}
            submitMessage={this.props.submitMessage}

            submit={this.submit}
            nameEntered={this.nameEntered}
            dateEntered={this.dateEntered}
          />
        );
    }
}

function mapStateToProps(state) {
    return {
        submitMessage: state.newevent.submitMessage,
        name: state.newevent.name,
        nameValidationMessage: state.newevent.nameValidationMessage,
        date: state.newevent.date,
        dateValidationMessage: state.newevent.dateValidationMessage,
        error: state.newevent.error,
    };
}

NewEvent.contextTypes = {
    router: PropTypes.func.isRequired,
};


NewEvent.propTypes = {
    name: PropTypes.string,
    nameValidationMessage: PropTypes.string,
    date: PropTypes.string,
    dateValidationMessage: PropTypes.string,
    error: PropTypes.string,
    submitMessage: PropTypes.string,
    submit: PropTypes.func,
    nameEntered: PropTypes.func,
    dateEntered: PropTypes.func,
    dispatch: PropTypes.func,
};

export default connect(mapStateToProps)(NewEvent);
