import React from 'react';
import { Container, Header, Content, Card, CardItem, Body, Text, Footer, Button } from 'native-base';
export default class ListView extends React.Component {
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

          <Card>
            <CardItem header bordered>
              <Text>Overskrift oppgave 3</Text>
            </CardItem>
            <CardItem>
              <Body>
                <Text>
                   Tekst
                </Text>
              </Body>
            </CardItem>
            <CardItem footer>
              <Text>Du har igjen 370 av 3000 skritt</Text>
            </CardItem>
          </Card>

          <Card>
            <CardItem header bordered>
              <Text>Overskrift oppgave 4</Text>
            </CardItem>
            <CardItem>
              <Body>
                <Text>
                   Tekst
                </Text>
              </Body>
            </CardItem>
            <CardItem footer>
              <Text>Du har igjen 1800 av 2000 skritt</Text>
            </CardItem>
          </Card>

          <Card>
            <CardItem header bordered>
              <Text>Overskrift oppgave 5</Text>
            </CardItem>
            <CardItem>
              <Body>
                <Text>
                   Tekst
                </Text>
              </Body>
            </CardItem>
            <CardItem footer>
              <Text>Du har igjen 4609 av 10000 skritt</Text>
            </CardItem>
          </Card>
        </Content>
        <Footer>
          <Button transparent light>
            <Text>Opprett ny oppgave</Text>
          </Button>
        </Footer>
      </Container>
    );
  }
}
