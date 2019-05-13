import React from 'react';
import {StyleSheet, Text, View, Dimensions, TouchableOpacity, Image} from 'react-native';
import { Container, Header, Icon, Grid, Row, Col, DatePicker} from 'native-base';

var dateArray= []
var day = ''
var month = ''
var year = ''
export default class History extends React.Component {

  constructor(props) {
    
    super(props);
    this.state = { 
      chosenDate: new Date(),
      total: 0,
      foodnumber: 0,
      transportnumber: 0,
      shoppingnumber: 0,
    }

    this.setDate = this.setDate.bind(this)
  }
  setDate(newDate) {
    this.setState({ chosenDate: newDate });
  }

  handleLoadHistory() {
    fetch(`https://smartexpenseeeee.herokuapp.com/getExpenseByDate/${year}-${month}-${day}`, {
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
    .then(response => response.length != 0 ?
      this.setState({
        total: response[0].total,
        foodnumber: response[0].foodOdrink,
        transportnumber: response[0].transportation,
        shoppingnumber: response[0].shopping
      })
      :
      this.setState({
        total: 0,
        foodnumber: 0,
        transportnumber: 0,
        shoppingnumber: 0
      })
    )
    //.then(response => console.log(response))
    .catch(err => console.error('error fetching data', err))
  }

  render() {
    dateArray= this.state.chosenDate.toString().substr(4,12).split(' ')
    day = dateArray[1]
    month = dateArray[0]
    var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    month = months.indexOf(month) + 1
    if (month < 10) {
      month = '0' + month.toString()
    }
    year = dateArray[2]
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.button} onPress={()=> this.props.navigation.openDrawer()}>
            <Icon name='menu' style={styles.iconmenu}/>
          </TouchableOpacity>
        </View>
        <View style={styles.content}>
          <View style={styles.historytext}>
            <Text style={{fontSize: (Dimensions.get('window').height * 1)/14 * (30/60), fontFamily: 'Arial Rounded MT Bold', color: 'white'}}>History</Text>
          </View>
          <View style={styles.datetext}>
            <Text style={{fontSize: (Dimensions.get('window').height * 1)/14 * (22/60), fontFamily: 'Arial Rounded MT Bold', color: 'white'}}>Date:</Text>
            <View style={{ marginLeft: (Dimensions.get('window').height * 1)/14 * (5/60) ,alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: 'white', borderRadius: (Dimensions.get('window').height * 1)/14 * (18/60)}}>
              <DatePicker 
              defaultDate={new Date(2018, 4, 4)}
              minimumDate={new Date(2018, 1, 1)}
              maximumDate={new Date(2020, 12, 31)}
              locale={"en"}
              timeZoneOffsetInMinutes={undefined}
              modalTransparent={false}
              animationType={"fade"}
              androidMode={"default"}
              placeHolderText="Select date"
              textStyle={{fontSize: (Dimensions.get('window').height * 1)/14 * (22/60), fontFamily: 'Arial Rounded MT Bold', color: 'white'}}
              placeHolderTextStyle={{ color: "#d3d3d3" }}
              onDateChange={this.setDate}
              disabled={false}
              />
            </View>
          </View>
          <TouchableOpacity style={styles.loadhistory} onPress={this.handleLoadHistory.bind(this)}>
            <Text style={{fontSize: (Dimensions.get('window').height * 1)/14 * (22/60), fontFamily: 'Arial Rounded MT Bold', color: 'white'}}>Load History</Text>
          </TouchableOpacity>
          <View style={styles.boxview}>
            <View style={styles.boxtotal}>
              <Text style={{fontSize: (Dimensions.get('window').height * 1)/14 * (25/60), fontFamily: 'Arial Rounded MT Bold', color: 'white'}}>Total: ${this.state.total}</Text>
            </View>
            <View style={styles.boxfoodanddrink}>
              <View style={styles.foodanddrink}>
                <Image style={{width: (Dimensions.get('window').height * 1)/14 * (41/60), height: (Dimensions.get('window').height * 1)/14 * (41/60)}} source={require('./FoodAndDrink-symbol.png')}/>
              </View>
              <View style={styles.foodanddrinktext}>
                <Text style={{fontSize: (Dimensions.get('window').height * 1)/14 * (16/60), fontWeight: 'bold', fontFamily: 'Arial Rounded MT Bold'}}>Food/Drink</Text>
              </View>
              <View style={styles.foodanddrinkprice}>
                <Text style={{fontSize: (Dimensions.get('window').height * 1)/14 * (16/60), fontWeight: 'bold', fontFamily: 'Arial Rounded MT Bold'}}>${this.state.foodnumber}</Text>
              </View>
            </View>
            <View style={styles.boxtransport}>
              <View style={styles.transports}>
                <Image style={{width: (Dimensions.get('window').height * 1)/14 * (41/60), height: (Dimensions.get('window').height * 1)/14 * (41/60)}} source={require('./Transports-symbol.png')}/>
              </View>
              <View style={styles.transporttext}>
                <Text style={{fontSize: (Dimensions.get('window').height * 1)/14 * (16/60), fontWeight: 'bold', fontFamily: 'Arial Rounded MT Bold'}}>Transports</Text>
              </View>
              <View style={styles.transportprice}>
                <Text style={{fontSize: (Dimensions.get('window').height * 1)/14 * (16/60), fontWeight: 'bold', fontFamily: 'Arial Rounded MT Bold'}}>${this.state.transportnumber}</Text>
              </View>
            </View>
            <View style={styles.boxshopping}>
              <View style={styles.shopping}>
                <Image style={{width: (Dimensions.get('window').height * 1)/14 * (41/60), height: (Dimensions.get('window').height * 1)/14 * (41/60)}} source={require('./Shopping-symbol.png')}/>
              </View>
              <View style={styles.shoppingtext}>
                <Text style={{fontSize: (Dimensions.get('window').height * 1)/14 * (16/60), fontWeight: 'bold', fontFamily: 'Arial Rounded MT Bold'}}>Shopping</Text>
              </View>
              <View style={styles.shoppingprice}>
                <Text style={{fontSize: (Dimensions.get('window').height * 1)/14 * (16/60), fontWeight: 'bold', fontFamily: 'Arial Rounded MT Bold'}}>${this.state.shoppingnumber}</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#FF5148'
  },
  header: {
    borderWidth: 1,
    borderColor: '#FF948F',
    marginTop: (Dimensions.get('window').height * 1)/20,
    height: (Dimensions.get('window').height * 1)/14 * (44/60),
    width: (Dimensions.get('window').height * 1)/14 * (61/60),
    backgroundColor: '#FF948F',
    flexDirection: 'row',
    alignItems:'center',
    borderTopRightRadius: (Dimensions.get('window').height * 1)/14 * (18/60),
    borderBottomRightRadius: (Dimensions.get('window').height * 1)/14 * (18/60)
  },
  button: {
    width: (Dimensions.get('window').height * 1)/14 * (61/60),
    alignItems: 'center',
    justifyContent: 'center'
  },
  iconmenu: {
    color: 'black'
  },
  content: {
    alignItems: 'center'
  },
  historytext: {
    
  },
  datetext: {
    marginTop: (Dimensions.get('window').height * 1)/14 * (10/60),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  loadhistory: {
    marginTop: (Dimensions.get('window').height * 1)/14 * (10/60),
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: (Dimensions.get('window').height * 1)/14 * (200/60),
    height: (Dimensions.get('window').height * 1)/14 * (50/60),
    borderRadius: (Dimensions.get('window').height * 1)/14 * (18/60),
    borderColor: 'white'
  },
  boxview: {
    borderRadius: (Dimensions.get('window').height * 1)/14 * (18/60),
    marginTop: (Dimensions.get('window').height * 1)/14 * (10/60),
    width: (Dimensions.get('window').height * 1)/14 * (310/60),
    height: (Dimensions.get('window').height * 1)/14 * (500/60),
    backgroundColor: 'white',
    alignItems: 'center',
    shadowColor: '#000000',
    shadowOffset: { width: 4, height: 5 },
    shadowOpacity: 0.5,
    shadowRadius: (Dimensions.get('window').height * 1)/14 * (10/60)
  },
  boxtotal: {
    marginTop: (Dimensions.get('window').height * 1)/14 * (20/60),
    width: (Dimensions.get('window').height * 1)/14 * (280/60),
    height: (Dimensions.get('window').height * 1)/14 * (64/60),
    borderRadius: (Dimensions.get('window').height * 1)/14 * (18/60),
    backgroundColor: '#FF5148',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000000',
    shadowOffset: { width: 4, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: (Dimensions.get('window').height * 1)/14 * (10/60)
  },
  boxfoodanddrink: {
    flexDirection: 'row',
    marginTop: (Dimensions.get('window').height * 1)/14 * (20/60),
    width: (Dimensions.get('window').height * 1)/14 * (280/60),
    height: (Dimensions.get('window').height * 1)/14 * (64/60),
    backgroundColor: '#FF948F',
    // justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000000',
    shadowOffset: { width: 4, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: (Dimensions.get('window').height * 1)/14 * (10/60)
  },
  foodanddrink: {
    borderWidth: (Dimensions.get('window').height * 1)/14 * (2/60),
    borderRadius: (Dimensions.get('window').height * 1)/14 * (18/60),
    marginLeft: (Dimensions.get('window').height * 1)/14 * (10/60),
    alignItems: 'center',
    justifyContent: 'center',
    width: (Dimensions.get('window').height * 1)/14 * (50/60),
    height: (Dimensions.get('window').height * 1)/14 * (50/60)
  },
  foodanddrinktext: {
    borderRightWidth: (Dimensions.get('window').height * 1)/14 * (1/60),
    borderColor: '#979797',
    height: (Dimensions.get('window').height * 1)/14 * (64/60),
    width: (Dimensions.get('window').height * 1)/14 * (108/60),
    justifyContent: 'center',
    alignItems: 'center'
  },
  foodanddrinkprice: {
    width: (Dimensions.get('window').height * 1)/14 * (112/60),
    alignItems: 'center'
  },
  boxtransport: {
    flexDirection: 'row',
    marginTop: (Dimensions.get('window').height * 1)/14 * (20/60),
    width: (Dimensions.get('window').height * 1)/14 * (280/60),
    height: (Dimensions.get('window').height * 1)/14 * (64/60),
    backgroundColor: '#FF948F',
    // justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000000',
    shadowOffset: { width: 4, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: (Dimensions.get('window').height * 1)/14 * (10/60)
  },
  transports: {
    borderWidth: (Dimensions.get('window').height * 1)/14 * (2/60),
    borderRadius: (Dimensions.get('window').height * 1)/14 * (18/60),
    marginLeft: (Dimensions.get('window').height * 1)/14 * (10/60),
    alignItems: 'center',
    justifyContent: 'center',
    width: (Dimensions.get('window').height * 1)/14 * (50/60),
    height: (Dimensions.get('window').height * 1)/14 * (50/60)
  },
  transporttext: {
    borderRightWidth: (Dimensions.get('window').height * 1)/14 * (1/60),
    borderColor: '#979797',
    height: (Dimensions.get('window').height * 1)/14 * (64/60),
    width: (Dimensions.get('window').height * 1)/14 * (108/60),
    justifyContent: 'center',
    alignItems: 'center'
  },
  transportprice: {
    width: (Dimensions.get('window').height * 1)/14 * (112/60),
    alignItems: 'center'
  },
  boxshopping: {
    flexDirection: 'row',
    marginTop: (Dimensions.get('window').height * 1)/14 * (20/60),
    width: (Dimensions.get('window').height * 1)/14 * (280/60),
    height: (Dimensions.get('window').height * 1)/14 * (64/60),
    backgroundColor: '#FF948F',
    // justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000000',
    shadowOffset: { width: 4, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: (Dimensions.get('window').height * 1)/14 * (10/60)
  },
  shopping: {
    borderWidth: (Dimensions.get('window').height * 1)/14 * (2/60),
    borderRadius: (Dimensions.get('window').height * 1)/14 * (18/60),
    marginLeft: (Dimensions.get('window').height * 1)/14 * (10/60),
    alignItems: 'center',
    justifyContent: 'center',
    width: (Dimensions.get('window').height * 1)/14 * (50/60),
    height: (Dimensions.get('window').height * 1)/14 * (50/60)
  },
  shoppingtext: {
    borderRightWidth: (Dimensions.get('window').height * 1)/14 * (1/60),
    borderColor: '#979797',
    height: (Dimensions.get('window').height * 1)/14 * (64/60),
    width: (Dimensions.get('window').height * 1)/14 * (108/60),
    justifyContent: 'center',
    alignItems: 'center'
  },
  shoppingprice: {
    width: (Dimensions.get('window').height * 1)/14 * (112/60),
    alignItems: 'center'
  }
})