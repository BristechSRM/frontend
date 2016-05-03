import React, { Component, PropTypes } from 'react';
import EventSession from '../components/Calendar/EventSession.jsx';
import { connect } from 'react-redux';
import { getEvent } from '../actions';
import styles from './calendar.scss';

class EventSessions extends Component {

    componentWillMount() {
        this.props.dispatch(getEvent(this.props.params.eventId));
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.params.eventId !== nextProps.params.eventId) {
            this.props.dispatch(getEvent(nextProps.params.eventId));
        }
    }

    renderEventSession(session) {
        return (
          <div key={session.id}>
            <EventSession
              startDate={session.startDate}
              endDate={session.endDate}
              title={session.title}
              description={session.description}
              speakerForename={session.speakerForename}
              speakerSurname={session.speakerSurname}
              speakerImageUri={session.speakerImageUri}
              speakerBio={session.speakerBio}
            />
          </div>
        );
    }

    render() {
        return (
           <div className={styles.eventSessions}>
              {this.props.sessions.map(s => this.renderEventSession(s))}
           </div>
        );
    }
}

EventSessions.propTypes = {
    isFetching: PropTypes.bool,
    error: PropTypes.object,
    sessions: PropTypes.array,
    dispatch: PropTypes.func,
    params: PropTypes.object,
};

function mapStateToProps(state) {
    return {
        isFetching: state.event.isFetching,
        error: state.event.error,
        sessions: state.event.sessions,
    };
}

export default connect(mapStateToProps)(EventSessions);
