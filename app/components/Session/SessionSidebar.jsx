import React, { Component, PropTypes } from 'react';
import SessionStatusService from '../../services/SessionStatusService';
import StarRating from 'react-star-rating';

import styles from './sessionSidebar.scss';

class SessionSidebar extends Component {

    getName(profile) {
        return profile ? `${profile.forename || ''}  ${profile.surname || ''}` : null;
    }

    getHandle(type) {
        const handle = this.props.speaker.handles ? this.props.speaker.handles.find(h => h.type === type) : null;
        return handle ? handle.id : '';
    }

    render() {
        const h1Style = {
            color: SessionStatusService.getStatusColor(this.props.session.status),
        };

        return (
            <div className={styles.sessionSidebar}>
                <div className={styles.header}>
                    <h1 style={h1Style}>{this.getName(this.props.speaker)}</h1>
                    {this.props.session.title}
                </div>

                <div className={styles.section}>
                    <h1>Status</h1>
                    <table>
                        <tbody>
                            <tr>
                                <td>Assigned Admin</td>
                                <td>{this.getName(this.props.admin)}</td>
                            </tr>
                            <tr>
                                <td>Credibility</td>
                                <td>
                                  <StarRating
                                    name="session-rating"
                                    totalStars={5}
                                    rating={this.props.speaker.rating}
                                    disabled
                                    size={16}
                                  />
                                </td>
                            </tr>
                            <tr>
                                <td>Signup Method</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>Date Added</td>
                                <td>2 November 2015</td>
                            </tr>
                            <tr>
                                <td>Last Contact</td>
                                <td>2 January 2016 at 3:24pm</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div className={styles.section}>
                    <h1>Contact Details</h1>
                    <table>
                        <tbody>
                            <tr>
                                <td>Email</td>
                                <td>{this.getHandle('email')}</td>
                            </tr>
                            <tr>
                                <td>Phone Number</td>
                                <td>{this.getHandle('phone')}</td>
                            </tr>
                            <tr>
                                <td>Twitter</td>
                                <td>@{this.getHandle('twitter')}</td>
                            </tr>
                            <tr>
                                <td>Github</td>
                                <td>{this.getHandle('github')}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

SessionSidebar.propTypes = {
    session: PropTypes.object,
    speaker: PropTypes.object,
    admin: PropTypes.object,
};

export default SessionSidebar;