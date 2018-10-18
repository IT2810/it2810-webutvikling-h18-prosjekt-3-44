import React, { Component} from 'react';
import { Button, Card, CardItem, Body, Text } from 'native-base';
import Util from './Util';

export default class TodoItem extends Component {
  constructor(props) {
    super(props);
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
        <CardItem>
          <Button disabled={Util.stepsNotEqual(this.props.stepTaken, this.props.stepGoal)}
            onPress={(() => {
              this.props.completeItem(this.props.item.id);
            })
            }>
            <Text>Fullfør</Text>
          </Button>
        </CardItem>
      </Card>
    );
  }


}
