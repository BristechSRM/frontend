import React, { Component } from 'react';
import NavLink from './NavLink.jsx';
import styles from './appHeader.scss';

class AppHeader extends Component {

  render() {
    return (
      <div className={styles.appHeader}>
        <div>
          <div className={styles.logo}>
            <p>SRM</p>
          </div>
          {this.props.navigation.map(ni =>
            <NavLink label={ni.title} route={ni.route} />)}
        </div>
      </div>
    )
  }
}

export default AppHeader;
