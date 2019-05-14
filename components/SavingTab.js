//PIECHART
import React from 'react'
import { View, Text, Dimensions, ScrollView, StyleSheet, TouchableOpacity } from 'react-native'
import { Icon, Picker, Form } from "native-base";
import { LineChart } from 'react-native-chart-kit'

var dataSet = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]

export default class SavingTab extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      selected: undefined,
      foodspend: 1,
      transportspend: 1,
      shoppingspend: 1,
      value: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      
    }

    
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

  handleLoadSaving() {
    fetch('https://smartexpenseeeee.herokuapp.com/savingStatistic', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        userId: this.props.userId,
        year: this.state.selected,
        income: this.props.income
      })
    })
    .then(response => response.json())
    .then(response => response.map((value) => this.onChangeNumber((Number(value._id.month) - 1), value.savingAmout)))
    .then(console.log(this.state.value))
  }

  render() {
    const chartConfig = {
    backgroundColor: '#ff5148',
    backgroundGradientFrom: '#FF0000', 
    backgroundGradientTo: '#ffffff',
    color: (opacity = 3) => `rgba(0, 0, 0, ${opacity})`,
    decimalPlaces: 1,
    }
    var linedata = {
      labels: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
      datasets: [{
        data: this.state.value,
        color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
        strokeWidth: 2 // optional
      }]
    }

    return(
      <ScrollView style={{backgroundColor: '#ff5148'}}>
        <View style={styles.container}>
          <View style={styles.datepicker}>
            <Form>
              <Picker
                mode="dropdown"
                iosIcon={<Icon name="arrow-down" />}
                placeholder="Select year"
                placeholderStyle={{ color: "#bfc6ea" }}
                placeholderIconColor="#007aff"
                style={{alignItems: 'center', justifyContent: 'center',borderRadius: (Dimensions.get('window').height * 1)/14 * (18/60) }}
                selectedValue={this.state.selected}
                onValueChange={this.onValueChange.bind(this)}  
                >
                  <Picker.Item label="2019" value="2019" />
                  <Picker.Item label="2020" value="2020" />
              </Picker>
            </Form>
          </View>
          <View>
            <TouchableOpacity style={styles.loadbutton} onPress={this.handleLoadSaving.bind(this)}>
              <Text style={{fontSize: (Dimensions.get('window').height * 1)/14 * (22/60), fontFamily: 'Arial Rounded MT Bold', color: 'white'}}>Load</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.linechartview}>
            <LineChart
              data={linedata}
              width={Dimensions.get('window').width}
              height={320}
              chartConfig={chartConfig}
              backgroundColor="transparent"
            />
          </View>
          <View>
            <Text style={{ marginTop: 10, marginBottom: 50,fontSize: (Dimensions.get('window').height * 1)/14 * (15/60), fontWeight: 'bold', fontFamily: 'Arial Rounded MT Bold', color: 'black'}}>Bar Chart: Show the amount of saving each year</Text>
          </View>
        </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor:'#ff5148',
    alignItems: 'center',
    justifyContent: 'center'
  },
  linechartview: {
    marginTop: 10,
    borderWidth: 1,
    borderColor: 'white',
    shadowColor: '#000000',
    shadowOffset: { width: 4, height: 5 },
    shadowOpacity: 0.5,
    shadowRadius: (Dimensions.get('window').height * 1)/14 * (10/60)
  },
  datepicker: {
    marginTop: 10,
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: (Dimensions.get('window').height * 1)/14 * (18/60)
  },
  loadbutton: {
    marginTop: 10,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: (Dimensions.get('window').height * 1)/14 * (200/60),
    height: (Dimensions.get('window').height * 1)/14 * (50/60),
    borderRadius: (Dimensions.get('window').height * 1)/14 * (18/60),
    borderColor: 'white'
  }
})