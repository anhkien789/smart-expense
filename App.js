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
var newNumber = 0

class LoginScreen extends React.Component {
  render() {
    const {navigate} = this.props.navigation;
    return (
      <Login navigate={navigate} />
    );
  }
}

class RegisterScreen extends React.Component {

  render() {
    const {navigate} = this.props.navigation;
    return(
      <Register navigate={navigate}/>
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
    const number = navigation.getParam('number', 'No-number') 
    idUser = userId
    addressUser = address
    incomeUser = income
    phoneUser = phone
    savingUser = saving
    nameUser = userName
    newStatus = status
    newCategory = category
    newMoney = money
    newNumber = number
    return(
      <Home 
        navigation={navigation} 
        userId = {JSON.stringify(userId)}
        newStatus = {JSON.stringify(newStatus)}
        newMoney = {JSON.stringify(newMoney)}
        newCategory = {JSON.stringify(newCategory)}
        income = {JSON.stringify(incomeUser)}
        saving = {JSON.stringify(savingUser)}
        newNumber = {JSON.stringify(newNumber)}
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
    drawerLabel: 'History',
    drawerIcon: ({tintColor}) => (
      <Icon name='timer' style={{color: tintColor}}/>
    )
  };

  render() {
    const {navigation} = this.props;
    return(
      <History navigation={navigation} userId = {JSON.stringify(idUser)}/>
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
    const {navigation} = this.props;
    return(
      <StatisticPage navigation={navigation} userId = {JSON.stringify(idUser)} income = {JSON.stringify(incomeUser)}/>
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
      <AppContainer />
    )
  }
}
