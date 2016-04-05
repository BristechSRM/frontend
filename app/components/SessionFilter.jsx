import React, { Component, PropTypes } from 'react';
import immutable from 'immutable';
import SessionFilterCheckbox from './SessionFilterCheckbox.jsx';

class SessionFilter extends Component {

    handleCheck(status, checked) {
        var newFilter = this.props.options.set(status, checked);
        this.props.onChange(newFilter);
    }

    render() {
        return (
            <div>
                <SessionFilterCheckbox
                    isChecked={this.props.options.get('1') || false}
                    label='Assigned'
                    status='assigned'
                    onCheck={c => this.handleCheck('1', c)} />
                <SessionFilterCheckbox
                    isChecked={this.props.options.get('2') || false}
                    label='In progress'
                    status='in-progress'
                    onCheck={c => this.handleCheck('2', c)} />
                <SessionFilterCheckbox
                    isChecked={this.props.options.get('3') || false}
                    label='Deferred'
                    status='deferred'
                    onCheck={c => this.handleCheck('3', c)} />
                <SessionFilterCheckbox
                    isChecked={this.props.options.get('4') || false}
                    label='Topic approved'
                    status='topic-approved'
                    onCheck={c => this.handleCheck('4', c)} />
                <SessionFilterCheckbox
                    isChecked={this.props.options.get('5') || false}
                    label='Date assigned'
                    status='date-assigned'
                    onCheck={c => this.handleCheck('5', c)} />
            </div>
        )
    }
}

export default SessionFilter;
