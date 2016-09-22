import React, { Component, PropTypes } from 'react';
import Radium from 'radium';

// A dummy 'EventCard' that serves as a card for displaying errors todo with the Meetup.com interactions
const styles = {
    base: {
        card: {
            backgroundColor: '#ccc',
            padding: '1rem',
            marginBottom: '0.5rem',
        },
        error: {
            margin: '0',
            fontSize: '0.9rem',
            color: '#861212',
        },
    },
};

class NewEventCard extends Component {

    render() {
        const cardBorderStyles = {
            borderLeft: '8px #861212 solid',
        };

        return (
            <div style={[styles.base.card, cardBorderStyles]}>
                <p style={styles.base.error}>Error with Meetup API:</p>
                <p style={styles.base.error}>{this.props.error.message}</p>
            </div>
        );
    }
}

NewEventCard.propTypes = {
    error: PropTypes.object,
};

export default Radium(NewEventCard);
