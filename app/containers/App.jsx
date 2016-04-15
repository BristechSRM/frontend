import React, { Component, PropTypes } from 'react';
import AppHeader from '../components/AppHeader/AppHeader.jsx';
import styles from './app.scss';

class App extends Component {

    render() {
        return (
            <div>
                <AppHeader />
                <div className={styles.content}>
                    {this.props.children}
                </div>
                <footer></footer>
            </div>
        );
    }
}

App.propTypes = {
    children: PropTypes.object,
};

export default App;
