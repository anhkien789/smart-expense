import React from 'react';
import { Image, StyleSheet, View, TouchableHighlight, Text, TouchableOpacity, Dimensions, Alert } from 'react-native'
import { Container, Header, Content, Form, Item, Input, Label, Footer, Icon, DatePicker } from 'native-base';
import ImagePicker from 'react-native-image-picker'


export default class Profile extends React.Component {

  constructor() {
    super()
    this.state = { 
      photo: null, 
      editAdress: false, 
      editPhone: false, 
      editPassword: false,
      editIncome: false,
      editSaving: false, 
      addressText: '', 
      phoneText: '', 
      passwordText: '',
      incomeText: '',
      savingText: '',
      showAddress: '',
      showPhone: '',
      showIncome: 0,
      showSaving: 0,
      errorSaving: ''
    }
  }
  // state = {
  //   photo: null
  // }

  componentDidMount() {
    this.setState({
      showAddress: JSON.parse(this.props.address),
      showPhone: JSON.parse(this.props.phone),
      showIncome: JSON.parse(this.props.income),
      showSaving: JSON.parse(this.props.saving)
    })
  }

  handleChoosePhoto = () => {
    const options = {
      noData: true
    }
    ImagePicker.launchImageLibrary(options, response => {
      console.log("response", response)
      if (response.uri) {
        this.setState({ photo: response})
      }
    })
  }

  handleEditAddress() {
    this.setState({editAdress: true})
  }

