import React, { Component, PropTypes } from 'react';
import styles from './newNote.scss';

class NewNote extends Component {

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
                                  this.props.changeNewNote(event.target.value)}
                                  value={this.props.newNote}
                                  placeholder="Click to enter new note"
                                  className={!this.props.isEditingNewNote ? styles.cleanedTextArea : null}
                                  rows={6}
                                  cols={60}
                                />
                            </td>
                            <td>
                                { this.props.isEditingNewNote ?
                                    <button
                                      className="btn btn-default"
                                      type="button"
                                      onClick={() => this.props.saveNewNote()}
                                    >
                                      Save
                                    </button>
                                    : null
                                }
                            </td>
                            <td>
                                { this.props.isEditingNewNote ?
                                    <button
                                      className="btn btn-default"
                                      type="button"
                                      onClick={() => this.props.clearNewNote()}
                                    >
                                      Cancel
                                    </button>
                                    : null
                                }
                            </td>
                          </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

NewNote.propTypes = {
    newNote: PropTypes.string,
    changeNewNote: PropTypes.func.isRequired,
    isEditingNewNote: PropTypes.bool.isRequired,
    saveNewNote: PropTypes.func.isRequired,
    clearNewNote: PropTypes.func.isRequired,
};

export default NewNote;
