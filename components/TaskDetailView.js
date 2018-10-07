import React from 'react';
import { Container, Header, Left, Body, Right, Content, List, ListItem,
  Input, Label, Icon, Button, Title, Text } from 'native-base';

export default class TaskDetailView extends React.Component {
  static navigationOptions = {
      title: 'Detaljer',
    };

  render() {
    return (
      <Container>
        <Content>
          <List>
            <ListItem>
              <Input placeholder="Tittel" />
            </ListItem>
            <ListItem>
              <Input placeholder="Antall skritt" />
            </ListItem>
            <ListItem>
              <Input placeholder="Beskrivelse" />
            </ListItem>
            <ListItem>
              <Text>4738 av 8000 skritt igjen</Text>
            </ListItem>
          </List>

          <Button block onPress={() =>
            this.props.navigation.navigate('Home')
          }>
            <Text>OK</Text>
          </Button>

          <Button block transparent>
            <Icon type="FontAwesome" name="refresh" style={{color: 'black'}} />
          </Button>

          <Button block transparent>
            <Icon type="FontAwesome" name="trash" style={{color: 'black'}} />
          </Button>
        </Content>
      </Container>
    );
  }
}
