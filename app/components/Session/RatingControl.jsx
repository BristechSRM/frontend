import React, { Component, PropTypes } from 'react';
import StarRating from 'react-star-rating';

class RatingControl extends Component {
    render() {
        return (
            <StarRating
              name="session-rating"
              totalStars={5}
              rating={this.props.rating}
              disabled={false}
              editing
              size={16}
              onRatingClick={(e, data) => this.props.onRatingClick(data.rating) }
            />
        );
    }
}

RatingControl.propTypes = {
    rating: PropTypes.number,
    onRatingClick: PropTypes.func,
};

export default RatingControl;
