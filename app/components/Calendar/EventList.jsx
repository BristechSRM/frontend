import React, { Component, PropTypes } from 'react';
import immutable from 'immutable';
import Radium from 'radium';
import EventCard from './EventCard.jsx';

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
             date={event.date}
             sessions={event.sessions}
             onSelected={e => this.props.onEventSelected(e)}
           />
        );
    }

    render() {
        return (
            <div styles={styles.base}>
                { this.props.events.valueSeq().map(e => this.renderEvent(e)) }
            </div>
        );
    }
}

EventList.propTypes = {
    events: PropTypes.instanceOf(immutable.List),
    onEventSelected: PropTypes.func,
};

export default Radium(EventList);
