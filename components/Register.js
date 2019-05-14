import React, { Component } from 'react';
import { StyleSheet, View, TouchableHighlight, Text, TouchableOpacity, Dimensions, Alert } from 'react-native'
import { Input, Icon } from 'native-base';

export default class Register extends Component {

  constructor(props) {
    super(props)
    this.state = { 
      userName: '', passWord: '', income: null, address: '', phone: '', saving: null, messages: []
    }
  }

  handleRegister() {
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
    } 
    else if (this.state.saving < 20 || isNaN(this.state.saving)) {
      Alert.alert('Error'
      , 'Enter saving amount,20% by default',
      [
        {
          text: 'OK',
          onPress: () => this.setState({saving: null})
        }
      ]
      ) 
    }
    else {
      fetch('https://smartexpenseeeee.herokuapp.com/signup', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userName: this.state.userName,
          passWord: this.state.passWord,
          income: this.state.income,
          address: this.state.address,
          phone: this.state.phone,
          saving: this.state.saving
        })
      })
      .then(response => response.json())
      .then(messages => messages.message == 'Signup successfull!!' ? 
        Alert.alert('Success'
                  , 'Registered successfully',
                  [
                    {
                      text: 'OK',
                      onPress: () => this.props.navigate('Login')
                    }
                  ]
        ) 
        : this.setState({messages})
      )
      .catch(err => console.error('error fetching data', err))
    }
  }

  handleClear() {
    this.setState({userName: '', passWord: '', income: null, address: '', phone: '', saving: null,messages: []})
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.button} onPress={()=> this.props.navigate('Login')}>
            <Icon name='arrow-back' style={styles.iconarrow}/>
            <Text style={{color: 'black', fontSize: (Dimensions.get('window').height * 1)/14 * (20/60)}}>Back</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.registercontainer}>
            <View>
              <Text style={styles.registertext}>Register</Text>
            </View>
            <View style={styles.idbox}>
              <Input placeholder='Username:' onChangeText={(s)=> this.setState({userName: s})} value={this.state.userName}/>
            </View>
            <View style={styles.erroridbox}>
              {this.state.messages.message == 'Username exsit, please enter other one' ?
                (<Text style={{color: 'red', fontSize: (Dimensions.get('window').height * 1)/14 * (18/60), fontWeight: 'bold', fontFamily: 'Arial Rounded MT Bold'}}>Existing Username!</Text>) :
                (<Text/>)
              }
            </View>
            <View style={styles.passbox}>
              <Input placeholder='Password:' secureTextEntry={true} onChangeText={(s)=> this.setState({passWord: s})} value={this.state.passWord}/>
            </View>
            <View style={styles.incomebox}>
              <Input placeholder='Income:' onChangeText={(s)=> this.setState({income: s})} value={this.state.income}/>
              {this.state.messages._message == 'User validation failed' ? 
                this.state.messages.errors.income == null ? (<Text/>) : this.state.messages.errors.income.path == 'income' ? (<Icon name='alert' style={{width: 30, color: 'red'}}/>) : (<Text/>) : (<Text/>)}
            </View>
            <View style={styles.addressbox}>
              <Input placeholder='Address:' onChangeText={(s)=> this.setState({address: s})} value={this.state.address}/>
              {this.state.messages._message == 'User validation failed' ? 
                this.state.messages.errors.address == null ? (<Text/>) : this.state.messages.errors.address.path == 'address' ? (<Icon name='alert' style={{width: 30, color: 'red'}}/>) : (<Text/>) : (<Text/>)}
            </View>
            <View style={styles.phonebox}>
              <Input placeholder='Phone:' onChangeText={(s)=> this.setState({phone: s})} value={this.state.phone}/>
              {this.state.messages._message == 'User validation failed' ? 
                this.state.messages.errors.phone == null ? (<Text/>) : this.state.messages.errors.phone.path == 'phone' ? (<Icon name='alert' style={{width: 30, color: 'red'}}/>) : (<Text/>) : (<Text/>)}
            </View>
            <View style={styles.savingbox}>
              <Input placeholder='Saving:' onChangeText={(s)=> this.setState({saving: s})} value={this.state.saving}/>
              {this.state.messages._message == 'User validation failed' ? 
                this.state.messages.errors.saving == null ? (<Text/>) : this.state.messages.errors.saving.path == 'saving' ? (<Icon name='alert' style={{width: 30, color: 'red'}}/>) : (<Text/>) : (<Text/>)}
            </View>
            <View style={styles.buttonview}>
              <TouchableHighlight style={styles.registerbutton} onPress={this.handleRegister.bind(this)} underlayColor="red">
                <Text style={{color: 'white', fontSize: (Dimensions.get('window').height * 1)/14 * (18/60), fontWeight: 'bold', fontFamily: 'Arial Rounded MT Bold'}}>Register</Text>
              </TouchableHighlight>
              <TouchableHighlight style={styles.resetbutton} onPress={this.handleClear.bind(this)} underlayColor="red">
                <Text style={{color: 'white', fontSize: (Dimensions.get('window').height * 1)/14 * (18/60), fontWeight: 'bold', fontFamily: 'Arial Rounded MT Bold'}}>Clear</Text>
              </TouchableHighlight>  
            </View>
            <View style={styles.errortext}>
              {this.state.messages.message == 'Username exsit, please enter other one' ? 
                (<Text style={{color: 'red', fontSize: (Dimensions.get('window').height * 1)/14 * (18/60), fontWeight: 'bold', fontFamily: 'Arial Rounded MT Bold'}}></Text>) : 
                this.state.messages._message == 'User validation failed' ? 
                (<Text style={{color: 'red', fontSize: (Dimensions.get('window').height * 1)/14 * (18/60), fontWeight: 'bold', fontFamily: 'Arial Rounded MT Bold'}}>Lack of information above</Text>) : 
                (<Text style={{color: 'red', fontSize: (Dimensions.get('window').height * 1)/14 * (18/60), fontWeight: 'bold', fontFamily: 'Arial Rounded MT Bold'}}></Text>)}
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
    flexDirection: 'column',
    alignItems: 'center'
  },
  header: {
    borderWidth: 1,
    borderColor: '#FF948F',
    marginTop: (Dimensions.get('window').height * 1)/20,
    height: (Dimensions.get('window').height * 1)/14 * (44/60),
    width: Dimensions.get('window').width,
    backgroundColor: '#FF948F',
    flexDirection: 'row',
    alignItems:'center'
  },
  iconarrow: {
    color: 'black'
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
    borderRadius: (Dimensions.get('window').height * 1)/14 * (18/60),
    marginTop: (Dimensions.get('window').height * 1)/14 * (30/60),
    height: (Dimensions.get('window').height * 1)/14 * (670/60),
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
    marginTop: (Dimensions.get('window').height * 1)/14 * (15/60),
    width: (Dimensions.get('window').height * 1)/14 * (280/60),
    height: (Dimensions.get('window').height * 1)/14 * (50/60),
    borderColor: '#979797',
    borderWidth: 1,
    borderRadius: (Dimensions.get('window').height * 1)/14 * (18/60)
  },
  incomebox: {
    marginTop: (Dimensions.get('window').height * 1)/14 * (28/60),
    width: (Dimensions.get('window').height * 1)/14 * (280/60),
    height: (Dimensions.get('window').height * 1)/14 * (50/60),
    borderColor: '#979797',
    borderWidth: 1,
    borderRadius: (Dimensions.get('window').height * 1)/14 * (18/60),
    flexDirection: 'row',
    alignItems: 'center'
  },
  addressbox: {
    marginTop: (Dimensions.get('window').height * 1)/14 * (28/60),
    width: (Dimensions.get('window').height * 1)/14 * (280/60),
    height: (Dimensions.get('window').height * 1)/14 * (50/60),
    borderColor: '#979797',
    borderWidth: 1,
    borderRadius: (Dimensions.get('window').height * 1)/14 * (18/60),
    flexDirection: 'row',
    alignItems: 'center'
  },
  phonebox: {
    marginTop: (Dimensions.get('window').height * 1)/14 * (28/60),
    width: (Dimensions.get('window').height * 1)/14 * (280/60),
    height: (Dimensions.get('window').height * 1)/14 * (50/60),
    borderColor: '#979797',
    borderWidth: 1,
    borderRadius: (Dimensions.get('window').height * 1)/14 * (18/60),
    flexDirection: 'row',
    alignItems: 'center'
  },
  savingbox: {
    marginTop: (Dimensions.get('window').height * 1)/14 * (28/60),
    width: (Dimensions.get('window').height * 1)/14 * (280/60),
    height: (Dimensions.get('window').height * 1)/14 * (50/60),
    borderColor: '#979797',
    borderWidth: 1,
    borderRadius: (Dimensions.get('window').height * 1)/14 * (18/60),
    flexDirection: 'row',
    alignItems: 'center'
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
  },
  errortext: {
    marginTop: (Dimensions.get('window').height * 1)/14 * (20/60),
    width: (Dimensions.get('window').height * 1)/14 * (280/60),
    height: (Dimensions.get('window').height * 1)/14 * (50/60)
  },
  erroridbox: {
    width: (Dimensions.get('window').height * 1)/14 * (280/60),
    marginTop: (Dimensions.get('window').height * 1)/14 * (5/60)
  }
})