import React, { Component, PropTypes } from 'react';
import Radium from 'radium';
import moment from 'moment';


// A dummy 'EventCard' that serves as a clickable 'add new event' link
const styles = {
    base: {
        card: {
            backgroundColor: '#ccc',
            padding: '1rem',
            marginBottom: '0.5rem',
            ':hover': {
                cursor: 'pointer',
            },
        },
        date: {
            margin: '0',
            fontSize: '1.3rem',
            color: '#fff',
        },
        sessions: {
            margin: '0',
            fontSize: '0.8rem',
            color: '#fff',
        },
    },
};

class NewEventCard extends Component {

    render() {
        const cardBorderStyles = {
            borderLeft: '8px #888888 solid',
        };

        return (
            <div
              style={[styles.base.card, cardBorderStyles]}
              onClick={() => this.props.onSelected()}
            >
               <p style={styles.base.date}>Create Event</p>
               <p style={styles.base.sessions}>{`${0} ${'sessions'}`}</p>
            </div>
        );
    }
}

NewEventCard.propTypes = {
    onSelected: PropTypes.func,
};

export default Radium(NewEventCard);
