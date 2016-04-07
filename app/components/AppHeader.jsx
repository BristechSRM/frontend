import React, {Component} from 'react';
import NavLink from './NavLink.jsx';
import immutable from 'immutable';
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
                    {navigation.map(ni => <NavLink label={ni.title} route={ni.route}/>)}
                </div>
            </div>
        )
    }
}

export default AppHeader;
