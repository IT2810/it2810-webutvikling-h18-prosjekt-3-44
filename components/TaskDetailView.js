import React from 'react';
import {AsyncStorage } from 'react-native';
import { Container, Content, List, ListItem, Input, Button, Text } from 'native-base';

export default class TaskDetailView extends React.Component {
  static navigationOptions = {
      title: 'Detaljer',
    };

  constructor(props) {
    super(props);
    this.state = {
      id: "",
      title: "",
      stepTaken: 0,
      stepGoal: 0,
      description: "",
    };
  }

  button_pressed = () => {

    if (this.state.title.length < 1) {
      // Error message, should be longer than one
      return;
    } else if (this.state.stepGoal < 1) {
      // Error message, should be longer than one
      return;
    } else if (this.state.description.length < 1) {
      // Error message, should be longer than one
      return;
    }
    let stateCopy = {
      id: this.state.title + this.state.stepGoal,
      title: this.state.title,
      stepTaken: 0,
      stepGoal: this.state.stepGoal,
      description: this.state.description,
    }
    this._storeItem(stateCopy.id, stateCopy).then(() => {
      const { params} = this.props.navigation.state;
      params.getAll().then(() => {
        this.props.navigation.navigate("Home");
      }).catch((error) => {
        console.log(error)
      });
    }).catch((error) => {
      console.log(error)
    });
  }

  _storeItem = async (id, item) => {
		try {
			await AsyncStorage.setItem(id, JSON.stringify(item));
		} catch (error) {
      console.log(error)
		}
	}

  handleTitleChange = (text) => {
    console.log(text);
    this.setState({title: text});
  }

  handleStepGoalChange = (text) => {
    console.log(text);
    this.setState({stepGoal: Number(text)});
  }

  handleDescriptionChange = (text) => {
    this.setState({description: text});
  }


  render() {
    return (
      <Container>
        <Content>
          <List>
            <ListItem>
              <Input placeholder="Tittel" type="text" value={this.state.title} onChangeText={this.handleTitleChange} />
            </ListItem>
            <ListItem>
              <Input type="number" keyboardType='numeric' value={this.state.stepGoal.toString()} onChangeText={this.handleStepGoalChange}/>
            </ListItem>
            <ListItem>
              <Input placeholder="Beskrivelse" type="text" value={this.state.description} onChangeText={this.handleDescriptionChange}/>
            </ListItem>
          </List>

          <Button block onPress={this.button_pressed}>
            <Text>OK</Text>
          </Button>

          <Button block transparent>
            <Text>Nullstill skritt</Text>
          </Button>

          <Button block transparent>
            <Text>Slett oppgave</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}
