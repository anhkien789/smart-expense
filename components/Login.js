import React, { Component } from 'react';
import { Image, StyleSheet, View, TouchableHighlight, Text, Dimensions } from 'react-native'
import { Container, Header, Content, Form, Item, Input, Label, Footer } from 'native-base';

export default class Login extends Component {

  constructor(props) {
    super(props)
    this.state = { count: 0 }
  }

  onPress = () => {
    this.setState({
      count: this.state.count+1
    })
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
              <Input placeholder='ID:'/>
            </View>
            <View style={styles.passbox}>
              <Input placeholder='Password:'/>
            </View>
            <View style={styles.buttonview}>
              <TouchableHighlight style={styles.signinbutton} onPress={()=> this.props.navigate('Home')} underlayColor="red">
                <Text style={{color: 'white', fontSize: (Dimensions.get('window').height * 1)/14 * (18/60), fontWeight: 'bold', fontFamily: 'Arial Rounded MT Bold'}}>Sign In</Text>
              </TouchableHighlight>
              <TouchableHighlight style={styles.signupbutton} onPress={()=> this.props.navigate('Register')} underlayColor="red">
                <Text style={{color: 'white', fontSize: (Dimensions.get('window').height * 1)/14 * (18/60), fontWeight: 'bold', fontFamily: 'Arial Rounded MT Bold'}}>Sign Up</Text>
              </TouchableHighlight>  
            </View>
          </View>
          <View style={styles.line}/>
          <View style={styles.information}>
            <Text style={{fontSize: (Dimensions.get('window').height * 1)/14 * (12/60), fontStyle: 'italic', fontWeight: 'bold', fontFamily: 'Arial Rounded MT Bold'}} onPress={this.onPress}>Versions</Text>
            <Text style={{fontSize: (Dimensions.get('window').height * 1)/14 * (12/60), fontStyle: 'italic', fontWeight: 'bold', fontFamily: 'Arial Rounded MT Bold'}} onPress={this.onPress}>Terms</Text>
            <Text style={{fontSize: (Dimensions.get('window').height * 1)/14 * (12/60), fontStyle: 'italic', fontWeight: 'bold', fontFamily: 'Arial Rounded MT Bold'}} onPress={this.onPress}>Teams</Text>
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