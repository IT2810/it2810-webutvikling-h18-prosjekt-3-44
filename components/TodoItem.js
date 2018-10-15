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
          <Text>{this.props.item.header}</Text>
        </CardItem>
        <CardItem>
          <Body>
            <Text>{this.props.item.task}</Text>
          </Body>
        </CardItem>
        <CardItem footer>
          <Text>Du har gått {this.props.item.stepsTaken} av {this.props.item.stepsGoal} skritt</Text>
        </CardItem>
      </Card>
    );
  }


}
