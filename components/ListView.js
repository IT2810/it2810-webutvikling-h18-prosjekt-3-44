import React, { Component } from 'react';
import { Pedometer } from 'expo';
import { AsyncStorage } from 'react-native';
import { Container, Content, Text, Footer, Button } from 'native-base';
import TodoItem from './TodoItem';

export default class ListView extends Component {
  static navigationOptions = {
      title: 'Hjem',
    };

  constructor(props) {
    super(props);
    this.state = {
      items: new Set(),
      stepsSinceLastUpdate: 0,
    };
  }

  componentDidMount() {
    this._subscribe();
    this.getAll();
  }

  componentWillUnmount() {
    this._unsubscribe();
  }

  _subscribe = () => {
    this._subscription = Pedometer.watchStepCount(result => {
      if (result.steps === parseInt(result.steps, 10)) {
        this.setState({
          stepsSinceLastUpdate: result.steps - this.state.stepsSinceLastUpdate
        });
      }
    });
  };

  _unsubscribe = () => {
    this._subscription && this._subscription.remove();
    this._subscription = null;
  };

  completeItem = async (key) => {
    AsyncStorage.removeItem(key).then(() => {
      this.getAll();
    });
  }

  // bla bla
  getAll = async () => {
    AsyncStorage.getAllKeys((err, keys) => {
      AsyncStorage.multiGet(keys, (err, stores) => {
        var fetchedItems = [];
        stores.map((result, i, store) => {
          let value = store[i][1];
          fetchedItems.push(JSON.parse(value));
        });
        this.setState({
          items: new Set(fetchedItems),
        });
      });
    });
  }

  // renders a list of cards with tasks and a button which can be pressed to create new tasks
  render() {
    var cards = [];
    var stepcount = this.state.stepsSinceLastUpdate;
    this.state.items.forEach((item) => {
      let stepTaken = stepcount + item.stepTaken;
      if (item.stepGoal <= stepTaken) {
        item.stepTaken = item.stepGoal;
      } else {
        item.stepTaken = stepTaken;
      }

      AsyncStorage.mergeItem(item.id, JSON.stringify({stepTaken: item.stepTaken}));
      cards.push(<TodoItem key={item.id} item={item} completeItem={this.completeItem} />);
    });
    return (
      <Container>
        <Content>{cards}</Content>
        <Footer>
          <Button transparent light
            onPress={() => {
              this.props.navigation.navigate('TaskDetailView', {
                getAll: this.getAll
              }
              )
            }
            }>
            <Text>Opprett ny oppgave</Text>
          </Button>
        </Footer>
      </Container>
    )
  }
}
