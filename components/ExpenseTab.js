//PIECHART
import React from 'react'
import { View, Text, Dimensions, ScrollableTabView, label, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import { Container, Header, Content, Icon, Picker, Form } from "native-base";
import {PieChart, LineChart , ProgressChart} from 'react-native-chart-kit'


export default class ExpenseTab extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      selected: undefined,
      foodspend: 1,
      transportspend: 1,
      shoppingspend: 1,
      value: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    };
  }

  onValueChange(value) {
    this.setState({
      selected: value
    })
  }

  onChangeNumber(i,v) {
    var array = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    array[i] = v
    this.setState({value: array})
  }

  handleLoadExpense() {
    fetch('https://smartexpenseeeee.herokuapp.com/monthlyStatistic', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        userId: this.props.userId,
        month: this.state.selected,
        year: '2019'
      })
    })
    .then(response => response.json())
    // .then(response => console.log(response))
    .then(response => this.setState({
      foodspend: response[0].totalFoodNDrink,
      transportspend: response[0].totalTransport,
      shoppingspend: response[0].totalShopping,
    }))
    .then(fetch('https://smartexpenseeeee.herokuapp.com/statisticByMonth', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        userId: this.props.userId,
        year: '2019'
      })
    })
    .then(response => response.json())
    //.then(response => console.log(response))
    .then(response => response.map((value) => this.onChangeNumber((Number(value._id.month) - 1), value.total)))
    .then(console.log(this.state.value))
    )
  }
  

  render() {

    const chartConfig = {  
    backgroundGradientFrom: '#FF0000', 
    backgroundGradientTo: '#ffffff',
    color: (opacity = 10) => `rgba(134, 65, 244, ${opacity})`,
    decimalPlaces: 2,
    }

    const chartLineConfig = {
      backgroundColor: '#ff5148',
      backgroundGradientFrom: '#FF0000', 
      backgroundGradientTo: '#ffffff',
      color: (opacity = 3) => `rgba(134, 65, 244, ${opacity})`,
      decimalPlaces: 1
    }
    
    var piedata = [
      { name:'$ Food/Drink',spending: this.state.foodspend,color: '#66CDAA', legendFontColor: '#ffffff', legendFontSize: 10 },
      { name:'$ Transport', spending: this.state.transportspend, color: '#aa66cd', legendFontColor: '#ffffff', legendFontSize: 10 },
      { name:'$ Shopping', spending: this.state.shoppingspend, color: '#ffe4e1', legendFontColor: '#ffffff', legendFontSize: 10, },  
    ]

    var linedata = {
      labels: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
      datasets: [{
        data: this.state.value,
        color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
        strokeWidth: 2 // optional
      }]
    }
    
    return(
      <ScrollView>
        <View style={styles.expenseview}>
          <View style={styles.datepicker}>
            <Form>
                <Picker
                  mode="dropdown"
                  iosIcon={<Icon name="arrow-down" style={{color: 'white'}}/>}
                  placeholder="Select month"
                  placeholderStyle={{ color: "#bfc6ea" }}
                  placeholderIconColor="#007aff"
                  style={{alignItems: 'center', justifyContent: 'center',borderRadius: (Dimensions.get('window').height * 1)/14 * (18/60) }}
                  selectedValue={this.state.selected}
                  onValueChange={this.onValueChange.bind(this)}
                >
                  <Picker.Item label="January" value="1" />
                  <Picker.Item label="February" value="2" />
                  <Picker.Item label="March" value="3" />
                  <Picker.Item label="April" value="4" />
                  <Picker.Item label="May" value="5" />
                  <Picker.Item label="June" value="6" />
                  <Picker.Item label="July" value="7" />
                  <Picker.Item label="August" value="8" />
                  <Picker.Item label="September" value="9" />
                  <Picker.Item label="October" value="10" />
                  <Picker.Item label="November" value="11" />
                  <Picker.Item label="December" value="12" />
                </Picker>
              </Form>
          </View>
          <View>
            <TouchableOpacity style={styles.loadbutton} onPress={this.handleLoadExpense.bind(this)}>
              <Text style={{fontSize: (Dimensions.get('window').height * 1)/14 * (22/60), fontFamily: 'Arial Rounded MT Bold', color: 'white'}}>Load</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.piechartview}>
            <PieChart 
              data={piedata}
              width={Dimensions.get('window').width}
              height={300}
              chartConfig={chartConfig}
              accessor="spending"          
              backgroundColor="transparent"
              absolute
              paddingLeft='35'
            />
          </View>
          <View>
            <Text style={{ fontSize: 15, fontWeight: 'bold', fontFamily: 'Arial Rounded MT Bold', color: 'black'}}>Pie Chart: Show the amount of money each month in 2019</Text>
          </View>
          {/* <View>
            <Text style={{ fontSize: (Dimensions.get('window').height * 1)/14 * (15/60), fontWeight: 'bold', fontFamily: 'Arial Rounded MT Bold', color: 'black'}}>Pie Chart: Show the amount of money each month in 2019</Text>
          </View> */}
          <View style={styles.linechartview}>
            <LineChart
              data={linedata}
              width={Dimensions.get('window').width}
              height={320}
              chartConfig={chartLineConfig}
              backgroundColor="transparent"
              paddingRight='50'
            />
          </View>
          <View style={{paddingBottom: 50}}>
            <Text style={{fontWeight: 'bold', color: 'black'}}>Bar Chart: Show the amount of money in 2019</Text>
          </View>
          {/* <View>
            <Text style={{ fontSize: (Dimensions.get('window').height * 1)/14 * (15/60), fontWeight: 'bold', fontFamily: 'Arial Rounded MT Bold', color: 'black'}}>Bar Chart: Show the amount of money in</Text>
          </View> */}
        </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  expenseview: {
    backgroundColor:'#ff5148',
    alignItems: 'center',
    justifyContent: 'center'
  },
  datepicker: {
    marginTop: (Dimensions.get('window').height * 1)/14 * (10/60),
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: (Dimensions.get('window').height * 1)/14 * (18/60)
  },
  loadbutton: {
    marginTop: (Dimensions.get('window').height * 1)/14 * (10/60),
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: (Dimensions.get('window').height * 1)/14 * (200/60),
    height: (Dimensions.get('window').height * 1)/14 * (50/60),
    borderRadius: (Dimensions.get('window').height * 1)/14 * (18/60),
    borderColor: 'white'
  },
  piechartview: {
    marginTop: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: (Dimensions.get('window').height * 1)/14 * (18/60),
    shadowColor: '#000000',
    shadowOffset: { width: 4, height: 5 },
    shadowOpacity: 0.5,
    shadowRadius: (Dimensions.get('window').height * 1)/14 * (10/60)
  },
  linechartview: {
    marginTop: 10,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'white',
    shadowColor: '#000000',
    shadowOffset: { width: 4, height: 5 },
    shadowOpacity: 0.5,
    shadowRadius: (Dimensions.get('window').height * 1)/14 * (10/60)
  }
})