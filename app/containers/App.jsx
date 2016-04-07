import React, {Component} from 'react';
import AppHeader from '../components/AppHeader.jsx';
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

export default App;
