import React from 'react';
import Expo from 'expo'
import { createStackNavigator } from 'react-navigation';
import ListView from './components/ListView';
import TaskDetailView from './components/TaskDetailView';

// RootStack for the Navigation bar
const RootStack = createStackNavigator(
	{
		Home: ListView,
		TaskDetailView: TaskDetailView,
	},
	{
		initialRouteName: 'Home',
	}
);


export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { loading: true };
  }

	// load fonts and set loading to false when App is finnished loading
  async componentWillMount() {
    await Expo.Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
    });
    this.setState({ loading: false });
  }

  render() {
    if (this.state.loading) {
      return <Expo.AppLoading />;
    }

    return (
      <RootStack />
    );
  }
}
