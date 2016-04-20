import React, { Component, PropTypes } from 'react';

class LoginRequired extends Component {

    routerWillEnter(obj) {
        console.log(obj);
    }

    render() {
        return (
          <div>
            {this.props.children}
          </div>
        );
    }
}

LoginRequired.propTypes = {
    children: PropTypes.object,
};

export default LoginRequired;
