import React, { Component } from 'react';
import { Container, Content, Text, Footer, Button } from 'native-base';
import TodoItem from './TodoItem';
import StepCounter from '../lib/StepCounter';
import Database from '../lib/Database';

// Component for listing all the TODO-Items
export default class ListView extends Component {
  static navigationOptions = {
    title: 'Hjem',
  };

  constructor(props) {
    super(props);
    this.stepCounter = new StepCounter(this.getAll);
    this.state = {
      items: new Set(),
    };
  }
  
  // Subscribe to the step counter and
  // get all the Items from AsyncStorage
  componentDidMount() {
    this.stepCounter.subscribe();
    this.getAll();
  }
  
  // Unsubscribe from the step counter
  componentWillUnmount() {
    this.stepCounter.unsubscribe();
  }

  // Function passed to all the TodoItems
  // Is called when the complete button is pressed.
  // Removes the TodoItem from the database and update state
  completeItem = async (key) => {
    Database.removeItem(key).then(() => {
      this.getAll();
    }).catch((error) => {
      console.log(error);
    });
  }

  // Get all TodoItems from the database and
  // update State
  getAll = async () => {
    Database.getAllItems().then((fetchedItems) => {
      this.setState({
        items: new Set(fetchedItems),
      });
    }).catch((error) => {
      console.log(error)
    });
  }

  // Renders a list of cards with tasks and a button which can be pressed to create new tasks
  render() {
    var cards = [];
    this.state.items.forEach((item) => {
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
              })
            }
            }>
            <Text>Opprett ny oppgave</Text>
          </Button>
        </Footer>
      </Container>
    )
  }
}
