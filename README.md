# TODO Walk
[Introduksjon]

## Samarbeid og bruk av Git
Vi har vært en gruppe på 2 personer. Til å begynne med delte vi prosjektet inn i ulike deler og opprettet issues for disse med en kort beskrivelse. Noen a disse var å lage en mockup av appen, lage statiske layouter av ulike skjermbilder som senere kunne bli implementert, implementere AsyncStorage, navigasjon, implementere skritteller osv.

Til å begynne med opprettet vi en mockup. Etter å ha fått opp denne tok en person ansvar for å lage det statiske designet og sette i gang med testing, mens den andre fikk implementert navigasjon, satt opp asyncstorage og fant et bibliotek for bruk av skritteller og fikk implementert dette.

Selv om arbeidsoppgavene var vel definerte har prosjektet krevd tett samarbeid, der vi har utvekslet kunnskap og ideer om bibliotekene og teknologien vi har benyttet. Vi har også parprogrammert litt for å løse noen av de mer komplekse utfordringene. F.eks ved implementering av AsyncStorage.

### Issues og commits
Hver issue som opprettes i Github har en egen ID. Commits som bidrar eller løser en spesiell issue har fått ID'n til issuen først i commit-meldingen. Mindre commits som ikke er koblet direkte til en issue på denne måten, har bare blitt commitet uten å være linket til en issue. F.eks oppdateringer av README og lignende.

## Mockup
Etter at vi hadde en idé var det første vi gjorde å lage en mockup av hvordan designet kunne se ut. På den måten fikk vi en oversikt over hva som måtte gjøres. Vi kom frem til at vi hadde behov for to ulike skjermbilder.

![Mockup](assets/mockup/mockup.png?raw=true "Mockup of the app")

Venstre mockup viser det vi kaller *ListView*, en liste over oppgaver og hvor mange skritt som er igjen for hver oppgave. Man kan trykke på de ulike oppgavene for å endre dem eller opprette en ny ved å trykke på knappen i det nederste feltet. Da kommer man til skjermen i høyre mockup.

I høyre mockup ser man det vi kaller *TaskDetailView*. Her kan man opprette en ny oppgave eller endre en som allerede eksisterer, avhengig av hva man trykte på i ListView. Man kan legge til en tittel, antall skritt man har på seg før oppgaven skal være fullført og en beskrivelse. Dessuten kan man slette oppgaven eller nullstille antall skritt som er blitt gått for oppgaven.

Designet til den ferdige appen ble veldig lik mockupen, men med noen endringer både for ListView og TaskDetailView. Endringer på ListView var posisjonering av tekst og at det endelige designet inkluderer en knapp som lar brukeren trykke på at oppgaven er fullført. Noen endringer for TaskDetailView er at istedet for ikoner øverst for å nullstille skritt og fjerne en oppgave, så laget vi noen knapper med tekst nederst på skjermen.

## Biblioteker
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
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf")
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
  
  ### AsyncStorage
  AsyncStorage er et enkelt bibliotek for asynkron, permanent lagring av tilstand, slik at man kan lagre data selv når appen avsluttes.
  
  På iOS er AsyncStorage implementert med iOS-spesifikk kode som lagrer små verdier i en serialisert *key-value storage* og større verdier i separate filer. På Android brukes enten RocksDB eller SQLite, avhengig av hva som er tilgjengelig.

Alle funksjoner i AsyncStorage API returnerer et Promise objekt.
  
  AsyncStorage importeres på følgende måte:
  ```javascript
  import { AsyncStorage } from "react-native"
  ```
  
Eksempel på lagring av data:
```javascript
_lagreData = async () => {
  try {
    await AsyncStorage.setItem('@MySuperStore:key', 'Data jeg ønsker å lagre');
  } catch (error) {
    // Noe gikk galt ved lagring av data
  }
}
```

Eksempel på henting av data:
```javascript
_hentData = async () => {
  try {
    const value = await AsyncStorage.getItem('TASKS');
    if (value !== null) {
      console.log(value);
    }
   } catch (error) {
     // Noe gikk galt ved henting av data
   }
}
```
Les mer om hvordan man kommer i gang med AsyncStorage [her](https://facebook.github.io/react-native/docs/asyncstorage).

### Pedometer
Pedometer er et bibliotek fra [Expo](https://docs.expo.io/versions/latest/sdk/pedometer) som brukes for å kommunisere med mobilens skritteller.
Biblioteket fungerer for både Android og iOS og benytter seg av API til User Core Motion for iOS og Google Fit for Android.

Antall skritt hentes ut ved at man sender med en funksjon som callback når registrere seg på tjenesten.
Callbackfunksjonen kalles hver gang Expo Pedometer oppdateres fra User Core Motion eller Google Fit.

``` javascript
subscribe = () => {                                                                                                                                                                                                                                    
  this._subscription = Pedometer.watchStepCount(result => {                                                                                                                                                                                            
    if (result.steps === parseInt(result.steps, 10)) {                                                                                                                                                                                                 
      this.updateSteps(result.steps);                                                                                                                                                                                                                  
    }                                                                                                                                                                                                                                                  
  });                                                                                                                                                                                                                                                  
};
```


## Testing
Litt om testing her
