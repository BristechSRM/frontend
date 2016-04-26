import React, { Component, PropTypes } from 'react';
import Radium from 'radium';
import moment from 'moment';

const styles = {
    base: {
        card: {
            backgroundColor: '#fff',
            padding: '1rem',
            marginBottom: '0.5rem',
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

class EventSession extends Component {

    render() {
        return (
            <div style={styles.base.card}>
               <p>{this.props.title}</p>
            </div>
        );
    }
}

EventSession.propTypes = {
    title: PropTypes.string,
};

export default Radium(EventSession);
