import React, { Component, PropTypes } from 'react';
import immutable from 'immutable';
import Radium from 'radium';

const styles = {
    base: {
        '&.p': {
            color: '#c0c',
        },
    },
};

class EventCard extends Component {

    render() {
        return (
            <div style={styles.base} onClick={() => this.props.onSelected(this.props.id)}>
               <p>{this.props.date}</p>
               <p>{`${this.props.sessions.length} sessions`}</p>
            </div>
        );
    }
}

EventCard.propTypes = {
    id: PropTypes.string,
    date: PropTypes.string,
    sessions: PropTypes.array,
    onSelected: PropTypes.func,
};

export default Radium(EventCard);
