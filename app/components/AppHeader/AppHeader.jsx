import React, { Component, PropTypes } from 'react';
import immutable from 'immutable';
import NavLink from './NavLink.jsx';
import styles from './appHeader.scss';

class AppHeader extends Component {

    renderNavLink(ni) {
        return <NavLink key={ni.title} label={ni.title} route={ni.route} />;
    }

    render() {
        const navigation = immutable.List([
            {
                title: 'Dashboard',
                route: '/dashboard',
            },
            {
                title: 'Calendar',
                route: '/calendar',
            },
        ]);

        return (
            <div className={styles.appHeader}>
                <div>
                    <div className={styles.logo}>
                        <a href="/">
                          <img src="/img/srm-logo.png" alt="SRM" />
                        </a>
                    </div>
                    {navigation.map(ni => this.renderNavLink(ni))}
                </div>
            </div>
        );
    }
}

AppHeader.propTypes = {
    navigation: PropTypes.instanceOf(immutable.List),
};

export default AppHeader;
