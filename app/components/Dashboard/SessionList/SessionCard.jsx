import React, { Component, PropTypes } from 'react';
import Radium from 'radium';
import SessionStatusService from '../../../services/SessionStatusService';
import moment from 'moment';

const styles = {
    base: {
        card: {
            display: 'flex',
            flexDirection: 'column',
            ':hover': {
                cursor: 'pointer',
            },
        },
        speaker: {
            flex: '0 1 auto',
            display: 'flex',
            flexDirection: 'column',
            flexWrap: 'nowrap',
            alignItems: 'center',
            padding: '1rem',
            name: {
                flex: '0 1 auto',
                color: '#fff',
                fontSize: '1.6rem',
                textAlign: 'center',
            },
        },
        session: {
            flex: '1 1 auto',
            display: 'flex',
            flexDirection: 'column',
            padding: '1.4rem',
            backgroundColor: '#fff',
            details: {
                flex: '1 1 auto',
                title: {
                    fontSize: '1.1rem',
                    fontWeight: '300',
                    marginBottom: '0.7rem',
                },
                date: {
                    fontSize: '0.8rem',
                    fontWeight: '500',
                },
            },
        },
        footer: {
            flex: '0 0 50px',
            marginTop: 'auto',
            display: 'flex',
            alignItems: 'center',
            backgroundColor: '#fbfbfb',
            admin: {
                image: {
                    flex: '0 0 50px',
                    height: '50px',
                },
                details: {
                    flex: '1 1 auto',
                    marginLeft: '0.6rem',
                },
                name: {
                    margin: 0,
                },
            },
        },
    },
};

class SessionCard extends Component {

    isValidDate(date) {
        return ((new Date(date) !== 'Invalid Date' && !isNaN(new Date(date))));
    }

    joinName(forename, surname) {
        const fn = forename ? `${forename} ` : '';
        const ln = surname || '';
        return `${fn} ${ln}`;
    }

    render() {
        const sessionTitle = this.props.title
           ? this.props.title
           : '(title to be confirmed)';

        const sessionDate = this.props.date
           ? moment(this.props.date).format('DD MMMM YYYY')
           : null;

        const statusColor = SessionStatusService.getStatusColor(this.props.status);

        const sessionDateStyle = {
            color: statusColor,
        };

        const speakerStyle = {
            backgroundColor: statusColor,
        };

        const speakerName = this.joinName(this.props.speakerForename, this.props.speakerSurname);
        const adminName = this.joinName(this.props.adminForename, this.props.adminSurname);

        const adminImage = this.props.adminImageUri
            ? <img src={this.props.adminImageUri} width="50px" height="50px" />
            : null;

        return (
            <div
              style={[styles.base.card, { height: this.props.height, width: this.props.width }]}
              onClick={() => this.props.onSelect({ id: this.props.id })}
            >
                <div style={[styles.base.speaker, speakerStyle]}>
                    <div style={styles.base.speaker.name}>
                        {speakerName}
                    </div>
                </div>
                <div style={styles.base.session}>
                    <div style={styles.base.session.details}>
                        <div style={styles.base.session.details.title}>
                            {sessionTitle}
                        </div>
                        <div style={[styles.base.session.details.date, sessionDateStyle]}>
                            {sessionDate}
                        </div>
                    </div>
                    <div style={styles.base.footer}>
                        <div style={styles.base.footer.admin.image}>
                            {adminImage}
                        </div>
                        <div style={styles.base.footer.admin.details}>
                              <p style={styles.base.footer.admin.name}>{adminName}</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

SessionCard.propTypes = {
    id: PropTypes.string,
    height: PropTypes.string,
    width: PropTypes.string,
    onSelect: PropTypes.func,
    title: PropTypes.string,
    status: PropTypes.string,
    date: PropTypes.string,
    speakerForename: PropTypes.string,
    speakerSurname: PropTypes.string,
    adminForename: PropTypes.string,
    adminSurname: PropTypes.string,
    adminImageUri: PropTypes.string,
};

export default Radium(SessionCard);
