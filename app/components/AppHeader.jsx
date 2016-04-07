import React, { Component, PropTypes } from 'react';
import immutable from 'immutable';
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
                    {this.props.navigation.map(ni => <NavLink label={ni.title} route={ni.route}/>)}
                </div>
            </div>
        )
    }
}

AppHeader.propTypes = {
    navigation: PropTypes.instanceOf(immutable.List)
};

export default AppHeader;
