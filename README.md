# TODO Walk

## Mockup
Det første vi gjorde i prosjektet etter at vi hadde en idé, var å lage en mockup av hvordan designet kunne se ut. På den måten fikk vi en oversikt over hva som måtte gjøres. Vi kom frem til at vi hadde behov for to ulike skjermbilder.

![Mockup](assets/mockup/mockup.png?raw=true "Mockup of the app")

Venstre mockup viser det vi kaller *ListView*, en liste over oppgaver og hvor mange skritt som er igjen for hver oppgave. Man kan trykke på de ulike oppgavene for å endre dem eller opprette en ny ved å trykke på knappen i det nederste feltet. Da kommer man til skjermen i høyre mockup.

I høyre mockup ser man det vi kaller *TaskDetailView*. Her kan man opprette en ny oppgave eller endre en som allerede eksisterer, avhengig av hva man trykte på i ListView. Man kan legge til en tittel, antall skritt man har på seg før oppgaven skal være fullført og en beskrivelse. Dessuten kan man slette oppgaven eller nullstille antall skritt som er blitt gått for oppgaven.

Designet til den ferdige appen var stort sett lik mockupen, med noen små endringer for TaskDetailView. Isteden for ikoner øverst for å nullstille skritt og fjerne en oppgave, så laget vi noen knapper med tekst nederst på skjermen.

## Tredjeparts-biblioteker
### React Navigation
For å implementere en pen og enkel navigering mellom skjermene valgte vi å benytte oss av *React Navigation* fra https://reactnavigation.org/en/.

For å bruke dette biblioteket må man importere *createStackNavigator*. Dette er en funksjon som returnerer en React-komponent som kan vises. Denne tar inn et *route configuration object* og et valgfritt *options object* der man kan sette blant annet initielt navn på skjermbildet som vises.
```javascript
import { createStackNavigator } from 'react-navigation';
```

Deretter kan man opprette et objekt av denne eller bare eksportere den direkte.

```javascript
const RootStack = createStackNavigator(
	{
		Home: ListView,
		TaskDetailView: TaskDetailView,
	},
	{
		initialRouteName: 'Home',
	}
);
```

Videre kan man kan vise skjermen ved å kalle `<RootStack />` i render.

De ulike skjermene får en referanse til en *navigation-objekt* som de kan bruke til å navigere til andre skjermer. F.eks slik:
```javascript
this.props.navigation.navigate('Home')
```

Les mer om hvordan man kommer i gang med React Navigation [her](https://reactnavigation.org/docs/en/getting-started.html).
### NativeBase
For å implementere en del komponenter som har med layout og input å gjøre, som fungerer til både Android og iOS, valgte vi å benytte oss av *NativeBase* fra https://nativebase.io

Dette biblioteket har mange ulike komponenter, men i vårt prosjekt var følgende komponenter aktuelle: *Container*, *Content*, *Text*, *Footer*, *Button*, *List*, *ListItem*, *Card*, *CardItem*, *Body* og *Input*

For å implementere NativeBase importerer man bare de komponentene man ønsker, og bruker de der de trengs. F.eks slik:
```javascript
import { Card, CardItem, Body, Text } from 'native-base';
```

Noe man må være oppmerksom på er at dette biblioteket bruker noen egne fonts som må lastes inn asynkront før de blir forsøkt brukt. Dette løste vi ved å gi App en variabel *loading* som indikerer at den fortsatt laster. `this.state = { loading: true };`.

Fontene lastes inn asynkront og loading settes til false når de er lastet:
```javascript
async componentWillMount() {
    await Expo.Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      Ionicons: require("@expo/vector-icons/fonts/Ionicons.ttf"),
    });
    this.setState({ loading: false });
  }
  ```
  
  I render blir ikke fontene forsøkt brukt før de er lastet inn:
  ```javascript
  render() {
    if (this.state.loading) {
      return <Expo.AppLoading />;
    }

    return (
      <RootStack />
    );
  }
  ```
  
  Les mer om hvordan man kommer i gang med NativeBase [her](https://docs.nativebase.io/docs/GetStarted.html).
