import React from 'react';
import Database from '../lib/Database';
import { Container, Content, List, ListItem, Input, Button, Text } from 'native-base';

// Component for creating new tasks
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
      // Title should be longer than one, do nothing
      return;
    } else if (this.state.stepGoal < 1) {
      // Step goal should be longer than one, do nothing
      return;
    } else if (this.state.description.length < 1) {
      // Description should be longer than one, do nothing
      return;
    }
    let stateCopy = {
      id: this.state.title + this.state.stepGoal,
      title: this.state.title,
      stepTaken: 0,
      stepGoal: this.state.stepGoal,
      description: this.state.description,
    }
    Database.storeItem(stateCopy.id, stateCopy).then(() => {
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


  handleTitleChange = (text) => {
    this.setState({title: text});
  }

  handleStepGoalChange = (text) => {
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
              <Input placeholder="Tittel"
                     type="text"
                     value={this.state.title}
                     onChangeText={this.handleTitleChange} />
            </ListItem>
            <ListItem>
              <Input placeholder="Antall skritt"
                     type="number" 
                     keyboardType='numeric'
                     value={this.state.stepGoal < 1 ? "" : this.state.stepGoal.toString()}
                     onChangeText={this.handleStepGoalChange}/>
            </ListItem>
            <ListItem>
              <Input placeholder="Beskrivelse"
                     type="text"
                     value={this.state.description} 
                     onChangeText={this.handleDescriptionChange}/>
            </ListItem>
          </List>

          <Button block onPress={this.button_pressed}>
            <Text>OK</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}
