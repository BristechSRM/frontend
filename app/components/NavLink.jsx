import React, { Component, PropTypes } from 'react';
import RaisedButton from 'material-ui/lib/raised-button';

class NavLink extends Component {

    handleClick() {
    }

    render() {
        const defaultStyles = {
            margin: 8
        };

        const styles = Object.assign({}, defaultStyles, this.props.styles);

        return (
          <RaisedButton label={this.props.label} onClick={() => this.handleClick} style={styles}/>
        )
    }
}

NavLink.propTypes = {
    label: PropTypes.string,
    styles: PropTypes.object
};

export default NavLink;
