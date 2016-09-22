import React, { Component, PropTypes } from 'react';
import Radium from 'radium';
import moment from 'moment';

const styles = {
    base: {
        card: {
            backgroundColor: '#fff',
            padding: '1rem',
            marginBottom: '0.5rem',
            ':hover': {
                cursor: 'pointer',
            },
        },
        description: {
            margin: '0',
            fontSize: '1.3rem',
        },
        date: {
            margin: '0',
            fontSize: '1.3rem',
            day: {
                color: '#c6c6c6',
            },
            year: {
                color: '#c6c6c6',
            },
        },
        sessions: {
            margin: '0',
            fontSize: '0.8rem',
        },
    },
};

class EventCard extends Component {
    renderPublishedDate(date) {
        if (!date) {
            return (
                <div>
                    <div>Published on:</div>
                </div>
            );
        }
        const pDate = moment(date);
        const dayMonthYear = pDate.format('D MMMM YYYY');
        const time = pDate.format('h:mma');
        return (
            <div>
                <div>Published on:</div>
                <div>{dayMonthYear}</div>
                <div>{`At ${time}`}</div>
            </div>
        );
    }

    renderMeetupEvent(meetupEvent) {
        if (!meetupEvent) {
            return (
                <div>
                    <button onClick={() => this.props.onPublish(this.props.id)}>
                        Publish to Meetup
                    </button>
                </div>
            );
        }
        return (
            <div>
                <button onClick={() => this.props.onMeetupDelete(meetupEvent.id)}>
                    Delete from Meetup
                </button>
                <button onClick={() => this.props.onMeetupUpdate(meetupEvent.id)}>
                    Update on Meetup
                </button>
                {this.renderPublishedDate(meetupEvent.publishedDate)}
                <a href={meetupEvent.meetupUrl}>
                    Link to Meetup Event
                </a>
            </div>
        );
    }

    render() {
        const sufficientSessions = this.props.sessionIds.length >= 2;
        const cardBorderStyles = {
            borderLeft: `8px ${sufficientSessions ? '#84a935' : '#f49939'} solid`,
        };

        const date = moment(this.props.date);
        const day = date.date();
        const month = date.format('MMMM');
        const year = date.year();

        const sessionLabel = this.props.sessionIds.length === 1 ? 'session' : 'sessions';

        return (
            <div
              style={[styles.base.card, cardBorderStyles]}
              onClick={() => this.props.onSelected({ id: this.props.id })}
            >
                <p style={styles.base.description}>{this.props.description}</p>
                {this.renderMeetupEvent(this.props.meetupEvent)}
                <p style={styles.base.date}>
                    <span style={styles.base.date.day}>{day}</span>&nbsp;
                    <span>{month}</span>&nbsp;
                    <span style={styles.base.date.year}>{year}</span>
                </p>
                <p style={styles.base.sessions}>{`${this.props.sessionIds.length} ${sessionLabel}`}</p>
            </div>
        );
    }
}

EventCard.propTypes = {
    id: PropTypes.string,
    description: PropTypes.string,
    date: PropTypes.string,
    meetupEvent: PropTypes.object,
    sessionIds: PropTypes.array,
    onSelected: PropTypes.func,
    onPublish: PropTypes.func,
    onMeetupDelete: PropTypes.func,
    onMeetupUpdate: PropTypes.func,
};

export default Radium(EventCard);
