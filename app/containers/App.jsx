import React, {Component} from 'react';
import AppHeader from '../components/AppHeader.jsx';
import immutable from 'immutable';

import styles from './app.scss';

class App extends Component {

    render() {
        var navigation = immutable.List([
            {
                title: 'Dashboard',
                route: ''
            }, {
                title: 'Sessions',
                route: ''
            }, {
                title: 'Speakers',
                route: ''
            }
        ]);

        return (
            <div>
                <AppHeader navigation={navigation}/>
                <div className={styles.content}>
                    {this.props.children}
                </div>
                <footer></footer>
            </div>
        );
    }
}

export default App;
