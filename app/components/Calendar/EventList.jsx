import React, { Component, PropTypes } from 'react';
import Radium from 'radium';
import EventCard from './EventCard.jsx';
import NewEventCard from './NewEventCard.jsx';
import MeetupPublishErrorCard from './MeetupPublishErrorCard.jsx';

const styles = {
    base: {
        display: 'flex',
        flexDirection: 'column',
        flexWrap: 'nowrap',
        alignItems: 'stretch',
    },
};

class EventList extends Component {

    constructor() {
        // TODO: temporary until event ids are unique
        super();
        this.key = 0;
    }

    renderEvent(event) {
        this.key++;
        return (
           <EventCard
             key={this.key}
             id={event.id}
             description={event.description}
             date={event.date}
             meetupEvent={event.meetupEvent}
             sessionIds={event.sessionIds}
             onSelected={e => this.props.onEventSelected(e)}
             onPublish={eventId => this.props.onEventPublishClick(eventId)}
             onMeetupDelete={meetupEventId => this.props.onMeetupDeleteClick(meetupEventId)}
             onMeetupUpdate={meetupEventId => this.props.onMeetupUpdateClick(meetupEventId)}
           />
        );
    }

    renderNewEventLink() {
        this.key++;
        return (
           <NewEventCard
             key="AddNewEvent"
             onSelected={() => this.props.onNewEventSelected()}
           />
        );
    }

    renderMeetupPublishError() {
        if (!this.props.meetupPublishError) {
            return (<div></div>);
        }
        return (<MeetupPublishErrorCard error={this.props.meetupPublishError} />);
    }

    render() {
        return (
            <div styles={styles.base}>
                { this.renderNewEventLink() }
                { this.renderMeetupPublishError() }
                { this.props.events.map(e => this.renderEvent(e)) }
            </div>
        );
    }
}

EventList.propTypes = {
    events: PropTypes.object,
    onEventPublishClick: PropTypes.func,
    onMeetupDeleteClick: PropTypes.func,
    onMeetupUpdateClick: PropTypes.func,
    onEventSelected: PropTypes.func,
    onNewEventSelected: PropTypes.func,
    meetupPublishError: PropTypes.object,
};

export default Radium(EventList);
