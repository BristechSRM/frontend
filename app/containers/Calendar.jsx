import React, { Component, PropTypes } from 'react';
import EventList from '../components/Calendar/EventList.jsx';
import immutable from 'immutable';
import { connect } from 'react-redux';
import { getAllEvents } from '../actions';

class Calendar extends Component {

    componentDidMount() {
        this.props.dispatch(getAllEvents());
    }

    handleEventSelected() {
    }

    render() {
        return (
            <EventList events={this.props.events} onEventSelected={e => this.handleEventSelected(e)} />
        );
    }
}

Calendar.propTypes = {
    events: PropTypes.instanceOf(immutable.List),
    dispatch: PropTypes.func,
};

function mapStateToProps(state) {
    return {
        isFetching: state.get('events').get('isFetching'),
        error: state.get('events').get('error'),
        events: state.get('events').get('events'),
    };
}

export default connect(mapStateToProps)(Calendar);
