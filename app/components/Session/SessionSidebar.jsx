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

    formatDate(date, missingDateMessage) {
        if (!date) {
            return missingDateMessage;
        }

        const momentDate = moment(date);
        return momentDate.isValid()
            ? momentDate.format('D MMMM YYYY [at] h:mma')
            : date;
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

        const lastContactDate = this.formatDate(this.props.lastContact, 'Never');
        const assignedDate = this.formatDate(this.props.date, 'Not assigned');
        const dateAdded = this.formatDate(this.props.dateAdded, '');

        return (
            <div className={styles.sessionSidebar}>
                <div className={styles.header}>
                    <h1 style={h1Style}>
                        <EditSaveControl
                          changeEditMode={(inEditMode) => this.props.changeEditMode('speaker', 'forename', inEditMode)}
                          inEditMode={this.props.editStash.speaker.forename.inEditMode}
                        >
                            {
                                // Note: speaker.forename edit mode is being used as flag for surname edit mode as well, since it makes sense to edit them together.
                                this.props.editStash.speaker.forename.inEditMode ?
                                    <div>
                                        <input
                                          type="text"
                                          className={styles.editInputBox}
                                          onChange={(event) => this.props.changeEditStash(
                                              'speaker', 'forename', event.target.value)}
                                          defaultValue={this.props.speakerForename}
                                        />
                                        <input
                                          type="text"
                                          className={styles.editInputBox}
                                          onChange={(event) => this.props.changeEditStash(
                                              'speaker', 'surname', event.target.value)}
                                          defaultValue={this.props.speakerSurname}
                                        />
                                    </div>
                                :
                                    <div>{this.joinName(this.props.speakerForename, this.props.speakerSurname)}</div>
                            }
                        </EditSaveControl>
                    </h1>
                    <EditSaveControl
                      changeEditMode={(inEditMode) => this.props.changeEditMode('session', 'title', inEditMode)}
                      onSaveClick={this.props.saveSessionTitle}
                      inEditMode={this.props.editStash.session.title.inEditMode}
                    >
                        {
                            this.props.editStash.session.title.inEditMode ?
                                <textarea
                                  onChange={(event) => this.props.changeEditStash(
                                      'session', 'title', event.target.value)}
                                  defaultValue={this.props.title}
                                />
                            :
                                <div>{this.props.title}</div>
                        }
                    </EditSaveControl>
                </div>

                <div className={styles.section}>
                    <div className={styles.section}>
                        <h1>Abstract</h1>
                        <table>
                            <tbody>
                                <tr>
                                    <td>
                                        <EditSaveControl
                                          changeEditMode={(inEditMode) =>
                                              this.props.changeEditMode('session', 'description', inEditMode)}
                                          onSaveClick={this.props.saveSessionDescription}
                                          inEditMode={this.props.editStash.session.description.inEditMode}
                                        >
                                            {
                                                this.props.editStash.session.description.inEditMode ?
                                                    <textarea
                                                      onChange={(event) =>
                                                          this.props.changeEditStash(
                                                              'session', 'description', event.target.value)}
                                                      defaultValue={this.props.description}
                                                    />
                                                :
                                                    <div>{this.props.description}</div>
                                            }
                                        </EditSaveControl>
                                    </td>
                                </tr>
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
                                          changeEditMode={(inEditMode) =>
                                              this.props.changeEditMode('speaker', 'bio', inEditMode)}
                                          onSaveClick={this.props.saveSpeakerBio}
                                          inEditMode={this.props.editStash.speaker.bio.inEditMode}
                                        >
                                            {
                                                this.props.editStash.speaker.bio.inEditMode ?
                                                    <textarea
                                                      onChange={(event) =>
                                                        this.props.changeEditStash(
                                                            'speaker', 'bio', event.target.value)}
                                                      defaultValue={this.props.speakerBio}
                                                    />
                                                :
                                                    <div>{this.props.speakerBio}</div>
                                            }
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
                                <td>Assigned Event Date</td>
                                <td>{assignedDate}</td>
                            </tr>
                            <tr>
                                <td>Credibility</td>
                                <td>
                                    <EditSaveControl
                                      changeEditMode={(inEditMode) =>
                                          this.props.changeEditMode('speaker', 'rating', inEditMode)}
                                      onSaveClick={this.props.saveSpeakerRating}
                                      inEditMode={this.props.editStash.speaker.rating.inEditMode}
                                    >
                                        <RatingControl
                                          rating={this.props.speakerRating}
                                          onRatingClick={(rating) =>
                                              this.props.changeEditStash('speaker', 'rating', rating)}
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
                                <td>{dateAdded}</td>
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
    date: PropTypes.string,
    dateAdded: PropTypes.string,
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
    changeEditMode: PropTypes.func,
    changeEditStash: PropTypes.func,
    saveSpeakerRating: PropTypes.func,
    saveSpeakerBio: PropTypes.func,
    saveSessionDescription: PropTypes.func,
    saveSessionTitle: PropTypes.func,
};

export default SessionSidebar;
