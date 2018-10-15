import React, { Component } from 'react';
import { Pedometer } from 'expo';
import { AsyncStorage } from 'react-native';
import { Container, Content, Text, Footer, Button } from 'native-base';
import TodoItem from './TodoItem';

export default class ListView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      items: new Set(),
      currentStepCount: 0,
    };
  }

  componentDidMount() {
    this._subscribe();
    this.getAll();
  }

  componentWillUnmount() {
    // this._unsubscribe();
  }

  _subscribe = () => {
    this._subscription = Pedometer.watchStepCount(result => {
      if (result.steps === parseInt(result.steps, 10)) {
        this.setState({
          currentStepCount: result.steps
        });
      }
    });
  };
  
  _unsubscribe = () => {
    this._subscription && this._subscription.remove();
    this._subscription = null;
  };

  async getAll() {
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
  
  render() {

    var cards = [];
    var stepcount = this.state.currentStepCount;
    this.state.items.forEach( function(item) {
      item.stepsTaken += stepcount;
      cards.push(<TodoItem key={item.id} item={item} />);
    });
    return (
      <Container>
        <Content>{cards}</Content>
        <Footer>
          <Button transparent light
            onPress={() => this.props.navigation.navigate('NewItem')}>
            <Text>Opprett ny oppgave</Text>
          </Button>
        </Footer>
      </Container>
    );
  }
}
