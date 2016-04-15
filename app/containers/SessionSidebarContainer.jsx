import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { getSpeaker, getAdmin } from '../actions';
import SessionSidebar from '../components/Session/SessionSidebar.jsx';

class SessionSidebarContainer extends Component {

    componentWillReceiveProps(nextProps) {
        if (this.props.session.speakerId !== nextProps.session.speakerId) {
            this.props.dispatch(getSpeaker(nextProps.session.speakerId));
        }
        if (this.props.session.adminId !== nextProps.session.adminId) {
            this.props.dispatch(getAdmin(nextProps.session.adminId));
        }
    }

    render() {
        return (
            <SessionSidebar
              session={this.props.session}
              speaker={this.props.speaker}
              admin={this.props.admin}
            />
        );
    }
}

SessionSidebarContainer.propTypes = {
    session: PropTypes.object,
    speaker: PropTypes.object,
    admin: PropTypes.object,
    dispatch: PropTypes.func,
};

function mapStateToProps(state) {
    return {
        session: state.get('session').get('session'),
        speaker: state.get('session').get('speaker'),
        admin: state.get('session').get('admin'),
        error: state.get('session').get('error'),
    };
}

export default connect(mapStateToProps)(SessionSidebarContainer);
