import React, { Component, PropTypes } from 'react';
import Radium from 'radium';

// React component to provide a dummy 'card' that can be clicked to create a new session.

// TODO: The styles and layout here are copied from SessionCard.
// It may be possible to factor out the common style and layout somewhat.

const styles = {
    base: {
        card: {
            display: 'flex',
            flexDirection: 'column',
            ':hover': {
                cursor: 'pointer',
            },
        },
        speaker: {
            flex: '0 1 auto',
            display: 'flex',
            flexDirection: 'column',
            flexWrap: 'nowrap',
            alignItems: 'center',
            padding: '1rem',
            name: {
                flex: '0 1 auto',
                color: '#fff',
                fontSize: '1.6rem',
                textAlign: 'center',
            },
        },
        session: {
            flex: '1 1 auto',
            display: 'flex',
            flexDirection: 'column',
            padding: '1.4rem',
            backgroundColor: '#fff',
            details: {
                flex: '1 1 auto',
                title: {
                    fontSize: '1.1rem',
                    fontWeight: '300',
                    marginBottom: '0.7rem',
                },
                date: {
                    fontSize: '0.8rem',
                    fontWeight: '500',
                },
            },
        },
        footer: {
            flex: '0 0 50px',
            marginTop: 'auto',
            display: 'flex',
            alignItems: 'center',
            backgroundColor: '#fbfbfb',
            admin: {
                image: {
                    flex: '0 0 50px',
                    height: '50px',
                },
                details: {
                    flex: '1 1 auto',
                    marginLeft: '0.6rem',
                },
                name: {
                    margin: 0,
                },
            },
        },
    },
};

/*
* A card for display in the SessionList that represents the user's opportunity
* to add a new session. It's most sensibly inserted at the start or end of the list.
*/
class NewSessionCard extends Component {

    isValidDate(date) {
        return ((new Date(date) !== 'Invalid Date' && !isNaN(new Date(date))));
    }

    joinName(forename, surname) {
        const fn = forename ? `${forename} ` : '';
        const ln = surname || '';
        return `${fn} ${ln}`;
    }

    render() {
        // Style for 'add new' panel.
        // Overrides the style of a standard card so that it renders in a pale grey
        // 'placeholder' style

        const addNewBannerBackgroundStyle = {
            backgroundColor: '#DDDDDD',
        };

        const addNewBannerTextStyle = {
            backgroundColor: '#DDDDDD',
        };


        const adminImage = (
            <img
              src={"https://upload.wikimedia.org/wikipedia/commons/5/53/Blank_woman_placeholder.svg"}
              width="50px"
              height="50px"
              style={{ width: '50px', height: '50px', backgroundColor: '#DDDDDD' }}
            />
          );

        return (
            <div
              style={[styles.base.card, { height: this.props.height, width: this.props.width }]}
            >
                <div
                  style={[styles.base.speaker, addNewBannerBackgroundStyle, addNewBannerTextStyle]}
                  onClick={() => this.props.onNewSpeakerSelected()}
                >
                    <div style={styles.base.speaker.name}>
                        Create New Speaker
                    </div>
                </div>
                <div
                  style={styles.base.session}
                  onClick={() => this.props.onNewSessionSelected()}
                >
                    <div style={styles.base.session.details}>
                        <div style={[styles.base.session.details.title]}>
                            Create New Session
                        </div>
                    </div>
                    <div style={styles.base.footer}>
                        <div style={styles.base.footer.admin.image}>
                            {adminImage}
                        </div>
                        <div style={styles.base.footer.admin.details}>
                            <div>
                              <p style={styles.base.footer.admin.name}>{""}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

NewSessionCard.propTypes = {
    id: PropTypes.string,
    height: PropTypes.string,
    width: PropTypes.string,
    onNewSpeakerSelected: PropTypes.func,
    onNewSessionSelected: PropTypes.func,
    title: PropTypes.string,
    status: PropTypes.string,
    date: PropTypes.object,
    speakerForename: PropTypes.string,
    speakerSurname: PropTypes.string,
    adminForename: PropTypes.string,
    adminSurname: PropTypes.string,
    adminImageUri: PropTypes.string,
};

export default Radium(NewSessionCard);
