import React, { Component, PropTypes } from 'react';

class EditSaveControl extends Component {
    render() {
        return (
            <table>
                <tbody>
                    <tr>
                        <td>{this.props.children}</td>
                            <td>
                                <button
                                  className="btn btn-default"
                                  type="button"
                                >
                                  Edit
                                </button>
                            </td>
                            <td>
                                <button
                                  className="btn btn-default"
                                  type="button"
                                >
                                  Save
                                </button>
                            </td>
                            <td>
                                <button
                                  className="btn btn-default"
                                  type="button"
                                >
                                  Cancel
                                </button>
                            </td>
                    </tr>
                </tbody>
            </table>
        );
    }
}

EditSaveControl.propTypes = {
    children: PropTypes.element.isRequired,
};

export default EditSaveControl;
