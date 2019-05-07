import React, { Component } from 'react';
import { Image, StyleSheet, View, TouchableHighlight, Text, Dimensions, Alert,TouchableOpacity } from 'react-native'
import { Container, Header, Content, Form, Item, Input, Label, Footer } from 'native-base';

export default class Login extends Component {

  constructor(props) {
    super(props)
    this.state = { 
      userName: '', passWord: '', messages: []
    }
  }

  handleLogin() {
    if (this.state.userName == '' || this.state.passWord == '') {
      // this.setState({messages: 'Please input the Username/Password'})
      Alert.alert('Error'
      , 'Please input the Username/Password',
      [
        {
          text: 'OK',
        }
      ]
      ) 
    } else {
      fetch('https://smartexpenseeeee.herokuapp.com/login', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userName: this.state.userName,
          passWord: this.state.passWord
        })
      })
      .then(response => response.json())
      // .then(messages => console.log(messages))
      .then(messages => messages.message == 'Invalid, please try again' ? 
        Alert.alert('Error'
        , 'Invalid! Please try again!',
        [
          {
            text: 'OK',
            onPress: () => this.setState({userName: '', passWord: ''})
          }
        ]
        ) 
        // this.setState({messages: 'something wrong'})
        : this.props.navigate('Home', {
          userId: messages._id,
          address: messages.address,
          income: messages.income,
          phone: messages.phone,
          saving: messages.saving,
          userName: messages.userName,
          status: '',
          category: '',
          money: ''
        })
        // : console.log(messages._id)
      )
      .catch(err => console.error('error fetching data', err))
    }
  }
  render() {
    return (
      <Container style={styles.container}>
        <Content>
          <View style={styles.imageposition}>
            <Image style={styles.image} source={require('./Smartexpense-Logo.png')}/>
          </View>
          <View style={styles.containerlogin}>
            <View>
              <Text style={styles.logintext}>Login</Text>
            </View>
            <View style={styles.idbox}>
              <Input placeholder='Username:' onChangeText={(s)=> this.setState({userName: s})} value={this.state.userName}/>
            </View>
            <View style={styles.passbox}>
              <Input placeholder='Password:' secureTextEntry={true} onChangeText={(s)=> this.setState({passWord: s})} value={this.state.passWord}/>
            </View>
            <View style={styles.buttonview}>
              <TouchableHighlight style={styles.signinbutton} onPress={this.handleLogin.bind(this)} underlayColor="red">
                <Text style={{color: 'white', fontSize: (Dimensions.get('window').height * 1)/14 * (18/60), fontWeight: 'bold', fontFamily: 'Arial Rounded MT Bold'}}>Sign In</Text>
              </TouchableHighlight>
              <TouchableHighlight style={styles.signupbutton} onPress={()=> this.props.navigate('Register')} underlayColor="red">
                <Text style={{color: 'white', fontSize: (Dimensions.get('window').height * 1)/14 * (18/60), fontWeight: 'bold', fontFamily: 'Arial Rounded MT Bold'}}>Sign Up</Text>
              </TouchableHighlight>  
            </View>
            <View style={styles.errortext}>
              <Text style={{color: 'red', fontSize: (Dimensions.get('window').height * 1)/14 * (18/60), fontWeight: 'bold', fontFamily: 'Arial Rounded MT Bold'}}>{this.state.messages}</Text>
            </View>
          </View>
          <View style={styles.line}/>
          <View style={styles.information}>
            <TouchableOpacity style={{borderBottomWidth: 1, borderBottomColor: 'blue'}}>
              <Text style={{fontSize: (Dimensions.get('window').height * 1)/14 * (12/60), fontStyle: 'italic', fontWeight: 'bold', fontFamily: 'Arial Rounded MT Bold', color: 'blue'}}>Versions: 1.0.0</Text>
            </TouchableOpacity>
            {/* <Text style={{fontSize: (Dimensions.get('window').height * 1)/14 * (12/60), fontStyle: 'italic', fontWeight: 'bold', fontFamily: 'Arial Rounded MT Bold', color: 'blue'}}>Versions: 1.0.0</Text> */}
            {/* <Text style={{fontSize: (Dimensions.get('window').height * 1)/14 * (12/60), fontStyle: 'italic', fontWeight: 'bold', fontFamily: 'Arial Rounded MT Bold', color: 'blue'}} onPress={()=> this.props.navigate('Info')}>Team: Section 9</Text> */}
            <TouchableOpacity style={{borderBottomWidth: 1, borderBottomColor: 'blue'}} onPress={()=> this.props.navigate('Info')}>
              <Text style={{fontSize: (Dimensions.get('window').height * 1)/14 * (12/60), fontStyle: 'italic', fontWeight: 'bold', fontFamily: 'Arial Rounded MT Bold', color: 'blue'}}>Team: Section 9</Text>
            </TouchableOpacity>
          </View>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ff5148',
    flexDirection: 'column'
  },
  image: {
    height: (Dimensions.get('window').height * 1)/14 * (250/60),
    width: (Dimensions.get('window').height * 1)/14 * (250/60),
  },
  imageposition: {
    alignItems: 'center',
    shadowColor: '#000000',
    shadowOffset: { width: 10, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 1,
    marginTop: (Dimensions.get('window').height * 1)/20 
    // marginTop: 60
  },
  containerlogin: {
    flexDirection: 'column',
    backgroundColor: 'white',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: (Dimensions.get('window').height * 1)/28, //30
    borderRadius: (Dimensions.get('window').height * 1)/14 * (18/60),
    height: (Dimensions.get('window').height * 6)/14, //350
    width: (Dimensions.get('window').height * 1)/14 * (250/60), //250
    shadowColor: '#000000',
    shadowOffset: { width: 4, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 1
  },
  logintext: {
    fontWeight: 'bold',
    fontSize: (Dimensions.get('window').height * 1)/28,
    fontFamily: 'Arial Rounded MT Bold',
    shadowColor: '#000000',
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 0.2
  },
  idbox: {
    marginTop: (Dimensions.get('window').height * 1)/28,
    width: (Dimensions.get('window').height * 1)/14 * (230/60),
    height: (Dimensions.get('window').height * 1)/14 * (50/60),
    borderColor: '#979797',
    borderWidth: 1,
    borderRadius: (Dimensions.get('window').height * 1)/14 * (18/60)
  },
  passbox: {
    marginTop: (Dimensions.get('window').height * 1)/56,
    width: (Dimensions.get('window').height * 1)/14 * (230/60),
    height: (Dimensions.get('window').height * 1)/14 * (50/60),
    borderColor: '#979797',
    borderWidth: 1,
    borderRadius: (Dimensions.get('window').height * 1)/14 * (18/60)
  },
  errortext: {
    marginTop: (Dimensions.get('window').height * 1)/14 * (20/60),
    width: (Dimensions.get('window').height * 1)/14 * (230/60),
    height: (Dimensions.get('window').height * 1)/14 * (50/60)
  },
  buttonview: {
    flexDirection: 'row',
    marginTop: (Dimensions.get('window').height * 1)/28,
    width: (Dimensions.get('window').height * 1)/14 * (230/60),
    height: (Dimensions.get('window').height * 1)/14 * (50/60),
    justifyContent: 'space-between'
  },
  signinbutton: {
    borderWidth: 1,
    borderRadius: (Dimensions.get('window').height * 1)/14 * (18/60),
    borderColor: '#979797',
    width: (Dimensions.get('window').height * 1)/14 * (110/60),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ff5148',
    shadowColor: '#000000',
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 0.2
  },
  signupbutton: {
    borderWidth: 1,
    borderRadius: (Dimensions.get('window').height * 1)/14 * (18/60),
    borderColor: '#979797',
    width: (Dimensions.get('window').height * 1)/14 * (110/60),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ff5148',
    shadowColor: '#000000',
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 0.2
  },
  line: {
    alignItems: 'center',
    alignSelf: 'center',
    borderWidth: 0.5,
    borderColor: '#FFFFFF',
    marginTop: (Dimensions.get('window').height * 1)/14 * (50/60),
    width: (Dimensions.get('window').height * 1)/14 * (230/60)
  },
  information: {
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: (Dimensions.get('window').height * 1)/14 * (230/60),
    height: (Dimensions.get('window').height * 1)/14 * (20/60)
  }
})