import React, {Component} from 'react';
import RaisedButton from 'material-ui/lib/raised-button';
import { Link } from 'react-router';

class NavLink extends Component {

    render() {
        const defaultStyles = {
            margin: 8
        };

        const styles = Object.assign({}, defaultStyles, this.props.styles);

        var activeStyle = {
            backgroundColor: '#706f6f'
        }

        return (
          <RaisedButton
            label={this.props.label}
            labelStyle={{color: '#c6c6c6'}}
            containerElement={<Link to={this.props.route} activeStyle={activeStyle} />}
            linkButton={true}
            style={styles}>
          </RaisedButton>
        )
    }
}

NavLink.contextTypes = {
    router: React.PropTypes.object
}

export default NavLink;
