import React, { Component, PropTypes } from 'react';
import styles from './editNote.scss';

class EditNote extends Component {

    render() {
        return (
            <div className={styles.note}>
                <div className={styles.content}>
                    <table>
                        <tbody>
                          <tr>
                            <td>
                                <textarea
                                  onChange={(event) =>
                                  this.props.editNote(event.target.value)}
                                  defaultValue={this.props.note}
                                  rows={6}
                                  cols={60}
                                />
                            </td>
                            <td>
                                <button
                                  className="btn btn-default"
                                  type="button"
                                  onClick={() => this.props.saveNoteEdit()}
                                >
                                    Save
                                </button>

                            </td>
                            <td>
                                <button
                                  className="btn btn-default"
                                  type="button"
                                  onClick={() => this.props.cancelNoteEdit()}
                                >
                                    Cancel
                                </button>
                            </td>
                          </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

EditNote.propTypes = {
    note: PropTypes.string,
    editNote: PropTypes.func,
    saveNoteEdit: PropTypes.func,
    cancelNoteEdit: PropTypes.func,
};

export default EditNote;
