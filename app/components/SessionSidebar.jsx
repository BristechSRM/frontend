import React, { Component } from 'react';
import SessionStatusService from '../services/SessionStatusService';
import StarRating from 'react-star-rating';

import styles from './sessionSidebar.scss';

class SessionSidebar extends Component {

    render() {
        var h1Style = {
            "color": SessionStatusService.getStatusColor("deferred")
        };

        var getHandle = function(profile, type) {
            var handle = profile.handles.find(handle => handle.type === type);
            return handle ? handle.id : "";
        }

        return (
            <div className={styles.sessionSidebar}>
                <div className={styles.header}>
                    <h1 style={h1Style}>{this.props.speaker.name}</h1>
                    {this.props.session.title}
                </div>

                <div className={styles.section}>
                    <h1>Status</h1>
                    <table>
                        <tr>
                            <td>Assigned Admin</td>
                            <td>{this.props.admin.name}</td>
                        </tr>
                        <tr>
                            <td>Credibility</td>
                            <td><StarRating name="session-rating" totalStars={5} rating={this.props.speaker.rating} disabled={true} size={16} /></td>
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
                            <td>Last Contacted</td>
                            <td>2 January 2016 at 3:24pm</td>
                        </tr>
                    </table>
                </div>

                <div className={styles.section}>
                    <h1>Contact Details</h1>
                    <table>
                        <tr>
                            <td>Email</td>
                            <td>{getHandle(this.props.speaker, "email")}</td>
                        </tr>
                        <tr>
                            <td>Phone Number</td>
                            <td>{getHandle(this.props.speaker, "phone")}</td>
                        </tr>
                        <tr>
                            <td>Twitter</td>
                            <td>@{getHandle(this.props.speaker, "twitter")}</td>
                        </tr>
                        <tr>
                            <td>Github</td>
                            <td>{getHandle(this.props.speaker, "github")}</td>
                        </tr>
                    </table>
                </div>
            </div>
        );
    }
}

export default SessionSidebar;
