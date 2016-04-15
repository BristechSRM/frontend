import React, { Component, PropTypes } from 'react';
import Checkbox from 'material-ui/lib/checkbox';
import SessionStatusService from '../../../services/SessionStatusService';

import styles from './sessionFilterCheckbox.scss';

class SessionFilterCheckbox extends Component {

    render() {
        const rectStyle = {
            fill: SessionStatusService.getStatusColor(this.props.status),
        };

        return (
            <div
              className={styles.sessionFilterCheckbox}
              onClick={() => this.props.onCheck(!this.props.isChecked)}
            >
                <div className={styles.square}>
                    <svg><rect style={rectStyle} /></svg>
                </div>
                <div className={styles.label}>
                    {this.props.label}
                </div>
                <div>
                    <Checkbox
                      key={this.props.value}
                      checked={this.props.isChecked || false}
                      labelPosition="left"
                      disableTouchRipple
                    />
                </div>
            </div>
        );
    }
}

SessionFilterCheckbox.propTypes = {
    status: PropTypes.string,
    onCheck: PropTypes.func,
    isChecked: PropTypes.bool,
    label: PropTypes.string,
    value: PropTypes.string,
};

export default SessionFilterCheckbox;
