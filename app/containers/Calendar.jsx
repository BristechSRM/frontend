import React, { Component, PropTypes } from 'react';
import EventList from '../components/Calendar/EventList.jsx';
import { connect } from 'react-redux';
import { getAllEvents, publishEvent } from '../actions';
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

    handleNewEventSelected() {
        this.context.router.push('/events/new');
    }

    handlePublishEvent(eventId) {
        this.props.dispatch(publishEvent(eventId));
    }

    render() {
        const result = this.props.error
             ? this.props.error.message
             : <EventList
               events={this.props.list}
               onEventPublishClick={eventId => this.handlePublishEvent(eventId)}
               onEventSelected={e => this.handleEventSelected(e)}
               onNewEventSelected={() => this.handleNewEventSelected()}
             />;

        return (
            <div className={styles.calendar}>
               <div className={styles.eventList}>
                  {this.props.isFetching ? <p>Loading...</p> : result}
               </div>
               {this.props.children}
            </div>
        );
    }
}

Calendar.propTypes = {
    isFetching: PropTypes.bool,
    error: PropTypes.object,
    list: PropTypes.object,
    children: PropTypes.object,
    dispatch: PropTypes.func,
};

Calendar.contextTypes = {
    router: PropTypes.object,
};

function mapStateToProps(state) {
    return {
        isFetching: state.events.isFetching,
        error: state.events.error,
        list: state.events.events,
    };
}

export default connect(mapStateToProps)(Calendar);
