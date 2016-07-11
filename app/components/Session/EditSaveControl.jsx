import React, { Component, PropTypes } from 'react';

class EditSaveControl extends Component {
    render() {
        return (
            <table>
                <tbody>
                    <tr>
                        <td>{this.props.children}</td>
                            <td>
                                { !this.props.inEditMode ?
                                    <button
                                      className="btn btn-default"
                                      type="button"
                                    >
                                      Edit
                                    </button>
                                    : null
                                }
                            </td>
                            <td>
                                { this.props.inEditMode ?
                                    <button
                                      className="btn btn-default"
                                      type="button"
                                    >
                                      Save
                                    </button>
                                    : null
                                }
                            </td>
                            <td>
                                { this.props.inEditMode ?
                                    <button
                                      className="btn btn-default"
                                      type="button"
                                    >
                                      Cancel
                                    </button>
                                    : null
                                }
                            </td>
                    </tr>
                </tbody>
            </table>
        );
    }
}

EditSaveControl.propTypes = {
    children: PropTypes.element.isRequired,
    inEditMode: PropTypes.bool,
};

export default EditSaveControl;