  handleSaveAddress() {
    if (this.state.addressText == '') {
      this.setState({editAdress: false})  
    } else {
      Alert.alert('Do you want to save it?'
      , '',
      [
        {
          text: 'Save',
          onPress: () => {
            fetch(`https://smartexpenseeeee.herokuapp.com/updateOthers/${JSON.parse(this.props.userId)}`, {
              method: 'PUT',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                address: this.state.addressText
              })
            })
            .then(this.setState({
              editAdress: false,
              showAddress: this.state.addressText,
              addressText: ''
            }))
            .catch(err => console.error('error fetching data', err))
          }
        },
        {
          text: 'Deny',
          onPress: () => this.setState({editAdress: false})
        }
      ]
      )
    }
  }

  handleEditPhone() {
    this.setState({editPhone: true})
  }

  handleSavePhone() {
    if (this.state.phoneText == '') {
      this.setState({editPhone: false})  
    } else {
      Alert.alert('Do you want to save it?'
      , '',
      [
        {
          text: 'Save',
          onPress: () => {
            fetch(`https://smartexpenseeeee.herokuapp.com/updateOthers/${JSON.parse(this.props.userId)}`, {
              method: 'PUT',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                phone: this.state.phoneText
              })
            })
            .then(this.setState({
              editPhone: false,
              showPhone: this.state.phoneText,
              phoneText: ''
            }))
            .catch(err => console.error('error fetching data', err))
          }
        },
        {
          text: 'Deny',
          onPress: () => this.setState({editPhone: false})
        }
      ]
      )
    }
  }

  handleEditPassword() {
    this.setState({editPassword: true})
  }

  handleSavePassword() {
    if (this.state.passwordText == '') {
      this.setState({editPassword: false})  
    } else {
      Alert.alert('Do you want to save it?'
      , '',
      [
        {
          text: 'Save',
          onPress: () => {
            fetch(`https://smartexpenseeeee.herokuapp.com/updatePassword/${JSON.parse(this.props.userId)}`, {
              method: 'PUT',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                passWord: this.state.passwordText
              })
            })
            .then(this.setState({
              editPassword: false,
              passwordText: ''
            }))
            .catch(err => console.error('error fetching data', err))
          }
        },
        {
          text: 'Deny',
          onPress: () => this.setState({editPassword: false})
        }
      ]
      )
    }
  }

  handleEditIncome() {
    this.setState({editIncome: true})
  }

  handleSaveIncome() {
    if (this.state.incomeText == '') {
      this.setState({editIncome: false})  
    } else {
      Alert.alert('Do you want to save it?'
      , '',
      [
        {
          text: 'Save',
          onPress: () => {
            fetch(`https://smartexpenseeeee.herokuapp.com/updateOthers/${JSON.parse(this.props.userId)}`, {
              method: 'PUT',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                income: this.state.incomeText
              })
            })
            .then(this.setState({
              editIncome: false,
              showIncome: this.state.incomeText,
              incomeText: ''
            }))
            .catch(err => console.error('error fetching data', err))
          }
        },
        {
          text: 'Deny',
          onPress: () => this.setState({editIncome: false})
        }
      ]
      )
    }
  }

  handleEditSaving() {
    this.setState({editSaving: true})
  }

  handleSaveSaving() {
    if (this.state.savingText == '') {
      this.setState({editSaving: false})  
    } else {
      Alert.alert('Do you want to save it?'
      , '',
      [
        {
          text: 'Save',
          onPress: () => {
            fetch(`https://smartexpenseeeee.herokuapp.com/updateOthers/${JSON.parse(this.props.userId)}`, {
              method: 'PUT',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                saving: this.state.savingText
              })
            })
            .then(response => response.json())
            .then(response => response.message == 'The saving cannot be less than 20% or more than 100% please enter again !!' ?
            this.setState({
              errorSaving: 'Error: Saving have to more than 20%',
              editSaving: false,
              savingText: ''
            })
            :
            this.setState({
              editSaving: false,
              showSaving: this.state.savingText,
              savingText: '',
              errorSaving: ''
            })
            )
            // .then(this.setState({
            //   editSaving: false,
            //   showSaving: this.state.savingText,
            //   savingText: ''
            // }))
            .catch(err => console.error('error fetching data', err))
          }
        },
        {
          text: 'Deny',
          onPress: () => this.setState({editSaving: false})
        }
      ]
      )
    }
  }

  

  render() {
    // const {photo} = this.state
    return(
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.viewmenuprofile}>
            <TouchableOpacity style={styles.button} onPress={()=> this.props.navigation.openDrawer()}>
              <Icon name='menu' style={styles.iconmenu}/>
            </TouchableOpacity>
            <View style={styles.textprofile}>
              <Text style={{fontSize: (Dimensions.get('window').height * 1)/14 * (22/60), fontWeight: 'bold', fontFamily: 'Arial Rounded MT Bold',color: '#F8F8F8'}}>Profile</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.viewimage} onPress={this.handleChoosePhoto}>
            {this.state.photo == null ? (<Image style= {{width: (Dimensions.get('window').height * 1)/14 * (135/60), height: (Dimensions.get('window').height * 1)/14 * (135/60)}} source={require('./user-default-image.png')}/>) : (
              <Image
                source={{uri: this.state.photo.uri}}
                style={{width: (Dimensions.get('window').height * 1)/14 * (135/60), height: (Dimensions.get('window').height * 1)/14 * (135/60), borderRadius: (Dimensions.get('window').height * 1)/14 * (67/60)}}
              />
            )}
          </TouchableOpacity>
          <View style={styles.viewname}>
            <Text style={{fontSize: (Dimensions.get('window').height * 1)/14 * (40/60), fontFamily: 'Savoye LET', color: '#F8F8F8'}}>{JSON.parse(this.props.userName)}</Text>
          </View>
          <View style={styles.viewaddress}>
            {this.state.editAdress == false ? 
            ( 
              <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                <Icon name='home' style={{color: '#F8F8F8', width: (Dimensions.get('window').height * 1)/14 * (30/60)}}/>
                <Text style={{fontSize: (Dimensions.get('window').height * 1)/14 * (15/60), fontFamily: 'Arial Rounded MT Bold', color: '#F8F8F8', width: 150, textAlign: 'center'}}>{this.state.showAddress}</Text>
                <TouchableOpacity style= {{borderWidth: 1, borderColor: 'white'}} onPress={this.handleEditAddress.bind(this)}>
                  <Text style={{color: 'white'}}>Edit</Text>
                </TouchableOpacity>
              </View>
            ) 
            : 
            (
              <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                <Icon name='home' style={{color: '#F8F8F8', width: (Dimensions.get('window').height * 1)/14 * (30/60)}}/>
                <View>
                  <Input 
                    placeholder = 'Type here to change address' 
                    placeholderTextColor = 'rgba(255, 148, 143, 1.0)' 
                    style={{fontSize: (Dimensions.get('window').height * 1)/14 * (15/60), fontFamily: 'Arial Rounded MT Bold', borderWidth: 1, borderRadius: 18, borderColor: '#F8F8F8', color: '#F8F8F8', width:250}}
                    onChangeText={(s)=> this.setState({addressText: s})} value={this.state.addressText} 
                  />
                </View>
                <TouchableOpacity style= {{borderWidth: 1, borderColor: 'white', marginLeft: 5}} onPress={this.handleSaveAddress.bind(this)}>
                  <Text style={{color: 'white'}}>Save</Text>
                </TouchableOpacity> 
              </View>
            )
            }
          </View>
          <View style={styles.viewphone}>
            {this.state.editPhone == false ? 
            ( 
              <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                <Icon name='phone-portrait' style={{color: '#F8F8F8', width: (Dimensions.get('window').height * 1)/14 * (30/60)}}/>
                <Text style={{fontSize: (Dimensions.get('window').height * 1)/14 * (15/60), fontFamily: 'Arial Rounded MT Bold', color: '#F8F8F8', width: 150, textAlign: 'center'}}>{this.state.showPhone}</Text>
                <TouchableOpacity style= {{borderWidth: 1, borderColor: 'white'}} onPress={this.handleEditPhone.bind(this)}>
                  <Text style={{color: 'white'}}>Edit</Text>
                </TouchableOpacity>
              </View>
            ) 
            : 
            (
              <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                <Icon name='phone-portrait' style={{color: '#F8F8F8', width: (Dimensions.get('window').height * 1)/14 * (30/60)}}/>
                <View>
                  <Input 
                    placeholder = 'Type here to change phone' 
                    placeholderTextColor = 'rgba(255, 148, 143, 1.0)' 
                    style={{fontSize: (Dimensions.get('window').height * 1)/14 * (15/60), fontFamily: 'Arial Rounded MT Bold', borderWidth: 1, borderRadius: 18, borderColor: '#F8F8F8', color: '#F8F8F8', width:250}}
                    onChangeText={(s)=> this.setState({phoneText: s})} value={this.state.phoneText} 
                  />
                </View>
                <TouchableOpacity style= {{borderWidth: 1, borderColor: 'white', marginLeft: 5}} onPress={this.handleSavePhone.bind(this)}>
                  <Text style={{color: 'white'}}>Save</Text>
                </TouchableOpacity> 
              </View>
            )
            }
          </View>
        </View>
        <View style={styles.content}>
          <View style={styles.changepasswordview}>
            {this.state.editPassword == false ?
            (
              <TouchableOpacity style={styles.changepassword} onPress={this.handleEditPassword.bind(this)}>
                <Text style={{fontSize: (Dimensions.get('window').height * 1)/14 * (23/60), fontWeight: 'bold', fontFamily: 'Arial Rounded MT Bold'}}>Change Password</Text>
              </TouchableOpacity>
            )
            : 
            (
              <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                <View style={{height: (Dimensions.get('window').height * 1)/14 * (32/60) }}>
                  <Input 
                    placeholder = 'Type here to change password'
                    secureTextEntry={true} 
                    style={{fontSize: (Dimensions.get('window').height * 1)/14 * (16/60), fontWeight: 'bold', fontFamily: 'Arial Rounded MT Bold',borderWidth: 1, borderRadius: 18, borderColor: 'lightgrey', color: 'black', width:250}}
                    onChangeText={(s)=> this.setState({passwordText: s})} value={this.state.passwordText} 
                  />
                </View>
                <TouchableOpacity style= {{borderWidth: 1, borderColor: 'black', marginLeft: 5}} onPress={this.handleSavePassword.bind(this)}>
                  <Text style={{color: 'black'}}>Save</Text>
                </TouchableOpacity> 
              </View>
            )
            }
          </View>
          <View style={styles.changeviewincome}>
            {this.state.editIncome == false ?
            (
              <TouchableOpacity style={styles.viewincome} onPress={this.handleEditIncome.bind(this)}>
                <Text style={{fontSize: (Dimensions.get('window').height * 1)/14 * (23/60), fontWeight: 'bold', fontFamily: 'Arial Rounded MT Bold'}}>Income: ${this.state.showIncome}</Text>
              </TouchableOpacity>
            )
            : 
            (
              <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                <View style={{height: (Dimensions.get('window').height * 1)/14 * (32/60) }}>
                  <Input 
                    placeholder = 'Type here to change income' 
                    style={{fontSize: (Dimensions.get('window').height * 1)/14 * (16/60), fontWeight: 'bold', fontFamily: 'Arial Rounded MT Bold', borderWidth: 1, borderRadius: 18, borderColor: 'lightgrey', color: 'black', width:250}}
                    onChangeText={(s)=> this.setState({incomeText: s})} value={this.state.incomeText} 
                  />
                </View>
                <TouchableOpacity style= {{borderWidth: 1, borderColor: 'black', marginLeft: 5}} onPress={this.handleSaveIncome.bind(this)}>
                  <Text style={{color: 'black'}}>Save</Text>
                </TouchableOpacity> 
              </View>
            )
            }
          </View>
          <View style={styles.changeviewsaving}>
            {this.state.editSaving == false ?
            (
              <TouchableOpacity style={styles.viewsaving} onPress={this.handleEditSaving.bind(this)}>
                <Text style={{fontSize: (Dimensions.get('window').height * 1)/14 * (23/60), fontWeight: 'bold', fontFamily: 'Arial Rounded MT Bold'}}>Saving: {this.state.showSaving}%</Text>
              </TouchableOpacity>
            )
            : 
            (
              <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                <View style={{height: (Dimensions.get('window').height * 1)/14 * (32/60) }}>
                  <Input 
                    placeholder = 'Type here to change saving' 
                    style={{fontSize: (Dimensions.get('window').height * 1)/14 * (16/60), fontWeight: 'bold', fontFamily: 'Arial Rounded MT Bold', borderWidth: 1, borderRadius: 18, borderColor: 'lightgrey', color: 'black', width:250}}
                    onChangeText={(s)=> this.setState({savingText: s})} value={this.state.savingText} 
                  />
                </View>
                <TouchableOpacity style= {{borderWidth: 1, borderColor: 'black', marginLeft: 5}} onPress={this.handleSaveSaving.bind(this)}>
                  <Text style={{color: 'black'}}>Save</Text>
                </TouchableOpacity> 
              </View>
            )
            }
          </View>
          <View style={{marginTop: (Dimensions.get('window').height * 1)/14 * (16/60)}}>
            <Text style={{color: 'red'}}>{this.state.errorSaving}</Text>
          </View>
        </View>
      </View>    
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column'
  },
  header: {
    borderWidth: (Dimensions.get('window').height * 1)/14 * (1/60),
    borderColor: '#FF5148',
    // marginTop: (Dimensions.get('window').height * 1)/20,
    height: (Dimensions.get('window').height * 1)/14 * (375/60),
    width: Dimensions.get('window').width,
    backgroundColor: '#FF5148',
    flexDirection: 'column',
  },
  viewmenuprofile: {
    flexDirection: 'row',
    // marginTop: (Dimensions.get('window').height * 1)/14 * (5/60)
    marginTop: (Dimensions.get('window').height * 1)/20
  },
  button: {
    width: (Dimensions.get('window').height * 1)/14 * (50/60),
    alignItems: 'center',
    justifyContent: 'center'
  },
  iconmenu: {
    color: '#F8F8F8'
  },
  textprofile: {
    width: (Dimensions.get('window').width - ((Dimensions.get('window').height * 1)/14 * (50/60))*2),
    alignItems: 'center',
    justifyContent: 'center'
  },
  viewimage: {
    marginTop: (Dimensions.get('window').height * 1)/14 * (10/60),
    borderRadius: (Dimensions.get('window').height * 1)/14 * (67/60),
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    width: (Dimensions.get('window').height * 1)/14 * (135/60)
  },
  viewname: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: (Dimensions.get('window').height * 1)/14 * (10/60)
  },
  viewaddress: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  },
  viewphone: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  },
  content: {
    width: (Dimensions.get('window').height * 1)/14 * (375/60),
    height: (Dimensions.get('window').height * 1)/14 * (366/60),
    flexDirection: 'column',
    alignItems: 'center'
  },
  changepassword: {
    borderWidth: (Dimensions.get('window').height * 1)/14 * (1/60),
    borderColor: 'rgba(0,0,0,0.2)',
    width: (Dimensions.get('window').height * 1)/14 * (310/60),
    height: (Dimensions.get('window').height * 1)/14 * (64/60),
    borderRadius: (Dimensions.get('window').height * 1)/14 * (18/60),
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: 'rgba(0,0,0,0.1)',
    shadowOffset: { width: 4, height: 5 },
    shadowOpacity: 0.9,
    shadowRadius: 2
  },
  changepasswordview: {
    marginTop: (Dimensions.get('window').height * 1)/14 * (50 /60),
    borderWidth: (Dimensions.get('window').height * 1)/14 * (1/60),
    borderColor: 'rgba(0,0,0,0.2)',
    width: (Dimensions.get('window').height * 1)/14 * (310/60),
    height: (Dimensions.get('window').height * 1)/14 * (64/60),
    borderRadius: (Dimensions.get('window').height * 1)/14 * (18/60),
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: 'rgba(0,0,0,0.1)',
    shadowOffset: { width: 4, height: 5 },
    shadowOpacity: 0.9,
    shadowRadius: 2
  },
  viewincome: {
    borderWidth: (Dimensions.get('window').height * 1)/14 * (1/60),
    borderColor: 'rgba(0,0,0,0.2)',
    width: (Dimensions.get('window').height * 1)/14 * (310/60),
    height: (Dimensions.get('window').height * 1)/14 * (64/60),
    borderRadius: (Dimensions.get('window').height * 1)/14 * (18/60),
    shadowColor: 'rgba(0,0,0,0.1)',
    shadowOffset: { width: 4, height: 5 },
    shadowOpacity: 0.9,
    shadowRadius: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  changeviewincome:{
    marginTop: (Dimensions.get('window').height * 1)/14 * (36/60),
    borderWidth: (Dimensions.get('window').height * 1)/14 * (1/60),
    borderColor: 'rgba(0,0,0,0.2)',
    width: (Dimensions.get('window').height * 1)/14 * (310/60),
    height: (Dimensions.get('window').height * 1)/14 * (64/60),
    borderRadius: (Dimensions.get('window').height * 1)/14 * (18/60),
    shadowColor: 'rgba(0,0,0,0.1)',
    shadowOffset: { width: 4, height: 5 },
    shadowOpacity: 0.9,
    shadowRadius: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  viewsaving: {
    borderWidth: (Dimensions.get('window').height * 1)/14 * (1/60),
    borderColor: 'rgba(0,0,0,0.2)',
    width: (Dimensions.get('window').height * 1)/14 * (310/60),
    height: (Dimensions.get('window').height * 1)/14 * (64/60),
    borderRadius: (Dimensions.get('window').height * 1)/14 * (18/60),
    shadowColor: 'rgba(0,0,0,0.1)',
    shadowOffset: { width: 4, height: 5 },
    shadowOpacity: 0.9,
    shadowRadius: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  changeviewsaving: {
    marginTop: (Dimensions.get('window').height * 1)/14 * (36/60),
    borderWidth: (Dimensions.get('window').height * 1)/14 * (1/60),
    borderColor: 'rgba(0,0,0,0.2)',
    width: (Dimensions.get('window').height * 1)/14 * (310/60),
    height: (Dimensions.get('window').height * 1)/14 * (64/60),
    borderRadius: (Dimensions.get('window').height * 1)/14 * (18/60),
    shadowColor: 'rgba(0,0,0,0.1)',
    shadowOffset: { width: 4, height: 5 },
    shadowOpacity: 0.9,
    shadowRadius: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  }
})