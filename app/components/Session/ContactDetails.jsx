import React, { Component, PropTypes } from 'react';

class ContactDetails extends Component {

    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    renderHandleRow(handle) {
        return (
            <tr key={handle.id} >
                <td>{this.capitalizeFirstLetter(handle.type)}</td>
                <td>{handle.type === 'twitter' ? '@' : null}{handle.identifier}</td>
            </tr>
        );
    }
    render() {
        return (
            <div>
                <h1>Contact Details</h1>
                <table>
                    <tbody>
                        {this.props.handles ? this.props.handles.map(handle => this.renderHandleRow(handle)) : null}
                    </tbody>
                </table>
            </div>
        );
    }
}

ContactDetails.propTypes = {
    handles: PropTypes.array,
};

export default ContactDetails;
