import React, { Component, PropTypes } from 'react';
import EventList from '../components/Calendar/EventList.jsx';
import EventSession from '../components/Calendar/EventSession.jsx';
import immutable from 'immutable';
import { connect } from 'react-redux';
import { getAllEvents } from '../actions';
import styles from './calendar.scss';

class Calendar extends Component {

    componentDidMount() {
        this.props.dispatch(getAllEvents());
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.list !== nextProps.list) {
            if (nextProps.list.count() > 0) {
                this.context.router.push(`/calendar/${nextProps.list.get(0).id}`);
            }
        }
    }

    handleEventSelected(event) {
        this.context.router.push(`/calendar/${event.id}`);
    }

    renderEventSession(session) {
        return (
          <div key={session.id}>
            <EventSession
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
                  {this.props.isFetching ? <p>Loading...</p> :
                  <EventList
                    events={this.props.list}
                    onEventSelected={e => this.handleEventSelected(e)}
                  />}
               </div>
               {this.props.children}
            </div>
        );
    }
}

Calendar.propTypes = {
    isFetching: PropTypes.bool,
    error: PropTypes.object,
    list: PropTypes.instanceOf(immutable.List),
    children: PropTypes.object,
    dispatch: PropTypes.func,
};

Calendar.contextTypes = {
    router: PropTypes.object,
};

function mapStateToProps(state) {
    return {
        isFetching: state.get('events').get('isFetching'),
        error: state.get('events').get('error'),
        list: state.get('events').get('events'),
    };
}

export default connect(mapStateToProps)(Calendar);
