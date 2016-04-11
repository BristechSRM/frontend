import React, { Component, PropTypes } from 'react';
import RaisedButton from 'material-ui/lib/raised-button';
import { Link } from 'react-router';

class NavLink extends Component {

    render() {
        const defaultStyles = {
            margin: 8,
        };

        const styles = Object.assign({}, defaultStyles, this.props.styles);

        const activeStyle = {
            backgroundColor: '#706f6f',
        };

        return (
          <RaisedButton
            label={this.props.label}
            labelStyle={{ color: '#c6c6c6' }}
            containerElement={<Link to={this.props.route} activeStyle={activeStyle} />}
            linkButton
            style={styles}
          />
        );
    }
}

NavLink.contextTypes = {
    router: PropTypes.object,
};

NavLink.propTypes = {
    label: PropTypes.string,
    route: PropTypes.string,
    styles: PropTypes.object,
};

export default NavLink;
