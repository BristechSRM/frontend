import React, { Component, PropTypes } from 'react';
import SessionStatusService from '../../services/SessionStatusService';
import EditSaveControl from './EditSaveControl.jsx';
import RatingControl from './RatingControl.jsx';
import moment from 'moment';

import styles from './sessionSidebar.scss';

class SessionSidebar extends Component {

    getHandle(type) {
        const handle = this.props.speakerHandles
            ? this.props.speakerHandles.find(h => h.type.toLowerCase() === type.toLowerCase())
            : null;
        return handle ? handle.identifier : '';
    }

    getLastContactDate(lastContact) {
        if (!lastContact) {
            return 'Never';
        }

        const momentDate = moment(this.props.lastContact);
        return momentDate.isValid()
            ? momentDate.format('D MMMM YYYY [at] h:mma')
            : this.props.lastContact;
    }

    joinName(forename, surname) {
        const fn = forename ? `${forename} ` : '';
        const ln = surname || '';
        return `${fn} ${ln}`;
    }

    render() {
        const h1Style = {
            color: SessionStatusService.getStatusColor(this.props.status),
        };

        const lastContactDate = this.getLastContactDate(this.props.lastContact);

        return (
            <div className={styles.sessionSidebar}>
                <div className={styles.header}>
                    <h1 style={h1Style}>
                        {this.joinName(this.props.speakerForename, this.props.speakerSurname)}
                    </h1>
                    {this.props.title}
                </div>

                <div className={styles.section}>
                    <div className={styles.section}>
                        <h1>Abstract</h1>
                        <table>
                            <tbody>
                                <tr>{this.props.description}</tr>
                            </tbody>
                        </table>
                    </div>

                    <div className={styles.section}>
                        <h1>Biography</h1>
                        <table>
                            <tbody>
                                <tr>
                                    <td>
                                        <EditSaveControl
                                          changeEditMode={this.props.changeSpeakerBioEditMode}
                                          inEditMode={this.props.editStash.speakerBio.inEditMode}
                                        >
                                            {this.props.speakerBio}
                                        </EditSaveControl>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <h1>Status</h1>
                    <table>
                        <tbody>
                            <tr>
                                <td>Assigned Admin</td>
                                <td>
                                    {this.joinName(this.props.adminForename, this.props.adminSurname)}
                                </td>
                            </tr>
                            <tr>
                                <td>Credibility</td>
                                <td>
                                    <EditSaveControl
                                      changeEditMode={this.props.changeSpeakerRatingEditMode}
                                      onSaveClick={this.props.saveSpeakerRating}
                                      inEditMode={this.props.editStash.speakerRating.inEditMode}
                                    >
                                        <RatingControl
                                          rating={this.props.speakerRating}
                                          onRatingClick={this.props.changeSpeakerRatingStash}
                                          inEditMode
                                        />
                                    </EditSaveControl>
                                </td>
                            </tr>
                            <tr>
                                <td>Signup Method</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>Date Added</td>
                                <td>???</td>
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
    title: PropTypes.string,
    status: PropTypes.string,
    description: PropTypes.string,
    speakerId: PropTypes.string,
    speakerForename: PropTypes.string,
    speakerSurname: PropTypes.string,
    speakerRating: PropTypes.number,
    speakerHandles: PropTypes.array,
    speakerBio: PropTypes.string,
    adminForename: PropTypes.string,
    adminSurname: PropTypes.string,
    lastContact: PropTypes.object,
    editStash: PropTypes.object,
    changeSpeakerRatingStash: PropTypes.func,
    changeSpeakerRatingEditMode: PropTypes.func,
    saveSpeakerRating: PropTypes.func,
    changeSpeakerBioEditMode: PropTypes.func,
};

export default SessionSidebar;
