import React, { Component } from 'react';
import { Image, StyleSheet, View, TouchableHighlight, Text, TouchableOpacity, Dimensions, Button, Alert } from 'react-native'
import { Container, Header, Content, Form, Item, Input, Label, Footer, Icon, DatePicker } from 'native-base';

import Voice from 'react-native-voice'
import Modal from 'react-native-modal'

var status = ''
var money = ''
var category = ''
var visibleModal123 = null

export default class Home extends Component {

  constructor(props) {
    super(props);
    this.state = { 
      chosenDate: new Date(),
      recognized: '',
      started: '',
      results: [],
      foodmoney: 0,
      transportmoney: 0,
      shoppingmoney: 0,
      expenseId: '',
      total: 0,
      visibleModal: ''
    }; 

    status = JSON.parse(this.props.newStatus)
    money = JSON.parse(this.props.newMoney)
    category = JSON.parse(this.props.newCategory)

    this.setDate = this.setDate.bind(this);
     
    Voice.onSpeechStart = this.onSpeechStart.bind(this)
    Voice.onSpeechEnd = this.onSpeechEnd.bind(this)
    Voice.onSpeechRecognized = this.onSpeechRecognized.bind(this)
    Voice.onSpeechResults = this.onSpeechResults.bind(this)

    this.handleDeny.bind(this)
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
    
    fetch('https://smartexpenseeeee.herokuapp.com/checkExpenseExist', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        userId: JSON.parse(this.props.userId)
      })
    })
    .then(response => response.json())
    //.then(response => console.log(response))
    .then(response => response.length == 0 ?
      fetch('https://smartexpenseeeee.herokuapp.com/addExpense', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          foodOdrink: 0,
          transportation: 0,
          shopping: 0,
          total: 0,
          userId: JSON.parse(this.props.userId)
        })
      })
      .then(response => response.json())
      .then(response => this.setState({
        foodmoney: response.foodOdrink,
        transportmoney: response.transportation,
        shoppingmoney: response.shopping,
        total: response.total,
        expenseId: response._id
      }))
      .catch(err => console.error('error fetching data', err))
      //: console.log(response[0])
      : this.setState({
        foodmoney: response[0].foodOdrink,
        transportmoney: response[0].transportation,
        shoppingmoney: response[0].shopping,
        total: response[0].total,
        expenseId: response[0]._id
      })
    )
    .catch(err => console.error('error fetching data', err))
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
    // e = []
    // console.log(e)
    Voice.cancel()
    .then(
      status = '',
      category = '',
      money = ''
    )
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
    this.setState({
      foodmoney: this.state.foodmoney + Number(money),
      total: this.state.total + Number(money)
    })
    Voice.cancel()
    .then(
      status = '',
      category = '',
      money = ''
    )
    .then(this.startAgain.bind(this))
  }

  async handleChangeTransportMoney() {
    this.setState({
      transportmoney: this.state.transportmoney + Number(money),
      total: this.state.total + Number(money)
    })
    Voice.cancel()
    .then(
      status = '',
      category = '',
      money = ''
    )
    .then(this.startAgain.bind(this))
  }

  async handleChangeShoppingMoney() {
    this.setState({
      shoppingmoney: this.state.shoppingmoney + Number(money),
      total: this.state.total + Number(money)
    })
    // fetch(`https://smartexpenseeeee.herokuapp.com/updateExpense/${this.state.expenseId}`, {
    //   method: 'PUT',
    //   headers: {
    //     Accept: 'application/json',
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify({
    //     shopping: this.state.shoppingmoney,
    //     total: this.state.total,
    //   })
    // })
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
          category = 'food'
          console.log(status)
        } 
        else if (status == 'food' && !isNaN(r)) {
          status = r
          money = r
          console.log(status)
          visibleModal123 = 'fancy'
        }
        else if (!isNaN(status) && category == 'food' && r == 'confirm'){
          status = r
          console.log(status)
          visibleModal123 = null
          fetch(`https://smartexpenseeeee.herokuapp.com/updateExpense/${this.state.expenseId}`, {
            method: 'PUT',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              foodOdrink: this.state.foodmoney + Number(money),
              total: this.state.total + Number(money),
            })
          })
          .then(this.handleChangeFoodMoney.bind(this))
        }
        else if (status == 'spending' && r == 'transport') {
          status = 'transport'
          category = 'transport'
          console.log(status)
        }
        else if (status == 'transport' && !isNaN(r)) {
          status = r
          money = r
          console.log(status)
          visibleModal123 = 'fancy'
        }
        else if (!isNaN(status) && category == 'transport' && r == 'confirm'){
          status = r
          console.log(status)
          visibleModal123 = null
          fetch(`https://smartexpenseeeee.herokuapp.com/updateExpense/${this.state.expenseId}`, {
            method: 'PUT',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              transportation: this.state.transportmoney + Number(money),
              total: this.state.total + Number(money),
            })
          })
          .then(this.handleChangeTransportMoney.bind(this))
          
        }
        else if (!isNaN(status) && r == 'deny'){
          status = r
          console.log(status)
          visibleModal123 = null
          {this.handleDeny()}
        }
        else if (status == 'spending' && r == 'shopping') {
          status = 'shopping'
          category = 'shopping'
          console.log(status)
        }
        else if (status == 'shopping' && !isNaN(r)) {
          status = r
          money = r
          console.log(status)
          visibleModal123 = 'fancy'
          // Alert.alert('Amount of shopping'
          // , 'Do you mean ' + '$' + status + '?\n' + 'Touch "Confirm" to save money\nOR "Deny" to start again!',
          // [
          //   {
          //     text: 'Confirm',
          //     onPress: this.handleChangeShoppingMoney.bind(this)
          //   },
          //   {
          //     text: 'Deny',
          //     onPress: this.handleDeny.bind(this)
          //   }
          // ]
          // ) 
        }
        else if (!isNaN(status) && category == 'shopping' && r == 'confirm'){
          status = r
          console.log(status)
          visibleModal123 = null
          fetch(`https://smartexpenseeeee.herokuapp.com/updateExpense/${this.state.expenseId}`, {
            method: 'PUT',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              shopping: this.state.shoppingmoney + Number(money),
              total: this.state.total + Number(money),
            })
          })
          .then(this.handleChangeShoppingMoney.bind(this))
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
            {/* <Text style={{fontSize: (Dimensions.get('window').height * 1)/14 * (15/60), fontWeight: 'bold', fontFamily: 'Arial Rounded MT Bold', color: 'black'}}>{JSON.parse(this.props.userId)}</Text> */}
          </View>
        </View>
        <View style={styles.content}>
          <View style={{marginTop: (Dimensions.get('window').height * 1)/14 * (5/60)}}>
            <Image style={{width: (Dimensions.get('window').height * 1)/14 * (58/60), height: (Dimensions.get('window').height * 1)/14 * (58/60)}} source={require('./Smartexpense-Logo.png')}/>
          </View>
          <View style={styles.dateposition}>
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
              <Text style={{fontSize: (Dimensions.get('window').height * 1)/14 * (20/60), fontWeight: 'bold', fontFamily: 'Arial Rounded MT Bold'}}>${this.state.foodmoney}</Text>
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
          <Button onPress={() => this.setState({visibleModal: 'fancy'})} title='Fancy!'/>
          <Modal 
            isVisible= {visibleModal123 === 'fancy'}
            // isVisible = {this.state.visibleModal === 'fancy'}
            backdropColor="#B4B3DB"
            backdropOpacity={0.8}
            animationIn="zoomInDown"
            animationOut="zoomOutUp"
            animationInTiming={600}
            animationOutTiming={600}
            backdropTransitionInTiming={600}
            backdropTransitionOutTiming={600}
          >
            <View style={styles.contentModal}>
            <Text style={styles.contentTitleModal}>Amount of {category}</Text>
              <Text style={styles.contentTitleModal}>Do you mean ${status}?</Text>
              <Text style={styles.contentTitleModal}>Say "Confirm" to save money OR "Deny" to start again!</Text>
            </View>
            <Button onPress={() => this.setState({visibleModal: null})} title='close'/>
          </Modal>
        </View>
        <View style={styles.footer}>
          <View style={{marginLeft: (Dimensions.get('window').height * 1)/14 * (10/60)}}>
            <Text style={{fontSize: (Dimensions.get('window').height * 1)/14 * (30/60), fontWeight: 'bold', fontFamily: 'Arial Rounded MT Bold', color: 'black'}}>Total: ${this.state.total}</Text>
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
  },
  contentModal: {
    backgroundColor: 'white',
    padding: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  contentTitleModal: {
    fontSize: 20,
    marginBottom: 12,
    textAlign: 'center'
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
