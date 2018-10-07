import React, { Component } from 'react';
import { Container, Header, Content, Card, CardItem, Body, Text, Footer, Button } from 'native-base';
export default class ListView extends Component {
  render() {
    return (
      <Container>
        <Header />
        <Content>
          <Card>
            <CardItem header bordered>
              <Text>Overskrift oppgave 1</Text>
            </CardItem>
            <CardItem>
              <Body>
                <Text>
                   Tekst
                </Text>
              </Body>
            </CardItem>
            <CardItem footer>
              <Text>Du har igjen 36 av 4000 skritt</Text>
            </CardItem>
          </Card>

          <Card>
            <CardItem header bordered>
              <Text>Overskrift oppgave 2</Text>
            </CardItem>
            <CardItem>
              <Body>
                <Text>
                   Tekst
                </Text>
              </Body>
            </CardItem>
            <CardItem footer>
              <Text>Du har igjen 355 av 4500 skritt</Text>
            </CardItem>
          </Card>

        </Content>
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
