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
                                      onClick={() => this.props.changeEditMode(true)}
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
                                      onClick={() => this.props.onSaveClick()}
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
                                      onClick={() => this.props.changeEditMode(false)}
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
    changeEditMode: PropTypes.func,
    onSaveClick: PropTypes.func,
    inEditMode: PropTypes.bool,
};

export default EditSaveControl;
