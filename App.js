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
      startDate: new Date('2018-10-06T21:36:50.502Z'),
    };
    this._storeItem().then(() => {
      this._retrieveItem().then((item) => {
      }).catch((error) => {
      });
    }).catch((error) => {
    });
  }

	_storeItem = async () => {
		try {
			await AsyncStorage.setItem(this.item.id, JSON.stringify(this.item));
		} catch (error) {
		}
	}

	_retrieveItem = async () => {
		try {
			const value = await AsyncStorage.getItem(this.item.id);
			return JSON.parse(value);
		} catch (error) {
      //
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
