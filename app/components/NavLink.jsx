import React, { Component } from 'react';
import RaisedButton from 'material-ui/lib/raised-button';

class NavLink extends Component {

    handleClick(e) {    
    }

    render() {
        const defaultStyles = {
            margin: 8
        };

        const styles = Object.assign({}, defaultStyles, this.props.styles);

        return (
      <RaisedButton label={this.props.label} onClick={e => handleClick} style={styles} />
    )
    }
}

export default NavLink;
