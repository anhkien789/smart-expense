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
      // categories: ['Food', 'Transport', 'Shopping'],
      results: [],
      foodmoney: '0',
      // status: '',
      // currentCategory: '', amount: 0,
      // str: []
    };
    this.setDate = this.setDate.bind(this);
     
    Voice.onSpeechStart = this.onSpeechStart.bind(this)
    Voice.onSpeechRecognized = this.onSpeechRecognized.bind(this)
    Voice.onSpeechResults = this.onSpeechResults.bind(this)
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
  async handleDeny() {
    status = ''
    // this.setState({results: []})
    // Voice.destroy().then(Voice.start('en-US'))
    Voice.stop()
    // .then(Voice.removeAllListeners)
    .then(this.setState({
      recognized: '',
      started: '',
      results: []
    }))
    // .then(() => 
    // { 
    //   Voice.onSpeechStart = this.onSpeechStartReset.bind(this)
    //   Voice.onSpeechRecognized = this.onSpeechRecognizedReset.bind(this)
    //   Voice.onSpeechResults = this.onSpeechResultsReset.bind(this)
    // }
    // ) 
    // .then(Voice.start('en-US'))
    .then(await Voice.start('en-US'))
    console.log(this.state.results)
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
        } else if (status == 'spending' && r == 'food') {
          status = 'food'
          console.log(status)
        } else if (status == 'food' && !isNaN(r)) {
          status = r
          // console.log(status)
          Alert.alert('Amount'
          , 'Do you mean ' + status + '?',
          [
            {
              text: 'Confirm',
              onPress: () => this.setState({foodmoney: status})
            },
            {
              text: 'Deny',
              onPress: this.handleDeny.bind(this)
            }
          ]
          ) 
        } 
        // else if (status == 'amount' && r.indexOf('$') == 0) {
        //   status = r
        //   // money = r
        //   Alert.alert('Amount'
        //   , 'Do you mean ' + status + '?',
        //   [
        //     {
        //       text: 'OK',
        //       onPress: () => this.setState({foodmoney: status})
        //     }
        //   ]
        //   ) 
        // }
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
              <Text style={{fontSize: (Dimensions.get('window').height * 1)/14 * (20/60), fontWeight: 'bold', fontFamily: 'Arial Rounded MT Bold'}}>Food/Drink</Text>
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
              <Text style={{fontSize: (Dimensions.get('window').height * 1)/14 * (20/60), fontWeight: 'bold', fontFamily: 'Arial Rounded MT Bold'}}>Transports</Text>
            </View>
            <View style={styles.transportprice}>
              <Text style={{fontSize: (Dimensions.get('window').height * 1)/14 * (20/60), fontWeight: 'bold', fontFamily: 'Arial Rounded MT Bold'}}>$20</Text>
            </View>
          </View>
          <View style={styles.shoppingposition}>
            <View style={styles.shopping}>
              <Image style={{width: (Dimensions.get('window').height * 1)/14 * (55/60), height: (Dimensions.get('window').height * 1)/14 * (55/60)}} source={require('./Shopping-symbol.png')}/>
            </View>
            <View style={styles.shoppingtext}>
              <Text style={{fontSize: (Dimensions.get('window').height * 1)/14 * (20/60), fontWeight: 'bold', fontFamily: 'Arial Rounded MT Bold'}}>Shopping</Text>
            </View>
            <View style={styles.shoppingprice}>
              <Text style={{fontSize: (Dimensions.get('window').height * 1)/14 * (20/60), fontWeight: 'bold', fontFamily: 'Arial Rounded MT Bold'}}>$30</Text>
            </View>
          </View>
          <View style={styles.viewvoice}>
            {/* <Button style={styles.buttonstart} onPress={this.startRecognition.bind(this)} title="Start"/> */}
            <Text style={styles.transcript}>Transcript</Text>
            <Text>{this.state.results}</Text>
            {/* {this.state.results.map((result,i) =>
              <Text style={styles.result} key={i}>{result}</Text>
            )} */}
            {/* {this.state.results.map((result,i) =>
              <Text style={styles.result} key={i}>{i}</Text>
            )} */}
            {/* {this.state.results.map((result,i) => {
              if (result == 'hello ' || result == 'Hello ' || result == ' hello' || result == ' Hello' ) {
                <Text>It works!</Text>
              }
            })} */}
            {/* {resSplit.map((res,i) => <Text key={i}>{res}</Text>)} */}
            {/* {this.state.results == 'Hello' ? alert("It work") : <Text>something wrong</Text>} */}
          </View>
        </View>
        <View style={styles.footer}>
          <View style={{marginLeft: (Dimensions.get('window').height * 1)/14 * (10/60)}}>
            <Text style={{fontSize: (Dimensions.get('window').height * 1)/14 * (30/60), fontWeight: 'bold', fontFamily: 'Arial Rounded MT Bold', color: 'black'}}>Total: $65</Text>
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
    backgroundColor: '#F5FCFF',
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
