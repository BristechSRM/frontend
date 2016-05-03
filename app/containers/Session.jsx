import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import SessionSidebar from '../components/Session/SessionSidebar.jsx';
import SessionCorrespondence from '../components/Session/SessionCorrespondence.jsx';
import { getSession, getSpeaker, getAdmin, getCorrespondence } from '../actions';
import styles from './session.scss';

class Session extends Component {

    componentDidMount() {
        const sessionId = this.props.params.sessionId;
        this.props.dispatch(getSession(sessionId));
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.session.speakerId !== nextProps.session.speakerId) {
            this.props.dispatch(getSpeaker(nextProps.session.speakerId));
        }
        if (this.props.session.adminId !== nextProps.session.adminId) {
            this.props.dispatch(getAdmin(nextProps.session.adminId));
        }
        if (this.props.session.threadId !== nextProps.session.threadId) {
            this.props.dispatch(getCorrespondence(nextProps.session.threadId));
        }
    }

    render() {
        return (
            <div className={styles.session}>
                <div className={styles.sidebar}>
                    <SessionSidebar
                      session={this.props.session}
                      speaker={this.props.speaker}
                      admin={this.props.admin}
                      lastContact={this.props.lastContact}
                    />
                </div>
                <div className={styles.correspondence}>
                    <SessionCorrespondence correspondence={this.props.correspondence} />
                </div>
            </div>
        );
    }
}

Session.propTypes = {
    params: PropTypes.object,
    session: PropTypes.object,
    speaker: PropTypes.object,
    admin: PropTypes.object,
    lastContact: PropTypes.object,
    correspondence: PropTypes.array,
    isFetching: PropTypes.bool,
    error: PropTypes.shape({ message: PropTypes.string }),
    dispatch: PropTypes.func,
};

function mapStateToProps(state) {
    return {
        isFetching: state.session.isFetching,
        correspondence: state.session.correspondence,
        session: state.session.session,
        speaker: state.session.speaker,
        admin: state.session.admin,
        lastContact: state.session.lastContact,
        error: state.session.error,
    };
}

export default connect(mapStateToProps)(Session);
