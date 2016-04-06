import React, { Component } from 'react';
import Dashboard from './Dashboard.jsx';

import styles from './app.scss';

class App extends Component {

    render() {
        return (
      <div>
        <header></header>
        {this.props.children}
        <footer></footer>
      </div>
    );
    }
}

export default App;
