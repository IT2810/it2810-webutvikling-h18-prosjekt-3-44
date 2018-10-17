import React, { Component} from 'react';
import { Card, CardItem, Body, Text } from 'native-base';

export default class TodoItem extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
  }

  componentWillUnmount() {
  }

  render() {
    return (
      <Card>
        <CardItem header bordered>
          <Text>{this.props.item.title}</Text>
        </CardItem>
        <CardItem>
          <Body>
            <Text>{this.props.item.description}</Text>
          </Body>
        </CardItem>
        <CardItem footer>
          <Text>Du har gått {this.props.item.stepTaken} av {this.props.item.stepGoal} skritt</Text>
        </CardItem>
      </Card>
    );
  }


}
