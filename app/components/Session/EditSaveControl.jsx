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
    children: React.PropTypes.oneOfType([PropTypes.element, PropTypes.string]).isRequired,
    changeEditMode: PropTypes.func.isRequired,
    onSaveClick: PropTypes.func.isRequired,
    inEditMode: PropTypes.bool.isRequired,
};

export default EditSaveControl;
