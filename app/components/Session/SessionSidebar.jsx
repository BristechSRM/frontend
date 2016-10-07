import React, { Component, PropTypes } from 'react';
import SessionStatusService from '../../services/SessionStatusService';
import EditSaveControl from './EditSaveControl.jsx';
import ContactDetails from './ContactDetails.jsx';
import EditContactDetails from './EditContactDetails.jsx';
import moment from 'moment';

import styles from './sessionSidebar.scss';

class SessionSidebar extends Component {

    getHandle(type) {
        const firstHandle = this.props.speakerHandles
            ? this.props.speakerHandles.find(h => h.type.toLowerCase() === type.toLowerCase())
            : null;
        return firstHandle ? firstHandle.identifier : '';
    }

    getEventDisplayString(event) {
        const date = this.formatDate(event.date, 'Unspecified Date');
        const eventName = event.description ? event.description : 'Unnamed Event';
        return `${eventName} on ${date}`;
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

    handleSessionEventClicked(event) {
        this.context.router.push(`/calendar/${event.id}`);
    }

    joinName(forename, surname) {
        const fn = forename ? `${forename} ` : '';
        const ln = surname || '';
        return `${fn} ${ln}`;
    }

    eventsSelection() {
        if (this.props.isFetchingEvents) {
            return <select><option>Loading events...</option></select>;
        }
        return (
                <select
                  id="event"
                  name="event"
                  defaultValue={this.props.event ? this.props.event.id : null}
                  onChange={(event) => this.props.changeEditStash('session', 'eventId', event.target.value)}
                >
                    <option value=""></option>
                    {
                        this.props.allEvents.map(event =>
                            <option key={`event-${event.id}`} value={event.id}>
                                {this.getEventDisplayString(event)}
                            </option>
                        )
                    }
                </select>
        );
    }

    eventDisplay() {
        return (
            this.props.event ?
                <a onClick={() => this.handleSessionEventClicked(this.props.event)} href="">
                    {this.getEventDisplayString(this.props.event)}
                </a>
            :
                <div></div>
        );
    }

    render() {
        const h1Style = {
            color: SessionStatusService.getStatusColor(this.props.status),
        };

        return (
            <div className={styles.sessionSidebar}>
                <div className={styles.header}>
                    <h1 style={h1Style}>
                        {
                            // Note: speaker.forename edit mode is being used as flag for surname edit mode as well, since it makes sense to edit them together.
                            !this.props.editStash.speaker.forename.inEditMode ?
                                <div
                                  className={styles.editable}
                                  onClick={() => this.props.changeEditMode('speaker', 'forename', true)}
                                >
                                    {this.joinName(this.props.speakerForename, this.props.speakerSurname)}
                                </div>
                            :
                                <EditSaveControl
                                  changeEditMode={(inEditMode) => this.props.changeEditMode(
                                      'speaker', 'forename', inEditMode)}
                                  onSaveClick={this.props.saveSpeakerNames}
                                  inEditMode={this.props.editStash.speaker.forename.inEditMode}
                                >
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
                                </EditSaveControl>
                        }
                    </h1>
                    {
                        !this.props.editStash.session.title.inEditMode ?
                            <div
                              className={styles.editable}
                              onClick={() => this.props.changeEditMode('session', 'title', true)}
                            >
                                {this.props.title}
                            </div>
                        :
                            <EditSaveControl
                              changeEditMode={(inEditMode) => this.props.changeEditMode('session', 'title', inEditMode)}
                              onSaveClick={this.props.saveSessionTitle}
                              inEditMode={this.props.editStash.session.title.inEditMode}
                            >
                                        <textarea
                                          onChange={(event) => this.props.changeEditStash(
                                            'session', 'title', event.target.value)}
                                          defaultValue={this.props.title}
                                        />
                            </EditSaveControl>
                    }

                </div>

                <div className={styles.section}>
                    <div className={styles.section}>
                        <h1>Abstract</h1>
                        {
                            !this.props.editStash.session.description.inEditMode ?
                                <div
                                  className={styles.editable}
                                  onClick={() => this.props.changeEditMode(
                                        'session', 'description', true)}
                                >
                                    {this.props.description}
                                </div>
                            :
                                <EditSaveControl
                                  changeEditMode={(inEditMode) =>
                                        this.props.changeEditMode('session', 'description', inEditMode)}
                                  onSaveClick={this.props.saveSessionDescription}
                                  inEditMode={this.props.editStash.session.description.inEditMode}
                                >
                                            <textarea
                                              onChange={(event) =>
                                                    this.props.changeEditStash(
                                                        'session', 'description', event.target.value)}
                                              defaultValue={this.props.description}
                                              rows={8}
                                              cols={35}
                                            />
                                </EditSaveControl>
                        }
                    </div>

                    <div className={styles.section}>
                        <h1>Biography</h1>
                        {
                            !this.props.editStash.speaker.bio.inEditMode ?
                                <div
                                  className={styles.editable}
                                  onClick={() => this.props.changeEditMode('speaker', 'bio', true)}
                                >
                                    {this.props.speakerBio}
                                </div>
                            :
                                <EditSaveControl
                                  changeEditMode={(inEditMode) =>
                                    this.props.changeEditMode('speaker', 'bio', inEditMode)}
                                  onSaveClick={this.props.saveSpeakerBio}
                                  inEditMode={this.props.editStash.speaker.bio.inEditMode}
                                >
                                    <textarea
                                      onChange={(event) =>
                                        this.props.changeEditStash(
                                            'speaker', 'bio', event.target.value)}
                                      defaultValue={this.props.speakerBio}
                                      rows={8}
                                      cols={35}
                                    />
                                </EditSaveControl>
                        }
                    </div>

                    <div className={styles.section}>
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
                                    <td>Assigned Event</td>
                                    <td>
                                        {
                                            !this.props.editStash.session.eventId.inEditMode ?
                                                <div
                                                  className={styles.editable}
                                                  onClick={() => this.props.changeEditMode('session', 'eventId', true)}
                                                >
                                                    {this.eventDisplay()}
                                                </div>
                                            :
                                                <EditSaveControl
                                                  changeEditMode={(inEditMode) =>
                                                    this.props.changeEditMode('session', 'eventId', inEditMode)}
                                                  onSaveClick={this.props.saveSessionEventId}
                                                  inEditMode={this.props.editStash.session.eventId.inEditMode}
                                                >
                                                    {this.eventsSelection()}
                                                </EditSaveControl>
                                        }
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className={styles.section}>
                    {
                        !this.props.editStash.speaker.handles.inEditMode ?
                            <div
                              className={styles.editable}
                              onClick={() => this.props.changeEditStash(
                                      'speaker', 'handles', this.props.speakerHandles, true)}
                            >
                                <ContactDetails
                                  handles={this.props.speakerHandles}
                                />
                            </div>
                        :
                            <EditSaveControl
                              changeEditMode={(inEditMode) =>
                                this.props.changeEditMode('speaker', 'handles', inEditMode)}
                              onSaveClick={this.props.saveSpeakerHandles}
                              inEditMode={this.props.editStash.speaker.handles.inEditMode}
                            >
                                <EditContactDetails
                                  stashedHandles={this.props.editStash.speaker.handles.value}
                                  onHandlesChange={(newHandles) => this.props.changeEditStash(
                                      'speaker', 'handles', newHandles)}
                                />
                            </EditSaveControl>
                    }
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
    speakerId: PropTypes.string,
    speakerForename: PropTypes.string,
    speakerSurname: PropTypes.string,
    speakerHandles: PropTypes.array,
    speakerBio: PropTypes.string,
    adminForename: PropTypes.string,
    adminSurname: PropTypes.string,
    event: PropTypes.object,
    allEvents: PropTypes.object,
    isFetchingEvents: PropTypes.bool,
    editStash: PropTypes.object,
    changeEditMode: PropTypes.func,
    changeEditStash: PropTypes.func,
    saveSpeakerBio: PropTypes.func,
    saveSpeakerHandles: PropTypes.func,
    saveSessionDescription: PropTypes.func,
    saveSessionTitle: PropTypes.func,
    saveSessionEventId: PropTypes.func,
    saveSpeakerNames: PropTypes.func,
};

SessionSidebar.contextTypes = {
    router: PropTypes.object,
};

export default SessionSidebar;
