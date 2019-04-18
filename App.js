//VOICE RECOGNITION

// import React from 'react';
// import {Platform, StyleSheet, Text, View, Button} from 'react-native';

// import Voice from 'react-native-voice'

// export default class App extends React.Component {

//   constructor(Props) {
//     super(Props)
//     this.state = {
//       recognized: '',
//       started: '',
//       results: []
//     }

//     Voice.onSpeechStart = this.onSpeechStart.bind(this)
//     Voice.onSpeechRecognized = this.onSpeechRecognized.bind(this)
//     Voice.onSpeechResults = this.onSpeechResults.bind(this)
//   }

//   componentWillUnmount() {
//     Voice.destroy().then(Voice.removeAllListeners)
//   }

//   onSpeechStart(e){
//     this.setState({
//       started: '√'
//     })
//   }

//   onSpeechRecognized(e){
//     this.setState({
//       recognized: '√'
//     })
//   }

//   onSpeechResults(e){
//     this.setState({
//       results: e.value
//     })
//   }

//   async startRecognition(e){
//     this.setState({
//       recognized: '',
//       started: '',
//       results: []
//     })
//     try {
//       await Voice.start('en-US')
//     } catch (error) {
//       console.error(error)
//     }
//   }

//   render() {
//     return (
//       <View style={styles.container}>
//         <Button style={styles.button} onPress={this.startRecognition.bind(this)} title="Start"/>
//         <Text style={styles.transcript}>Transcript</Text>
//         {this.state.results.map((result,i) =>
//           <Text style={styles.result} key={i}>{result}</Text>
//         )}
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#F5FCFF',
//   },
//   button: {
//     padding: 10
//   },
//   transcript: {
//     padding: 10
//   },
//   result: {
//     color: 'red'
//   }
// });

//NAVIGATOR

import React from 'react'
import { View, Text, Image, StyleSheet, Button } from "react-native";
import {createStackNavigator, createAppContainer, createBottomTabNavigator, createSwitchNavigator, createDrawerNavigator} from 'react-navigation';
import { Icon, DatePicker } from 'native-base';

import Login from './components/Login.js'
import Register from './components/Register.js'
import Home from './components/Home.js'
import Profile from './components/Profile.js'
import History from './components/History.js'
import InfoPage from './components/InfoPage.js'

class LoginScreen extends React.Component {
  static navigationOptions = {
    drawerLabel: 'Log out',
    drawerIcon: ({ tintColor }) => (
      <Icon name='log-out'/>
    )
  };
  // static navigationOptions = {
  //   title: 'Login',
  // };
  render() {
    const {navigate} = this.props.navigation;
    return (
      // <Button
      //   title="Go to Jane's profile"
      //   onPress={() => navigate('Profile', {name: 'Jane'})}
      // />
      <Login navigate={navigate} />
      // <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      //   <Text>Home Screen</Text>
      // </View>
      // <View style={{flex: 1, alignItems: 'center', justifyContent:'center'}}>
      //   <Button
      //   onPress={() => this.props.navigation.navigate('Register')}
      //   title="Go to notifications"
      //   />
      // </View>
    );
  }
}

class RegisterScreen extends React.Component {

  // static navigationOptions = {
  //   drawerLabel: 'Notifications',
  //   drawerIcon: ({ tintColor }) => (
  //     <Image
  //       source={require('./components/Shopping-symbol.png')}
  //       style={[styles.icon, {tintColor: tintColor}]}
  //     />
  //   ),
  // };

  render() {
    const {navigate} = this.props.navigation;
    return(
      // <View style={{flex: 1,alignItems: 'center', justifyContent: 'center'}}>
      //   <Text>Register Page</Text>
      // </View>
      <Register navigate={navigate}/>
      // <View style={{flex: 1,alignItems: 'center', justifyContent: 'center'}}>
      //   <Button
      //   onPress={() => this.props.navigation.goBack()}
      //   title="Go back home"
      //   />
      // </View>
    )
  }
}

