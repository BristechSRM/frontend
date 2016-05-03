import React, { Component, PropTypes } from 'react';
import SessionFilterCheckbox from './SessionFilterCheckbox.jsx';

class SessionFilter extends Component {

    getCheckbox(label, status) {
        return (
          <SessionFilterCheckbox
            key={status}
            isChecked={this.props.options.get(status) || false}
            label={label}
            status={status}
            onCheck={c => this.handleCheck(status, c)}
          />
        );
    }

    handleCheck(status, checked) {
        const newFilter = this.props.options.set(status, checked);
        this.props.onChange(newFilter);
    }

    render() {
        const statuses = [
            { status: 'unassigned', label: 'Unassigned' },
            { status: 'assigned', label: 'Assigned' },
            { status: 'in-progress', label: 'In progress' },
            { status: 'deferred', label: 'Deferred' },
            { status: 'topic-approved', label: 'Topic approved' },
            { status: 'date-assigned', label: 'Date assigned' },
        ];

        return (
            <div>
                {statuses.map(s => this.getCheckbox(s.label, s.status))}
            </div>
        );
    }
}

SessionFilter.propTypes = {
    options: PropTypes.object,
    onChange: PropTypes.func,
};

export default SessionFilter;
