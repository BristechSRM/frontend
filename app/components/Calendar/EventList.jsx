import React, { Component, PropTypes } from 'react';
import Radium from 'radium';
import EventCard from './EventCard.jsx';
import NewEventCard from './NewEventCard.jsx';

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
             sessionIds={event.sessionIds}
             onSelected={e => this.props.onEventSelected(e)}
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

    render() {
        return (
            <div styles={styles.base}>
                { this.renderNewEventLink() }
                { this.props.events.map(e => this.renderEvent(e)) }
            </div>
        );
    }
}

EventList.propTypes = {
    events: PropTypes.object,
    onEventSelected: PropTypes.func,
    onNewEventSelected: PropTypes.func,
};

export default Radium(EventList);
