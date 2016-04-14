import React, { Component, PropTypes } from 'react';
import styles from './navLink.scss';
import { Link } from 'react-router';

class NavLink extends Component {

    render() {
        const activeStyle = {
            backgroundColor: '#6f6f6f',
            color: '#ffffff',
            border: '2px solid #6f6f6f',
        };

        return (
            <div className={styles.navLink}>
                <Link to={this.props.route} activeStyle={activeStyle}>
                    {this.props.label}
                </Link>
            </div>
        );
    }
}

NavLink.contextTypes = {
    router: PropTypes.object,
};

NavLink.propTypes = {
    label: PropTypes.string,
    route: PropTypes.string,
};

export default NavLink;
