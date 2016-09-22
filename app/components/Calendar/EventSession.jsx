import React, { Component, PropTypes } from 'react';
import Radium from 'radium';

const styles = {
    base: {
        card: {
            display: 'flex',
            backgroundColor: '#fff',
            padding: '1rem',
        },
        speaker: {
            flex: '1 0 0',
            fontSize: '0.7rem',
        },
        speakerImage: {
            maxWidth: '150px',
        },
        session: {
            flex: '2 0 0',
            padding: '0 1rem',
        },
        sessionSummary: {
            display: 'flex',
            flexWrap: 'no-wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
        },
        name: {
            flex: '1 1 auto',
            fontSize: '1.1rem',
            fontWeight: 'bold',
        },
        moment: {
            flex: '0 1 auto',
        },
        date: {
            margin: '0 0 0.3rem 0',
            fontSize: '0.8rem',
        },
        time: {
            margin: 0,
            fontSize: '0.6rem',
            textAlign: 'right',
        },
        title: {
            margin: 0,
            fontSize: '1.2rem',
            color: '#f49939',
        },
        titlelink: {
            color: '#f49939',
        },
    },
};

class EventSession extends Component {

    convertToHtml(plaintext) {
        return !plaintext ? '' : plaintext.split('\n').map(para => `<p>${para}</p>`).join('');
    }

    handleSessionClicked(sessionId) {
        this.context.router.push(`/sessions/${sessionId}`);
    }

    render() {
        const bio = this.convertToHtml(this.props.speakerBio);
        const description = this.convertToHtml(this.props.description);

        return (
            <div style={styles.base.card}>
              <div style={styles.base.speaker}>
                <img style={styles.base.speakerImage} src={this.props.speakerImageUri} />
                <div dangerouslySetInnerHTML={{ __html: bio }}>
                </div>
              </div>
              <div style={styles.base.session}>
                <div style={styles.base.sessionSummary}>
                  <div style={styles.base.name}>
                     <p>{`${this.props.speakerForename} ${this.props.speakerSurname}`}</p>
                  </div>
                </div>
                <h2 style={styles.base.title}>
                  <a style={styles.base.titlelink} onClick={() => this.handleSessionClicked(this.props.id)} href="">
                    {this.props.title}
                  </a>
                </h2>
                <div dangerouslySetInnerHTML={{ __html: description }}>
                </div>
              </div>
           </div>
        );
    }
}

EventSession.propTypes = {
    id: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    speakerForename: PropTypes.string,
    speakerSurname: PropTypes.string,
    speakerImageUri: PropTypes.string,
    speakerBio: PropTypes.string,
};

EventSession.contextTypes = {
    router: PropTypes.object,
};

export default Radium(EventSession);
