import React, { Component } from 'react';
import { Image, StyleSheet, View, Text, TouchableOpacity, Dimensions } from 'react-native'
import { Icon } from 'native-base';

import Voice from 'react-native-voice'
import Modal from 'react-native-modal'

var status = ''
var money = ''
var category = ''
var visibleModal123 = null
var number = 0

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
      visibleModal: null,
      notimoney: 0,
      saving: 0,
      income: 0,
      respone: []
    }; 

    //reset value to origin when log out
    status = JSON.parse(this.props.newStatus)
    money = JSON.parse(this.props.newMoney)
    category = JSON.parse(this.props.newCategory)
    number = JSON.parse(this.props.newNumber)

    this.setDate = this.setDate.bind(this);
     
    //Voice Configuration
    Voice.onSpeechStart = this.onSpeechStart.bind(this)
    Voice.onSpeechEnd = this.onSpeechEnd.bind(this)
    Voice.onSpeechRecognized = this.onSpeechRecognized.bind(this)
    Voice.onSpeechResults = this.onSpeechResults.bind(this)

    //bind function
    this.handleChangeSomething.bind(this)
    this.handleDeny.bind(this)
    this.startAgain.bind(this)
  }

  setDate(newDate) {
    this.setState({ chosenDate: newDate });
  }

  //Stopping Voice recognition when it silent for along time
  componentWillUnmount() {
    Voice.destroy().then(Voice.removeAllListeners)
  }

  //handle event 
  onSpeechStart(e){
    this.setState({
      started: '√'
    })
  }

  //handle event
  onSpeechEnd(e) {
    console.log('onSpeechEnd')
  }

  //handle event
  onSpeechStartReset(e){
    this.setState({
      started: '√'
    })
  }

  //handle event
  onSpeechRecognized(e){
    this.setState({
      recognized: '√'
    })
  }

  //handle event
  onSpeechRecognizedReset(e){
    this.setState({
      recognized: '√'
    })
  }

  //handle event
  onSpeechResults(e){
    this.setState({
      results: e.value
    })
  }

  //handle event
  onSpeechResultsReset(e){
    this.setState({
      results: e.value
    })
  }

  //handle event before render in Homepage
  async componentDidMount(){
    this.setState({
      notimoney : ((JSON.parse(this.props.income) - (JSON.parse(this.props.income) * JSON.parse(this.props.saving) / 100)) / 30).toFixed(2), //the money exceed
      saving: JSON.parse(this.props.saving), //saving in percent when pass through from login
      income: JSON.parse(this.props.income) //income when pass through from login
    })
    fetch('https://smartexpenseeeee.herokuapp.com/checkExpenseExist', { //API to check the existed expense today
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
    .then(response => response.length == 0 ? // condition of the existed expense
      fetch('https://smartexpenseeeee.herokuapp.com/addExpense', { //API when the expense is not existed
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({  // set value to the default
          foodOdrink: 0,
          transportation: 0,
          shopping: 0,
          total: 0,
          userId: JSON.parse(this.props.userId)
        })
      })
      .then(response => response.json())
      .then(response => this.setState({ //get the response from server and then add to all values
        foodmoney: response.foodOdrink,
        transportmoney: response.transportation,
        shoppingmoney: response.shopping,
        total: response.total,
        expenseId: response._id
      }))
      .catch(err => console.error('error fetching data', err))
      : this.setState({ // condition when the expense existed
        foodmoney: response[0].foodOdrink,
        transportmoney: response[0].transportation,
        shoppingmoney: response[0].shopping,
        total: response[0].total,
        expenseId: response[0]._id
      })
    )
    .catch(err => console.error('error fetching data', err))
    //auto run Voice Recognition from the beginning
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

  //handle event when say "Deny" and then start Voice from the beginning
  async handleDeny() {
    Voice.cancel()
    .then(
      status = '',
      category = '',
      money = ''
    )
    .then(this.startAgain.bind(this))
  }

  //handle event for starting Voice again
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

  //handle event for saving food money and then start Voice from the beginning
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

  //handle event for saving transport money and then start Voice from the beginning
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

  //handle event for saving shopping money and then start Voice from the beginning
  async handleChangeShoppingMoney() {
    this.setState({
      shoppingmoney: this.state.shoppingmoney + Number(money),
      total: this.state.total + Number(money)
    })
    Voice.cancel()
    .then(status = '')
    .then(this.startAgain.bind(this))
  }

  //handle event for notification
  handleChangeSomething(response) {
    if ((response.length == 0 && number == 0) || (response.length == undefined && number == 0)) {
      this.setState({visibleModal: null})
    } else if(response.length != 0 && number == 0){
      this.setState({visibleModal: 'bottom'})
      number = 1
    }
    
  }
 
  render() {
    fetch('https://smartexpenseeeee.herokuapp.com/expenseChecking', { //API for notification
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        income: this.state.income,
        saving: this.state.saving,
        expId:  this.state.expenseId
      })
    })
    .then(response => response.json())
    .then(response => this.handleChangeSomething(response))
    
    //change Voice result from the string to array string to check single word
    var str = this.state.results[0];
    if (str != undefined) {
      var res = str.split(' ');
      console.log(res)
      res.map((r,i) => {
        if (status == '' && (r == 'spending' || r == 'Spending')) { //when saying "spending", the status value will change to "spending"
          status = 'spending'
          console.log(status)
        } 
        else if (status == 'spending' && r == 'food') { //when saying "food", the status value will change to "food"
          status = 'food'
          category = 'food'
          console.log(status)
        } 
        else if (status == 'food' && !isNaN(r)) { //when saying "any number", the status value will change to "that number"
          status = r
          money = r
          console.log(status)
          visibleModal123 = 'fancy'
        }
        else if (!isNaN(status) && category == 'food' && r == 'confirm'){ //when saying "confirm", the status value will change to "confirm"
          status = r
          console.log(status)
          visibleModal123 = null
          fetch(`https://smartexpenseeeee.herokuapp.com/updateExpense/${this.state.expenseId}`, { //API to save the food money
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
        else if (status == 'spending' && r == 'transport') { //when saying "transport", the status value will change to "transport"
          status = 'transport'
          category = 'transport'
          console.log(status)
        }
        else if (status == 'transport' && !isNaN(r)) { //when saying "any number", the status value will change to "that number"
          status = r
          money = r
          console.log(status)
          visibleModal123 = 'fancy'
        }
        else if (!isNaN(status) && category == 'transport' && r == 'confirm'){ //when saying "confirm", the status value will change to "confirm"
          status = r
          console.log(status)
          visibleModal123 = null
          fetch(`https://smartexpenseeeee.herokuapp.com/updateExpense/${this.state.expenseId}`, { //API to save transport money
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
        else if (!isNaN(status) && r == 'deny'){ //when saying "deny", the status value will change to "deny"
          status = r
          console.log(status)
          visibleModal123 = null
          {this.handleDeny()}
        }
        else if (status == 'spending' && r == 'shopping') { //when saying "shopping", the status value will change to "shopping"
          status = 'shopping'
          category = 'shopping'
          console.log(status)
        }
        else if (status == 'shopping' && !isNaN(r)) { //when saying "any number", the status value will change to "that number"
          status = r
          money = r
          console.log(status)
          visibleModal123 = 'fancy'
        }
        else if (!isNaN(status) && category == 'shopping' && r == 'confirm'){ //when saying "confirm", the status value will change to "confirm"
          status = r
          console.log(status)
          visibleModal123 = null
          fetch(`https://smartexpenseeeee.herokuapp.com/updateExpense/${this.state.expenseId}`, { //API to save shopping money
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
  
    return (
      //Front-end
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
            <Icon name='mic'/>
            {status == '' ? <Text style={{fontSize: (Dimensions.get('window').height * 1)/14 * (15/60), fontWeight: 'bold', fontFamily: 'Arial Rounded MT Bold', color: '#FF5148', textAlign: 'center'}}>Please say "Spending" to activate Voice Recognition System!</Text> : 
                            status == 'spending' || status == 'Spending' ? <Text style={{fontSize: (Dimensions.get('window').height * 1)/14 * (15/60), fontWeight: 'bold', fontFamily: 'Arial Rounded MT Bold', color: '#FF5148', textAlign: 'center'}}>Voice is activated! Please say "Food", "Transport" or "Shopping" to choose category.</Text> : 
                            status == 'food' ? <Text style={{fontSize: (Dimensions.get('window').height * 1)/14 * (15/60), fontWeight: 'bold', fontFamily: 'Arial Rounded MT Bold', color: '#FF5148', textAlign: 'center'}}>You choosed Food Category. Please say number to save money!</Text> : 
                            status == 'transport' ? <Text style={{fontSize: (Dimensions.get('window').height * 1)/14 * (15/60), fontWeight: 'bold', fontFamily: 'Arial Rounded MT Bold', color: '#FF5148', textAlign: 'center'}}>You choosed Transport Category. Please say number to save money!</Text> : 
                            status == 'shopping' ? <Text style={{fontSize: (Dimensions.get('window').height * 1)/14 * (15/60), fontWeight: 'bold', fontFamily: 'Arial Rounded MT Bold', color: '#FF5148', textAlign: 'center'}}>You choosed Shopping Category. Please say number to save money!</Text> :
                            <Text style={{fontSize: (Dimensions.get('window').height * 1)/14 * (15/60), fontWeight: 'bold', fontFamily: 'Arial Rounded MT Bold', color: '#FF5148', textAlign: 'center'}}></Text>
            }
          </View>
          <Modal 
            isVisible= {visibleModal123 === 'fancy'}
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
              <Text style={styles.contentTitleModal1}>Do you mean ${status}?</Text>
              <Text style={styles.contentTitleModal1}>Say "Confirm" to save money OR "Deny" to start again!</Text>
            </View>
          </Modal>
          <Modal
          isVisible={this.state.visibleModal === 'bottom'}
          onSwipeComplete={() => this.setState({ visibleModal: null })}
          swipeDirection={['up', 'left', 'right', 'down']}
          style={styles.bottomModal}
          >
            <View style={styles.contentModal}>
              <Text style={styles.contentTitleWarning}>Warning!!!</Text>
              <Text style={styles.contentTitleMessage1}>Today, you have over-expense ${this.state.total- this.state.notimoney} in average</Text>
              <Text style={styles.contentTitleMessage2}>You should consider spending next days</Text>
            </View>
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <TouchableOpacity style={styles.closebutton} onPress={() => this.setState({visibleModal: null})}>
                <Text style={{fontSize: (Dimensions.get('window').height * 1)/14 * (22/60), fontFamily: 'Arial Rounded MT Bold', color: 'white'}}>Close</Text>
              </TouchableOpacity>
            </View>
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

//Front-end configuration
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
  },
  contentTitleModal1: {
    fontSize: 15,
    marginBottom: 12,
    textAlign: 'center'
  },
  bottomModal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  contentTitleWarning:{
    fontSize: 20,
    marginBottom: 12,
    textAlign: 'center',
    color: 'red'
  },
  contentTitleMessage1: {
    fontSize: 15,
    marginBottom: 12,
    textAlign: 'center'
  },
  contentTitleMessage2: {
    fontSize: 15,
    marginBottom: 12,
    textAlign: 'center'
  },
  closebutton: {
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: (Dimensions.get('window').height * 1)/14 * (200/60),
    height: (Dimensions.get('window').height * 1)/14 * (50/60),
    borderRadius: (Dimensions.get('window').height * 1)/14 * (18/60),
    borderColor: 'white',
    textAlign: 'center',
    backgroundColor: '#FF5148'
  }
})
