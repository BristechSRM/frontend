import React, { Component, PropTypes } from 'react';

const defaultHandle = { id: Number.MAX_VALUE, type: 'email', identifier: '' };

class EditContactDetails extends Component {

    // Note, generated fake ids for new handles will be replaced on server
    // Negative numbers are used because they cannot be accepted, (db won't allow negative ids)
    onAddOrUpdate(oldId, newType, newIdentifier) {
        let editedHandles = [];

        let found = false;
        let minId = Number.MAX_VALUE;
        for (const handle of this.props.stashedHandles) {
            minId = Math.min(minId, handle.id);
            if (handle.id === oldId) {
                found = true;
                editedHandles.push({ id: handle.id, type: newType, identifier: newIdentifier });
            } else {
                editedHandles.push(handle);
            }
        }
        if (!found) {
            window.test = minId;
            minId = minId > 0 ? -1 : minId - 1;
            editedHandles = [...editedHandles, { id: minId, type: newType, identifier: newIdentifier }];
        }
        this.props.onHandlesChange(editedHandles);
    }

    onDelete(oldId) {
        const editedHandles = this.props.stashedHandles.filter(handle => handle.id !== oldId);
        this.props.onHandlesChange(editedHandles);
    }

    useHandlesOrDefault(handles) {
        if (handles && handles.length > 0) {
            return handles;
        }
        return [defaultHandle];
    }

    typeOptions() {
        return ['email', 'twitter', 'phone', 'github'];
    }

    renderHandleEditRow(handle) {
        return (
            <tr key={handle.id} >
                <td>
                    <select
                      defaultValue={handle.type}
                      onChange={(event) => this.onAddOrUpdate(handle.id, event.target.value, handle.identifier)}
                    >
                        {
                            this.typeOptions().map(type =>
                                <option key={`type-${type}`} value={type}>
                                    {type}
                                </option>
                            )
                        }
                    </select>
                </td>
                <td>
                    <input
                      type="text"
                      onChange={(event) => this.onAddOrUpdate(handle.id, handle.type, event.target.value)}
                      defaultValue={handle.identifier}
                    />
                </td>
                <td>
                    <button
                      className="btn btn-default"
                      type="button"
                      onClick={() => this.onDelete(handle.id)}
                    >
                        Delete
                    </button>
                </td>
            </tr>
        );
    }
    render() {
        const handles = this.useHandlesOrDefault(this.props.stashedHandles);
        return (
            <div>
                <h1>Contact Details</h1>
                <table>
                    <tbody>
                        {handles.map(handle => this.renderHandleEditRow(handle))}
                    </tbody>
                </table>
                <div>
                    <button
                      className="btn btn-default"
                      type="button"
                      onClick={() => this.onAddOrUpdate(defaultHandle.id, defaultHandle.type, defaultHandle.identifier)}
                    >
                        Add
                    </button>
                </div>
            </div>
        );
    }
}

EditContactDetails.propTypes = {
    stashedHandles: PropTypes.array,
    onHandlesChange: PropTypes.func,
};

export default EditContactDetails;