class HomeScreen extends React.Component {
  static navigationOptions = {
    // drawerLabel: ({tintColor}) => (
    //   <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
    //     <DatePicker
    //     defaultDate={new Date(2018, 4, 4)}
    //     minimumDate={new Date(2018, 1, 1)}
    //     maximumDate={new Date(2018, 12, 31)}
    //     locale={"en"}
    //     timeZoneOffsetInMinutes={undefined}
    //     modalTransparent={false}
    //     animationType={"fade"}
    //     androidMode={"default"}
    //     placeHolderText="Click to review History"
    //     textStyle={{ color: tintColor, fontFamily: 'Arial Rounded MT Bold' }}
    //     placeHolderTextStyle={{ color: 'rgba(0,0,0,0.25)' }}
    //     onDateChange={this.setDate}
    //     disabled={false}
    //     />
    //   </View>),
    drawerLabel: 'Home',
    drawerIcon: ({tintColor}) => (
      <Icon name='home' style={{color: tintColor}}/>
      // <Image
      // source={require('./components/Shopping-symbol.png')}
      // style={[styles.icon, {tintColor: tintColor}]}
      // />
    )
  };

  render() {
    const {navigation} = this.props;
    return(
      <Home navigation={navigation}/>
    )
  }
}

class ProfileScreen extends React.Component {
  static navigationOptions = {
    drawerLabel: 'Profile',
    drawerIcon: ({tintColor}) => (
      <Icon name='person' style={{color: tintColor}}/>
    )
  };
  
  render() {
    const {navigation} = this.props;
    return(
      <Profile navigation={navigation}/>
    )
  }
}

class HistoryScreen extends React.Component {
  static navigationOptions = {
    drawerLabel: ({tintColor}) => (
      <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
      <DatePicker
      defaultDate={new Date(2018, 4, 4)}
      minimumDate={new Date(2018, 1, 1)}
      maximumDate={new Date(2018, 12, 31)}
      locale={"en"}
      timeZoneOffsetInMinutes={undefined}
      modalTransparent={false}
      animationType={"fade"}
      androidMode={"default"}
      placeHolderText="Click to review History"
      textStyle={{ color: tintColor, fontFamily: 'Arial Rounded MT Bold' }}
      placeHolderTextStyle={{ color: 'rgba(0,0,0,0.25)' }}
      onDateChange={this.setDate}
      disabled={false}
      />
      </View>),
    // drawerLabel: 'History',
    drawerIcon: ({tintColor}) => (
      <Icon name='timer' style={{color: tintColor}}/>
    )
  };

  render() {
    const {navigation} = this.props;
    return(
      <History navigation={navigation}/>
    )
  }
}

class InfoScreen extends React.Component{
  render() {
    const {navigate} = this.props.navigation;
    return(
      <InfoPage navigate={navigate} />
    )
  }
}

class SettingsScreen extends React.Component{
  render() {
    return(
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Setting Screens</Text>
      </View>
    )
  }
}

const LoginStack = createStackNavigator({
  Login: {screen: LoginScreen},
  Register: {screen: RegisterScreen},
  Info: {screen: InfoScreen}
},
{
  headerMode: 'none'
}
)

const HomeStack = createDrawerNavigator({
  Home: {screen: HomeScreen},
  Profile: {screen: ProfileScreen},
  History: {screen: HistoryScreen},
  Login: {screen: LoginScreen}
},
{
  activeTintColor: '#FF5148'
})


const AppContainer = createAppContainer(createSwitchNavigator(
  {
    Login: LoginStack,
    Home: HomeStack
  }
));

export default class App extends React.Component {
  render() {
    return (
      // <Login /> 
      <AppContainer />
    )
  }
}

//ALL OF CHART

// import React from 'react'
// import { View } from 'react-native'
// import PureChart from 'react-native-pure-chart';
// import { } from 'native-base';

// export default class App extends React.Component {
//   render() {
//     let sampleData = [30, 200, 170, 250, 10]
//     return(
//       <View style={{alignItems: 'center', justifyContent: 'center', alignSelf: 'center', width: 300, height: 300, borderWidth: 1}}>
//         <PureChart data={sampleData} type='line' />
//       </View>
//     )
//   }
// }


