import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import NewEventForm from '../components/Events/NewEventForm.jsx';


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
        alert('Action on name entered TBD');
    }

    dateEntered(date) {
        alert('Action on date entered TBD');
    }

    submit() {
        alert('Action on form submit TBD');
    }

    render() {
        return (
          <NewEventForm
            name={this.props.name}
            nameValidation={this.props.nameValidation}
            date={this.props.date}
            dateValidation={this.props.dateValidation}
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
        submitMessage: 'TBD',
        name: 'TBD',
        nameValidation: 'TBD',
        date: 'TBD',
        dateValidation: 'TBD',
        error: 'TBD',
    };
}

NewEvent.contextTypes = {
    router: PropTypes.func.isRequired,
};


NewEvent.propTypes = {
    name: PropTypes.string,
    nameValidation: PropTypes.string,
    date: PropTypes.string,
    dateValidation: PropTypes.string,
    error: PropTypes.string,
    submitMessage: PropTypes.string,
    submit: PropTypes.func,
    nameEntered: PropTypes.func,
    dateEntered: PropTypes.func,
    dispatch: PropTypes.func,
};

export default connect(mapStateToProps)(NewEvent);
