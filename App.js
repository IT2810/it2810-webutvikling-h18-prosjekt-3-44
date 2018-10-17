import React from 'react';
import Expo from 'expo'
import { createStackNavigator } from 'react-navigation';
import ListView from './components/ListView';
import TaskDetailView from './components/TaskDetailView';

// stack
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
  async UNSAFE_componentWillMount() {
    await Expo.Font.loadAsync({
      Roboto: import("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: import("native-base/Fonts/Roboto_medium.ttf"),
    });
    this.setState({ loading: false });
  }

	// render screen
  render() {
    if (this.state.loading) {
      return <Expo.AppLoading />;
    }

    return (
      <RootStack />
    );
  }
}
