import React, { Component } from 'react';
import Card from 'material-ui/lib/card/card';
import CardActions from 'material-ui/lib/card/card-actions';
import CardHeader from 'material-ui/lib/card/card-header';
import CardMedia from 'material-ui/lib/card/card-media';
import CardTitle from 'material-ui/lib/card/card-title';
import FlatButton from 'material-ui/lib/flat-button';
import CardText from 'material-ui/lib/card/card-text';
import StarRating from 'react-star-rating';

class Speaker extends Component {

  render() {    
    var style = {
      width: this.props.width,
      height: this.props.height
    }
    return (
      <Card style={style}>
        <CardHeader
          title={this.props.name}
          avatar={this.props.adminImageUri} />
        <CardText>
          <StarRating name="speaker-rating" totalStars={5} rating={this.props.rating} disabled={true} size={20} />
          {this.props.title}
        </CardText>
      </Card>
    )
  }
}

export default Speaker;
