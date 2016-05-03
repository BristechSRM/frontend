import React, { Component, PropTypes } from 'react';
import NavLink from './NavLink.jsx';
import styles from './appHeader.scss';

class AppHeader extends Component {

    renderNavLink(ni) {
        return <NavLink key={ni.title} label={ni.title} route={ni.route} />;
    }

    render() {
        const navigation = [
            {
                title: 'Dashboard',
                route: '/dashboard',
            },
            {
                title: 'Calendar',
                route: '/calendar',
            },
        ];

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
    navigation: PropTypes.array,
};

export default AppHeader;
