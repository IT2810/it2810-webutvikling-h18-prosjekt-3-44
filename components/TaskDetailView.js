import React from 'react';
import { Container, Header, Left, Body, Right, Content, Form, Item,
  Input, Label, Icon, Button, Title, Text } from 'native-base';

export default class TaskDetailView extends React.Component {
  render() {
    return (
      <Container>
        <Header>
          <Left>
            <Button transparent onPress={() =>
              console.log("back")
            }>
              <Icon type="FontAwesome" name="angle-left" />
            </Button>
          </Left>
          <Body>
            <Title>Edit task</Title>
          </Body>
          <Right>
            <Button transparent>
              <Icon type="FontAwesome" name="refresh" style={{color: 'white'}} />
            </Button>
            <Button transparent>
              <Icon type="FontAwesome" name="trash" style={{color: 'white'}} />
            </Button>
          </Right>
        </Header>
        <Content>
          <Form>
            <Item>
              <Input placeholder="Tittel" />
            </Item>
            <Item>
              <Input placeholder="Antall skritt" />
            </Item>
            <Item>
              <Input placeholder="Beskrivelse" />
            </Item>
          </Form>
          <Button block onPress={() =>
            console.log("Form submitted")
          }>
            <Text>OK</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}
