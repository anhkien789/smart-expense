//NAVIGATOR

import React from 'react'
import { View, Text, Image, StyleSheet, Button, TouchableOpacity, Alert } from "react-native";
import AsyncStorage from '@react-native-community/async-storage'
import {createStackNavigator, createAppContainer, createBottomTabNavigator, createSwitchNavigator, createDrawerNavigator, DrawerItems, SafeAreaView} from 'react-navigation';
import { Icon, DatePicker } from 'native-base';
import Voice from 'react-native-voice'

import Login from './components/Login.js'
import Register from './components/Register.js'
import Home from './components/Home.js'
import Profile from './components/Profile.js'
import History from './components/History.js'
import InfoPage from './components/InfoPage.js'
import StatisticPage from './components/StatisticPage.js'

var idUser = ''
var addressUser = ''
var incomeUser = 0
var phoneUser = ''
var savingUser = 0
var nameUser = ''
var newStatus = ''
var newCategory = ''
var newMoney = ''

class LoginScreen extends React.Component {
  // static navigationOptions = {
  //   drawerLabel: 'Log out',
  //   drawerIcon: ({ tintColor }) => (
  //     <Icon name='log-out'/>
  //   )
  // };
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
    drawerLabel: 'Home',
    drawerIcon: ({tintColor}) => (
      <Icon name='home' style={{color: tintColor}}/>
    )
  };

  render() {
    const { navigation } = this.props;
    const userId = navigation.getParam('userId', 'No-Id')
    const address = navigation.getParam('address', 'No-address')
    const income = navigation.getParam('income', 'No-income')
    const phone = navigation.getParam('phone', 'No-phone')
    const saving = navigation.getParam('saving', 'No-saving')
    const userName = navigation.getParam('userName', 'No-userName')
    const status = navigation.getParam('status', 'No-status')
    const category = navigation.getParam('category', 'No-category')
    const money = navigation.getParam('money', 'No-money') 
    idUser = userId
    addressUser = address
    incomeUser = income
    phoneUser = phone
    savingUser = saving
    nameUser = userName
    newStatus = status
    newCategory = category
    newMoney = money
    return(
      <Home 
        navigation={navigation} 
        userId = {JSON.stringify(userId)}
        newStatus = {JSON.stringify(newStatus)}
        newMoney = {JSON.stringify(newMoney)}
        newCategory = {JSON.stringify(newCategory)}
      />
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
      <Profile 
        navigation={navigation}
        userId = {JSON.stringify(idUser)}
        address = {JSON.stringify(addressUser)}
        income = {JSON.stringify(incomeUser)}
        phone = {JSON.stringify(phoneUser)}
        saving = {JSON.stringify(savingUser)}
        userName = {JSON.stringify(nameUser)}
      />
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

class StatisticScreen extends React.Component{
  static navigationOptions = {
    drawerLabel: 'Statistic',
    drawerIcon: ({tintColor}) => (
      <Icon name='analytics' style={{color: tintColor}}/>
    )
  };
  render() {
    const {navigate} = this.props.navigation;
    return(
      <StatisticPage/>
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
  Statistic: {screen: StatisticScreen}
  // Login: {screen: LoginScreen}
},
{
  contentComponent:(props) => (
    <View style={{flex:1}}>
        <SafeAreaView forceInset={{ top: 'always', horizontal: 'never' }}>
          <DrawerItems {...props} />
          <TouchableOpacity style={{flexDirection: 'row', alignItems:'center'}} onPress={()=>
            Alert.alert(
              'Log out',
              'Do you want to logout?',
              [
                {text: 'Cancel', onPress: () => {return null}},
                {text: 'Confirm', onPress: 
                () => {
                  Voice.cancel()
                  .then(
                  )
                  .then(
                    // AsyncStorage.clear()
                    AsyncStorage.getAllKeys().then(AsyncStorage.multiRemove)
                  )
                  .then(props.navigation.navigate('Login'))
                }
                },
              ],
              { cancelable: false }
            )  
          }>
            <Icon style={{marginLeft: 18}} name='log-out'/>
            <Text style={{marginLeft: 30,fontWeight: 'bold',color: 'black'}}>Logout</Text>
          </TouchableOpacity>
        </SafeAreaView>
    </View>
  ),
  drawerOpenRoute: 'DrawerOpen',
  drawerCloseRoute: 'DrawerClose',
  drawerToggleRoute: 'DrawerToggle'
}
)


const AppContainer = createAppContainer(createSwitchNavigator(
  {
    LoginPage: LoginStack,
    HomePage: HomeStack
  }
));

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {userId: ''}
  }

  handleLogout(props) {
    Voice.cancel()
    .then(AsyncStorage.clear())
    .then(props.navigation.navigate('Login'))
  }

  render() {
    return (
      // <Login /> 
      <AppContainer />
    )
  }
}

// //ALL OF CHART

// // import React from 'react'
// // import { View } from 'react-native'
// // import PureChart from 'react-native-pure-chart';
// // import { } from 'native-base';

// // export default class App extends React.Component {
// //   render() {
// //     let sampleData = [30, 200, 170, 250, 10]
// //     return(
// //       <View style={{alignItems: 'center', justifyContent: 'center', alignSelf: 'center', width: 300, height: 300, borderWidth: 1}}>
// //         <PureChart data={sampleData} type='line' />
// //       </View>
// //     )
// //   }
// // }


