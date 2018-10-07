import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
import { Container, Content, Card, CardItem, Body, Text, Footer, Button } from 'native-base';
export default class ListView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      items: [],
    };
  }

  componentDidMount() {
    this.getAll();
  }


  async getAll() {
    AsyncStorage.getAllKeys((err, keys) => {
      AsyncStorage.multiGet(keys, (err, stores) => {
        var fetchedItems = [];
        stores.map((result, i, store) => {
          let value = store[i][1];
          fetchedItems.push(JSON.parse(value));
        });
        this.setState({
          items: fetchedItems,
        });
      });
    });
  }
  
  render() {

    var cards = [];
    this.state.items.forEach( function(item) {
     cards.push(
        <Card key={item.id}>
          <CardItem header bordered>
            <Text>{item.header}</Text>
          </CardItem>
          <CardItem>
            <Body>
              <Text>{item.task}</Text>
            </Body>
          </CardItem>
          <CardItem footer>
            <Text>Du har gått {item.stepsTaken} av {item.stepsGoal} skritt</Text>
          </CardItem>
        </Card>
     );
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
