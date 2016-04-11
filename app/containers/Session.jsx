import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import SessionSidebar from '../components/SessionSidebar.jsx';
import SessionCorrespondence from '../components/SessionCorrespondence.jsx';
import { getSession } from '../actions';
import styles from './session.scss';

class Session extends Component {

    componentDidMount() {
        const sessionId = this.props.params.sessionId;
        this.props.dispatch(getSession(sessionId));
    }

    render() {
        const speaker = {
            id: 2,
            name: 'David Wybourn',
            handles: [
                {
                    type: 'email',
                    id: 'test2@email.com',
                },
                {
                    type: 'twitter',
                    id: 'dwybourn',
                },
                {
                    type: 'phone',
                    id: '01234567890',
                },
            ],
            rating: 4,
        };

        const admin = {
            id: 1,
            name: 'Chris Smith',
        };

        const correspondence = [
            {
                fromProfileId: 1,
                toProfileId: 2,
                type: 'email',
                fromHandleId: 'test1@email.com',
                toHandleId: 'test2@email.com',
                date: '2016-02-06T15:16:54Z',
                message: 'Hi David\n\nWould you like to do one on docker and concourse?\nThanks\nChris',
            },
            {
                fromProfileId: 1,
                toProfileId: 2,
                type: 'email',
                fromHandleId: 'test1@email.com',
                toHandleId: 'test2@email.com',
                date: '2016-02-08T14:30:00Z',
                message: "That shouldn't be an issue. I hear that you can master both topics in a matter of hours.",
            },
            {
                fromProfileId: 2,
                toProfileId: 1,
                type: 'email',
                fromHandleId: 'test2@email.com',
                toHandleId: 'test1@email.com',
                date: '2016-02-07T09:45:21Z',
                message: "Hi Chris\n\nI've never used docker or concourse though, won't that be an issue?\n\nDavid",
            },
        ];
        return (
            <div className={styles.session}>
                <div className={styles.sidebar}>
                    <SessionSidebar session={this.props.session} speaker={speaker} admin={admin} />
                </div>
                <div className={styles.correspondence}>
                    <SessionCorrespondence correspondence={correspondence} />
                </div>
            </div>
        );
    }
}

Session.propTypes = {
    params: PropTypes.object,
    session: PropTypes.object,
    isFetching: PropTypes.bool,
    error: PropTypes.shape({ message: PropTypes.string }),
    dispatch: PropTypes.func,
};

function mapStateToProps(state) {
    return {
        isFetching: state.get('sessions').get('isFetching'),
        session: state.get('session').get('session'),
        error: state.get('session').get('error'),
    };
}

export default connect(mapStateToProps)(Session);
