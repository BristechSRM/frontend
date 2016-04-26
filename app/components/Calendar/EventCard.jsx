import React, { Component, PropTypes } from 'react';
import immutable from 'immutable';
import Radium from 'radium';
import moment from 'moment';

const styles = {
    base: {
        card: {
            backgroundColor: '#fff',
            padding: '0.5rem',
            marginBottom: '0.5rem',
        },
        date: {
            margin: '0.5rem 0',
            day: {
                color: '#c6c6c6',
            },
            year: {
                color: '#c6c6c6',
            },
        },
        sessions: {
            margin: '0',
        },
    },
};

class EventCard extends Component {

    render() {
        const sufficientSessions = this.props.sessions.length >= 2;
        const cardBorderStyles = {
            borderLeft: `8px ${sufficientSessions ? '#84a935' : '#f49939'} solid`,
        };

        const date = moment(this.props.date);
        const day = date.date();
        const month = date.format('MMMM');
        const year = date.year();

        return (
            <div style={[styles.base.card, cardBorderStyles]} onClick={() => this.props.onSelected(this.props.id)}>
               <p style={styles.base.date}>
                 <span style={styles.base.date.day}>{day}</span>&nbsp;
                 <span>{month}</span>&nbsp;
                 <span style={styles.base.date.year}>{year}</span>
               </p>
               <p style={styles.base.sessions}>{`${this.props.sessions.length} sessions`}</p>
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
