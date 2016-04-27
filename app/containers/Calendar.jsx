import React, { Component, PropTypes } from 'react';
import EventList from '../components/Calendar/EventList.jsx';
import EventSession from '../components/Calendar/EventSession.jsx';
import immutable from 'immutable';
import { connect } from 'react-redux';
import { getAllEvents, getEvent } from '../actions';
import styles from './calendar.scss';

class Calendar extends Component {

    componentDidMount() {
        this.props.dispatch(getAllEvents());
    }

    handleEventSelected(event) {
        this.props.dispatch(getEvent(event.id));
    }

    renderEventSession(session) {
        return (
          <div>
            <EventSession
              key={session.id}
              date={session.date}
              title={session.title}
              speakerForename={session.speakerForename}
              speakerSurname={session.speakerSurname}
              speakerImageUri={session.speakerImageUri}
            />
          </div>
        );
    }

    render() {
        return (
            <div className={styles.calendar}>
               <div className={styles.eventList}>
                  <EventList events={this.props.events.list} onEventSelected={e => this.handleEventSelected(e)} />
               </div>
               <div className={styles.eventSessions}>
                  {this.props.event.sessions.map(s => this.renderEventSession(s))}
               </div>
            </div>
        );
    }
}

Calendar.propTypes = {
    events: PropTypes.shape({
        isFetching: PropTypes.bool,
        error: PropTypes.object,
        list: PropTypes.instanceOf(immutable.List),
    }),
    event: PropTypes.shape({
        isFetching: PropTypes.bool,
        error: PropTypes.object,
        sessions: PropTypes.instanceOf(immutable.List),
    }),
    dispatch: PropTypes.func,
};

function mapStateToProps(state) {
    return {
        events: {
            isFetching: state.get('events').get('isFetching'),
            error: state.get('events').get('error'),
            list: state.get('events').get('events'),
        },
        event: {
            isFetching: state.get('event').get('isFetching'),
            error: state.get('event').get('error'),
            sessions: state.get('event').get('sessions'),
        },
    };
}

export default connect(mapStateToProps)(Calendar);
