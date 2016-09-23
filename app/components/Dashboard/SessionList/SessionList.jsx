import React, { Component, PropTypes } from 'react';
import SessionCard from './SessionCard.jsx';
import NewSessionCard from './NewSessionCard.jsx';

const styles = {
    base: {
        list: {
            display: 'flex',
            flexWrap: 'wrap',
            alignContent: 'flex-start',
        },
        card: {
            flex: '1 0 260px',
            margin: '0.5rem',
            minWidth: '260px',
        },
    },
};

class SessionList extends Component {

    renderSession(session) {
        return (<div key={session.id} style={styles.base.card}>
           <SessionCard
             id={session.id}
             height="280px"
             onSelect={s => this.props.onSessionSelected(s)}
             title={session.title}
             status={session.status}
             date={session.date}
             speakerForename={session.speaker.forename}
             speakerSurname={session.speaker.surname}
             speakerRating={session.speaker.rating}
             adminForename={session.admin ? session.admin.forename : null}
             adminSurname={session.admin ? session.admin.surname : null}
             adminImageUri={session.admin ? session.admin.imageUri : null}
             lastContactDate={session.lastContact ? session.lastContact.date : null}
             lastContactDirection="in"
           />
         </div>);
    }

    /* Render a dummy card that the user can click to create a new session */
    renderNewSession() {
        return (<div key={"NewSessionCard"} style={styles.base.card}>
           <NewSessionCard
             id={"NewSession"}
             height="280px"
             onSelect={() => this.props.onNewSessionSelected()}
             title={"New Session"}
             status={"0"}  /* 0 will render similar to an 'unassigned' session. */
             date={ null }
             speakerForename={"Add New"}
             speakerSurname={"Session"}
             speakerRating={0}
             adminForename={"New"}
             adminSurname={"Admin"}
             adminImageUri={null}
             lastContactDate={null}
             lastContactDirection="in"
           />
         </div>);
    }

    render() {
        return (
            <div style={styles.base.list}>
                {this.renderNewSession()}
                {this.props.sessions.map(s => this.renderSession(s))}
            </div>
        );
    }
}

SessionList.propTypes = {
    sessions: PropTypes.array,
    onSessionSelected: PropTypes.func,
    onNewSessionSelected: PropTypes.func,
};

export default SessionList;
