import React, { Component, PropTypes } from 'react';
import Radium from 'radium';
import moment from 'moment';
import LoremIpsum from 'lorem-ipsum';

const styles = {
    base: {
        card: {
            display: 'flex',
            backgroundColor: '#fff',
        },
        speaker: {
            flex: '0 0 auto',
        },
        session: {
            flex: '1 0 auto',
        },
        sessionSummary: {
            display: 'flex',
            flexWrap: 'no-wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
        },
        name: {
            flex: '1 1 auto',
        },
        date: {
            flex: '0 1 auto',
        },
    },
};

class EventSession extends Component {

    render() {
        const description = LoremIpsum({ count: 3, units: 'paragraphs' });
        return (
            <div style={styles.base.card}>
              <div style={styles.base.speaker}>
                <img src="/img/ben.png" />
              </div>
              <div style={styles.base.session}>
                <div style={styles.base.sessionSummary}>
                  <div style={styles.base.name}>
                     <p>Ben Byford</p>
                  </div>
                  <div style={styles.base.date}>
                     date
                  </div>
                </div>
              </div>
           </div>
        );
    }
}

EventSession.propTypes = {
    title: PropTypes.string,
    speakerImageUri: PropTypes.string,
};

export default Radium(EventSession);
