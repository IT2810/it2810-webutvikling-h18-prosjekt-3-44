import React from 'react';
import { AsyncStorage } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import ListView from './components/ListView';
import NewItem from './components/NewItem';

const RootStack = createStackNavigator(
	{
		Home: ListView,
		NewItem: NewItem,
	},
	{
		initialRouteName: 'Home',
	}
);


export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { loading: true };
    this.item = {
      id: "1",
      header: "En viktig oppgave",
      task: "Dette må gjøres!",
      stepsTaken: 0,
      stepsGoal: 400,
      startDate: new Date(),
    };
    this._storeItem().then(() => {
      this._retrieveItem().then((item) => {
        console.log("First test: " + JSON.stringify(item));
      }).catch((error) => {
        console.log("Item retrieve error: " + error);
      });
    }).catch((error) => {
      console.log("Item store error: " + error);
    });
  }

	_storeItem = async () => {
		try {
			await AsyncStorage.setItem(this.item.id, JSON.stringify(this.item));
		} catch (error) {
			console.log(error);
		}
	}

	_retrieveItem = async () => {
		try {
			const value = await AsyncStorage.getItem(this.item.id);
			return JSON.parse(value);
		} catch (error) {
			console.log(error.message);
		}
		return
	}
		

  async componentWillMount() {
    await Expo.Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      Ionicons: require("@expo/vector-icons/fonts/Ionicons.ttf"),
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
