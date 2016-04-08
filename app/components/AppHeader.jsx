import React, { Component, PropTypes } from 'react';
import immutable from 'immutable';
import NavLink from './NavLink.jsx';
import styles from './appHeader.scss';

class AppHeader extends Component {

    render() {
        const navigation = immutable.List([
            {
                title: 'Dashboard',
                route: '/'
            }, {
                title: 'Sessions',
                route: '/sessions'
            }, {
                title: 'Speakers',
                route: '/speakers'
            }
        ]);

        return (
            <div className={styles.appHeader}>
                <div>
                    <div className={styles.logo}>
                        <img src="/img/srm-logo.png" alt="SRM" />
                    </div>
                    {navigation.map(ni => <NavLink key={ni.title} label={ni.title} route={ni.route}/>)}
                </div>
            </div>
        )
    }
}

AppHeader.propTypes = {
    navigation: PropTypes.instanceOf(immutable.List)
};

export default AppHeader;
