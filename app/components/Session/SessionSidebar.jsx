import React, { Component, PropTypes } from 'react';
import SessionStatusService from '../../services/SessionStatusService';
import StarRating from 'react-star-rating';
import moment from 'moment';

import styles from './sessionSidebar.scss';

class SessionSidebar extends Component {

    getHandle(type) {
        if (!this.props.speaker) {
            return '';
        }

        const handle = this.props.speaker.handles
            ? this.props.speaker.handles.find(h => h.type.toLowerCase() === type.toLowerCase())
            : null;
        return handle ? handle.identifier : '';
    }

    getRating(profile) {
        return profile ? profile.rating : 0;
    }

    joinName(forename, surname) {
        const fn = forename ? `${forename} ` : '';
        const ln = surname || '';
        return `${fn} ${ln}`;
    }

    render() {
        const h1Style = {
            color: SessionStatusService.getStatusColor(this.props.session.status),
        };

        const momentDate = moment(this.props.lastContact);
        const lastContactDate = momentDate.isValid()
            ? momentDate.format('D MMMM YYYY [at] h:mma')
            : this.props.lastContact;

        return (
            <div className={styles.sessionSidebar}>
                <div className={styles.header}>
                    <h1 style={h1Style}>
                        {this.joinName(this.props.session.speakerForename, this.props.session.speakerSurname)}
                    </h1>
                    {this.props.session.title}
                </div>

                <div className={styles.section}>
                    <h1>Status</h1>
                    <table>
                        <tbody>
                            <tr>
                                <td>Assigned Admin</td>
                                <td>
                                    {this.joinName(this.props.session.adminForename, this.props.session.adminSurname)}
                                </td>
                            </tr>
                            <tr>
                                <td>Credibility</td>
                                <td>
                                  <StarRating
                                    name="session-rating"
                                    totalStars={5}
                                    rating={this.getRating(this.props.speaker)}
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
                                <td>{this.props.session.dateAdded}</td>
                            </tr>
                            <tr>
                                <td>Last Contact</td>
                                <td>{lastContactDate}</td>
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
    lastContact: PropTypes.object,
};

export default SessionSidebar;
