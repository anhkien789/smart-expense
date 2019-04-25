import React, { Component } from 'react';
import { Image, StyleSheet, View, TouchableHighlight, Text, TouchableOpacity, Dimensions, Button, Alert } from 'react-native'
import { Container, Header, Content, Form, Item, Input, Label, Footer, Icon, DatePicker } from 'native-base';

import Voice from 'react-native-voice'

var status = ''
var money = ''

export default class Home extends Component {

  constructor(props) {
    super(props);
    this.state = { 
      chosenDate: new Date(),
      recognized: '',
      started: '',
      results: [],
      foodmoney: '0',
      transportmoney: '0',
      shoppingmoney: '0'
    };
    this.setDate = this.setDate.bind(this);
     
    Voice.onSpeechStart = this.onSpeechStart.bind(this)
    Voice.onSpeechEnd = this.onSpeechEnd.bind(this)
    Voice.onSpeechRecognized = this.onSpeechRecognized.bind(this)
    Voice.onSpeechResults = this.onSpeechResults.bind(this)

    this.startAgain.bind(this)
  }

  setDate(newDate) {
    this.setState({ chosenDate: newDate });
  }

  componentWillUnmount() {
    Voice.destroy().then(Voice.removeAllListeners)
  }

  onSpeechStart(e){
    this.setState({
      started: '√'
    })
  }

  onSpeechEnd(e) {
    console.log('onSpeechEnd')
  }

  onSpeechStartReset(e){
    this.setState({
      started: '√'
    })
  }

  onSpeechRecognized(e){
    this.setState({
      recognized: '√'
    })
  }

  onSpeechRecognizedReset(e){
    this.setState({
      recognized: '√'
    })
  }

  onSpeechResults(e){
    this.setState({
      results: e.value
    })
  }

  onSpeechResultsReset(e){
    this.setState({
      results: e.value
    })
  }

  // async startRecognition(e){
  //   this.setState({
  //     recognized: '',
  //     started: '',
  //     results: []
  //   })
  //   try {
  //     await Voice.start('en-US')
  //   } catch (error) {
  //     console.error(error)
  //   }
  // }

  async componentDidMount(){
    this.setState({
      recognized: '',
      started: '',
      results: []
    })
    try {
      await Voice.start('en-US')
    } catch (error) {
      console.error(error)
    }
  }

  // handleStatus(e) {
  //   this.setState({status: e})
  // }
  async handleDeny(e) {
    // e = []
    // console.log(e)
    Voice.cancel()
    .then(status = '')
    .then(this.startAgain.bind(this))
  }

  async startAgain(e){
    console.log('startRecognition')
    this.setState({
      recognized: '',
      started: '',
      results: []
    })
    try {
      await Voice.start('en-US')
    } catch (error) {
      console.error(error)
    }
  }

  async handleChangeFoodMoney() {
    this.setState({foodmoney: status})
    Voice.cancel()
    .then(status = '')
    .then(this.startAgain.bind(this))
  }

  async handleChangeTransportMoney() {
    this.setState({transportmoney: status})
    Voice.cancel()
    .then(status = '')
    .then(this.startAgain.bind(this))
  }

  async handleChangeShoppingMoney() {
    this.setState({shoppingmoney: status})
    Voice.cancel()
    .then(status = '')
    .then(this.startAgain.bind(this))
  }
 
