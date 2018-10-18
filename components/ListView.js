import React, { Component } from 'react';
import { Container, Content, Text, Footer, Button } from 'native-base';
import TodoItem from './TodoItem';
// import StepCounter from '../lib/StepCounter';
import Database from '../lib/Database';

export default class ListView extends Component {
  static navigationOptions = {
      title: 'Hjem',
    };

  constructor(props) {
    super(props);
    // this.stepCounter = new StepCounter();
    this.state = {
      items: new Set(),
      stepsSinceLastUpdate: 0,
    };
  }

  componentDidMount() {
    // this.stepCounter.subscribe();
    this.getAll();
  }

  componentWillUnmount() {
    // this.stepCounter.unsubscribe();
  }


  completeItem = async (key) => {
    Database.removeItem(key).then(() => {
      this.getAll();
    }).catch((error) => {
      console.log(error);
    });
  }

  // bla bla
  getAll = async () => {
    Database.getAllItems().then((fetchedItems) => {
      this.setState({
        items: new Set(fetchedItems),
      });
    }).catch((error) => {
      console.log(error)
    });
  }

  // renders a list of cards with tasks and a button which can be pressed to create new tasks
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
