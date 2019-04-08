import React, { Component } from 'react';
import { Image, StyleSheet, View, TouchableHighlight, Text, TouchableOpacity, Dimensions } from 'react-native'
import { Container, Header, Content, Form, Item, Input, Label, Footer, Icon, Button } from 'native-base';

export default class Register extends Component {

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
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.button} onPress={()=> this.props.navigate('Login')}>
            <Icon name='arrow-back' style={styles.iconarrow}/>
            <Text style={{color: '#007AFF', fontSize: (Dimensions.get('window').height * 1)/14 * (20/60)}}>Back</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.registercontainer}>
            <View>
              <Text style={styles.registertext}>Register</Text>
            </View>
            <View style={styles.idbox}>
              <Input placeholder='ID:'/>
            </View>
            <View style={styles.passbox}>
              <Input placeholder='Password:'/>
            </View>
            <View style={styles.emailbox}>
              <Input placeholder='Email:'/>
            </View>
            <View style={styles.addressbox}>
              <Input placeholder='Address:'/>
            </View>
            <View style={styles.phonebox}>
              <Input placeholder='`Phone:'/>
            </View>
            <View style={styles.buttonview}>
              <TouchableHighlight style={styles.registerbutton} onPress={this.onPress} underlayColor="red">
                <Text style={{color: 'white', fontSize: (Dimensions.get('window').height * 1)/14 * (18/60), fontWeight: 'bold', fontFamily: 'Arial Rounded MT Bold'}}>Register</Text>
              </TouchableHighlight>
              <TouchableHighlight style={styles.resetbutton} onPress={this.onPress} underlayColor="red">
                <Text style={{color: 'white', fontSize: (Dimensions.get('window').height * 1)/14 * (18/60), fontWeight: 'bold', fontFamily: 'Arial Rounded MT Bold'}}>Clear</Text>
              </TouchableHighlight>  
            </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ff5148',
    flexDirection: 'column'
  },
  header: {
    borderWidth: 1,
    borderColor: '#F8F8F8',
    marginTop: (Dimensions.get('window').height * 1)/20,
    height: (Dimensions.get('window').height * 1)/14 * (44/60),
    width: Dimensions.get('window').width,
    backgroundColor: '#F4CBC8',
    flexDirection: 'row',
    alignItems:'center'
  },
  iconarrow: {
    color: '#007AFF'
  },
  button: {
    height: (Dimensions.get('window').height * 1)/14 * (44/60),
    width: (Dimensions.get('window').height * 1)/14 * (70/60),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  registercontainer: {
    backgroundColor: 'white',
    flexDirection: 'column',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: (Dimensions.get('window').height * 1)/14 * (18/60),
    marginTop: (Dimensions.get('window').height * 1)/14 * (30/60),
    height: (Dimensions.get('window').height * 1)/14 * (600/60),
    width: (Dimensions.get('window').height * 1)/14 * (320/60),
    shadowColor: '#000000',
    shadowOffset: { width: 4, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 10
  },
  registertext: {
    fontWeight: 'bold',
    fontSize: (Dimensions.get('window').height * 1)/14 * (30/60),
    fontFamily: 'Arial Rounded MT Bold',
    shadowColor: '#000000',
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 0.2,
    marginTop: (Dimensions.get('window').height * 1)/14 * (20/60)
  },
  idbox: {
    marginTop: (Dimensions.get('window').height * 1)/14 * (28/60),
    width: (Dimensions.get('window').height * 1)/14 * (280/60),
    height: (Dimensions.get('window').height * 1)/14 * (50/60),
    borderColor: '#979797',
    borderWidth: 1,
    borderRadius: (Dimensions.get('window').height * 1)/14 * (18/60)
  },
  passbox: {
    marginTop: (Dimensions.get('window').height * 1)/14 * (28/60),
    width: (Dimensions.get('window').height * 1)/14 * (280/60),
    height: (Dimensions.get('window').height * 1)/14 * (50/60),
    borderColor: '#979797',
    borderWidth: 1,
    borderRadius: (Dimensions.get('window').height * 1)/14 * (18/60)
  },
  emailbox: {
    marginTop: (Dimensions.get('window').height * 1)/14 * (28/60),
    width: (Dimensions.get('window').height * 1)/14 * (280/60),
    height: (Dimensions.get('window').height * 1)/14 * (50/60),
    borderColor: '#979797',
    borderWidth: 1,
    borderRadius: (Dimensions.get('window').height * 1)/14 * (18/60)
  },
  addressbox: {
    marginTop: (Dimensions.get('window').height * 1)/14 * (28/60),
    width: (Dimensions.get('window').height * 1)/14 * (280/60),
    height: (Dimensions.get('window').height * 1)/14 * (50/60),
    borderColor: '#979797',
    borderWidth: 1,
    borderRadius: (Dimensions.get('window').height * 1)/14 * (18/60)
  },
  phonebox: {
    marginTop: (Dimensions.get('window').height * 1)/14 * (28/60),
    width: (Dimensions.get('window').height * 1)/14 * (280/60),
    height: (Dimensions.get('window').height * 1)/14 * (50/60),
    borderColor: '#979797',
    borderWidth: 1,
    borderRadius: (Dimensions.get('window').height * 1)/14 * (18/60)
  },
  buttonview: {
    flexDirection: 'row',
    marginTop: (Dimensions.get('window').height * 1)/14 * (30/60),
    width: (Dimensions.get('window').height * 1)/14 * (280/60),
    height: (Dimensions.get('window').height * 1)/14 * (50/60),
    justifyContent: 'space-between'
  },
  registerbutton: {
    borderWidth: 1,
    borderRadius: (Dimensions.get('window').height * 1)/14 * (18/60),
    borderColor: '#979797',
    width: (Dimensions.get('window').height * 1)/14 * (130/60),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ff5148',
    shadowColor: '#000000',
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 0.2
  },
  resetbutton: {
    borderWidth: 1,
    borderRadius: (Dimensions.get('window').height * 1)/14 * (18/60),
    borderColor: '#979797',
    width: (Dimensions.get('window').height * 1)/14 * (130/60),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ff5148',
    shadowColor: '#000000',
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 0.2
  }
})