  render() {
    var str = this.state.results[0];
    if (str != undefined) {
      // this.setState({str: this.state.results.split(' ')})
      var res = str.split(' ');
      console.log(res)
      res.map((r,i) => {
        if (status == '' && (r == 'spending' || r == 'Spending')) {
          // this.handleStatus('spending')
          // console.log(this.state.status)
          status = 'spending'
          console.log(status)
        } 
        else if (status == 'spending' && r == 'food') {
          status = 'food'
          console.log(status)
        } 
        else if (status == 'food' && !isNaN(r)) {
          status = r
          // money = r
          //console.log(status)
          Alert.alert('Amount of food'
          , 'Do you mean ' + '$' + status + '?\n' + 'Touch "Confirm" to save money\nOR "Deny" to start again!',
          [
            {
              text: 'Confirm',
              onPress: this.handleChangeFoodMoney.bind(this)
            },
            {
              text: 'Deny',
              onPress: this.handleDeny.bind(this)
            }
          ]
          ) 
        }
        else if (status == 'spending' && r == 'transport') {
          status = 'transport'
          console.log(status)
        }
        else if (status == 'transport' && !isNaN(r)) {
          status = r
          // money = r
          //console.log(status)
          Alert.alert('Amount of transport'
          , 'Do you mean ' + '$' + status + '?\n' + 'Touch "Confirm" to save money\nOR "Deny" to start again!',
          [
            {
              text: 'Confirm',
              onPress: this.handleChangeTransportMoney.bind(this)
            },
            {
              text: 'Deny',
              onPress: this.handleDeny.bind(this)
            }
          ]
          ) 
        }
        else if (status == 'spending' && r == 'shopping') {
          status = 'shopping'
          console.log(status)
        }
        else if (status == 'shopping' && !isNaN(r)) {
          status = r
          // money = r
          //console.log(status)
          Alert.alert('Amount of shopping'
          , 'Do you mean ' + '$' + status + '?\n' + 'Touch "Confirm" to save money\nOR "Deny" to start again!',
          [
            {
              text: 'Confirm',
              onPress: this.handleChangeShoppingMoney.bind(this)
            },
            {
              text: 'Deny',
              onPress: this.handleDeny.bind(this)
            }
          ]
          ) 
        } 
      })
    } else {

    }
  
    // console.log(this.state.str)
    // const res = str.split(' ');
    // console.log(res);
    // const resSplit = this.state.results.split(' ') 
    // const str = 'Browse appdividend.com and enjoy coding';
    // const res = str.split(' ');
    // console.log(str);
    return (
      <View style={styles.containter}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.button} onPress={()=> this.props.navigation.openDrawer()}>
            <Icon name='menu' style={styles.iconmenu}/>
          </TouchableOpacity>
          <View style={styles.texthome}>
            <Text style={{fontSize: (Dimensions.get('window').height * 1)/14 * (22/60), fontWeight: 'bold', fontFamily: 'Arial Rounded MT Bold', color: 'black'}}>Home</Text>
          </View>
        </View>
        <View style={styles.content}>
          <View style={{marginTop: (Dimensions.get('window').height * 1)/14 * (5/60)}}>
            <Image style={{width: (Dimensions.get('window').height * 1)/14 * (58/60), height: (Dimensions.get('window').height * 1)/14 * (58/60)}} source={require('./Smartexpense-Logo.png')}/>
          </View>
          <View style={styles.dateposition}>
            {/* <View style={styles.datepicker}>
              <DatePicker
              defaultDate={new Date(2018, 4, 4)}
              minimumDate={new Date(2018, 1, 1)}
              maximumDate={new Date(2018, 12, 31)}
              locale={"en"}
              timeZoneOffsetInMinutes={undefined}
              modalTransparent={false}
              animationType={"fade"}
              androidMode={"default"}
              placeHolderText="Choose Date"
              textStyle={{ color: "black", fontFamily: 'Arial Rounded MT Bold' }}
              placeHolderTextStyle={{ color: 'rgba(0,0,0,0.25)' }}
              onDateChange={this.setDate}
              disabled={false}
              />
            </View> */}
            <View style={styles.dateview}>
              <Text style={{fontSize: (Dimensions.get('window').height * 1)/14 * (20/60), fontWeight: 'bold', fontFamily: 'Arial Rounded MT Bold'}}>
                Date: {this.state.chosenDate.toString().substr(4, 12)}
              </Text>
            </View>
          </View>
          <View style={styles.foodanddrinkposition}>
            <View style={styles.foodanddrink}>
              <Image style={{width: (Dimensions.get('window').height * 1)/14 * (55/60), height: (Dimensions.get('window').height * 1)/14 * (55/60)}} source={require('./FoodAndDrink-symbol.png')}/>
            </View>
            <View style={styles.foodanddrinktext}>
              <Text style={{fontSize: (Dimensions.get('window').height * 1)/14 * (20/60), fontWeight: 'bold', fontFamily: 'Arial Rounded MT Bold', backgroundColor: status == 'food' ? '#FF948F' : 'white' }}>Food/Drink</Text>
            </View>
            <View style={styles.foodanddrinkprice}>
              <Text style={{fontSize: (Dimensions.get('window').height * 1)/14 * (20/60), fontWeight: 'bold', fontFamily: 'Arial Rounded MT Bold'}}>{'$' + this.state.foodmoney}</Text>
            </View>
          </View>
          <View style={styles.transportposition}>
            <View style={styles.transports}>
              <Image style={{width: (Dimensions.get('window').height * 1)/14 * (55/60), height: (Dimensions.get('window').height * 1)/14 * (55/60)}} source={require('./Transports-symbol.png')}/>
            </View>
            <View style={styles.transporttext}>
              <Text style={{fontSize: (Dimensions.get('window').height * 1)/14 * (20/60), fontWeight: 'bold', fontFamily: 'Arial Rounded MT Bold', backgroundColor: status == 'transport' ? '#FF948F' : 'white'}}>Transport</Text>
            </View>
            <View style={styles.transportprice}>
              <Text style={{fontSize: (Dimensions.get('window').height * 1)/14 * (20/60), fontWeight: 'bold', fontFamily: 'Arial Rounded MT Bold'}}>{'$' + this.state.transportmoney}</Text>
            </View>
          </View>
          <View style={styles.shoppingposition}>
            <View style={styles.shopping}>
              <Image style={{width: (Dimensions.get('window').height * 1)/14 * (55/60), height: (Dimensions.get('window').height * 1)/14 * (55/60)}} source={require('./Shopping-symbol.png')}/>
            </View>
            <View style={styles.shoppingtext}>
              <Text style={{fontSize: (Dimensions.get('window').height * 1)/14 * (20/60), fontWeight: 'bold', fontFamily: 'Arial Rounded MT Bold', backgroundColor: status == 'shopping' ? '#FF948F' : 'white'}}>Shopping</Text>
            </View>
            <View style={styles.shoppingprice}>
              <Text style={{fontSize: (Dimensions.get('window').height * 1)/14 * (20/60), fontWeight: 'bold', fontFamily: 'Arial Rounded MT Bold'}}>{'$' + this.state.shoppingmoney}</Text>
            </View>
          </View>
          <View style={styles.viewvoice}>
            {/* <Button style={styles.buttonstart} onPress={this.startAgain.bind(this)} title="Start"/>
            <Text style={styles.transcript}>Transcript</Text>
            <Text>{this.state.results}</Text> */}
            <Icon name='mic'/>
            {status == '' ? <Text style={{fontSize: (Dimensions.get('window').height * 1)/14 * (15/60), fontWeight: 'bold', fontFamily: 'Arial Rounded MT Bold', color: '#FF5148', textAlign: 'center'}}>Please say "Spending" to activate Voice Recognition System!</Text> : 
                            status == 'spending' || status == 'Spending' ? <Text style={{fontSize: (Dimensions.get('window').height * 1)/14 * (15/60), fontWeight: 'bold', fontFamily: 'Arial Rounded MT Bold', color: '#FF5148', textAlign: 'center'}}>Voice is activated! Please say "Food", "Transport" or "Shopping" to choose category.</Text> : 
                            status == 'food' ? <Text style={{fontSize: (Dimensions.get('window').height * 1)/14 * (15/60), fontWeight: 'bold', fontFamily: 'Arial Rounded MT Bold', color: '#FF5148', textAlign: 'center'}}>You choosed Food Category. Please say number to save money!</Text> : 
                            status == 'transport' ? <Text style={{fontSize: (Dimensions.get('window').height * 1)/14 * (15/60), fontWeight: 'bold', fontFamily: 'Arial Rounded MT Bold', color: '#FF5148', textAlign: 'center'}}>You choosed Transport Category. Please say number to save money!</Text> : 
                            status == 'shopping' ? <Text style={{fontSize: (Dimensions.get('window').height * 1)/14 * (15/60), fontWeight: 'bold', fontFamily: 'Arial Rounded MT Bold', color: '#FF5148', textAlign: 'center'}}>You choosed Shopping Category. Please say number to save money!</Text> :
                            <Text style={{fontSize: (Dimensions.get('window').height * 1)/14 * (15/60), fontWeight: 'bold', fontFamily: 'Arial Rounded MT Bold', color: '#FF5148', textAlign: 'center'}}></Text>
            }
          </View>
        </View>
        <View style={styles.footer}>
          <View style={{marginLeft: (Dimensions.get('window').height * 1)/14 * (10/60)}}>
            <Text style={{fontSize: (Dimensions.get('window').height * 1)/14 * (30/60), fontWeight: 'bold', fontFamily: 'Arial Rounded MT Bold', color: 'black'}}>Total: ${  Number(this.state.foodmoney) + Number(this.state.transportmoney) + Number(this.state.shoppingmoney)}</Text>
          </View>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  containter: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#FF5148'
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
  button: {
    width: (Dimensions.get('window').height * 1)/14 * (50/60),
    alignItems: 'center',
    justifyContent: 'center'
  },
  iconmenu: {
    color: 'black'
  },
  texthome: {
    width: (Dimensions.get('window').width - ((Dimensions.get('window').height * 1)/14 * (50/60))*2),
    alignItems: 'center'
  },
  content: {
    marginTop: (Dimensions.get('window').height * 1)/14 * (10/60),
    width: (Dimensions.get('window').height * 1)/14 * (364/60),
    height: (Dimensions.get('window').height * 1)/14 * (626/60),
    flexDirection: 'column',
    backgroundColor: 'white',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: (Dimensions.get('window').height * 1)/14 * (18/60),
    shadowColor: '#000000',
    shadowOffset: { width: 4, height: 5 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 1
  },
  dateposition:{
    borderTopWidth: 1,
    borderBottomWidth: 1,
    marginTop: 5,
    height: (Dimensions.get('window').height * 1)/14 * (86/60),
    width: (Dimensions.get('window').height * 1)/14 * (364/60),
    borderColor: '#979797',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  datepicker: {
    borderWidth: 1,
    borderColor: '#979797',
    borderRadius: (Dimensions.get('window').height * 1)/14 * (18/60),
    marginLeft: (Dimensions.get('window').height * 1)/14 * (25/60),
    backgroundColor: 'rgba(0,0,0,0.1)'
  },
  dateview: {
    marginLeft: (Dimensions.get('window').height * 1)/14 * (5/60)
  },
  foodanddrink: {
    borderWidth: (Dimensions.get('window').height * 1)/14 * (2/60),
    borderRadius: (Dimensions.get('window').height * 1)/14 * (18/60),
    marginLeft: (Dimensions.get('window').height * 1)/14 * (25/60)
  },
  foodanddrinktext: {
    borderRightWidth: (Dimensions.get('window').height * 1)/14 * (1/60),
    borderColor: '#979797',
    height: (Dimensions.get('window').height * 1)/14 * (86/60),
    width: (Dimensions.get('window').height * 1)/14 * (167/60),
    justifyContent: 'center',
    alignItems: 'center'
  },
  foodanddrinkprice: {
    width: (Dimensions.get('window').height * 1)/14 * (114/60),
    alignItems: 'center'
  },
  foodanddrinkposition: {
    borderBottomWidth: 1,
    height: (Dimensions.get('window').height * 1)/14 * (86/60),
    width: (Dimensions.get('window').height * 1)/14 * (364/60),
    borderColor: '#979797',
    flexDirection: 'row',
    alignItems: 'center'
  },
  transportposition: {
    borderBottomWidth: (Dimensions.get('window').height * 1)/14 * (1/60),
    height: (Dimensions.get('window').height * 1)/14 * (86/60),
    width: (Dimensions.get('window').height * 1)/14 * (364/60),
    borderColor: '#979797',
    flexDirection: 'row',
    alignItems: 'center'
  },
  transports: {
    borderWidth: (Dimensions.get('window').height * 1)/14 * (2/60),
    borderRadius: (Dimensions.get('window').height * 1)/14 * (18/60),
    marginLeft: (Dimensions.get('window').height * 1)/14 * (25/60)
  },
  transporttext: {
    borderRightWidth: 1,
    borderColor: '#979797',
    height: (Dimensions.get('window').height * 1)/14 * (86/60),
    width: (Dimensions.get('window').height * 1)/14 * (167/60),
    justifyContent: 'center',
    alignItems: 'center'
  },
  transportprice: {
    width: (Dimensions.get('window').height * 1)/14 * (114/60),
    alignItems: 'center'
  },
  shoppingposition: {
    borderBottomWidth: (Dimensions.get('window').height * 1)/14 * (1/60),
    height: (Dimensions.get('window').height * 1)/14 * (86/60),
    width: (Dimensions.get('window').height * 1)/14 * (364/60),
    borderColor: '#979797',
    flexDirection: 'row',
    alignItems: 'center'
  },
  shopping: {
    borderWidth: (Dimensions.get('window').height * 1)/14 * (2/60),
    borderRadius: (Dimensions.get('window').height * 1)/14 * (18/60),
    marginLeft: (Dimensions.get('window').height * 1)/14 * (25/60)
  },
  shoppingtext: {
    borderRightWidth: (Dimensions.get('window').height * 1)/14 * (1/60),
    borderColor: '#979797',
    height: (Dimensions.get('window').height * 1)/14 * (86/60),
    width: (Dimensions.get('window').height * 1)/14 * (167/60),
    justifyContent: 'center',
    alignItems: 'center'
  },
  shoppingprice: {
    width: (Dimensions.get('window').height * 1)/14 * (114/60),
    alignItems: 'center'
  },
  footer: {
    borderWidth: 1,
    borderColor: '#FF948F',
    marginTop: (Dimensions.get('window').height * 1)/14 * (10/60),
    height: (Dimensions.get('window').height * 1)/14 * (44/60),
    width: Dimensions.get('window').width,
    backgroundColor: '#FF948F',
    flexDirection: 'row',
    alignItems:'center'
  },
  viewvoice: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: (Dimensions.get('window').height * 1)/14 * (340/60)
  },
  buttonstart: {
    padding: 10
  },
  transcript: {
    padding: 10
  },
  result: {
    color: 'red'
  }
})


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
