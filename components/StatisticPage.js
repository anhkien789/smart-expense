
//PIECHART
import React from 'react'
import { View, Text, Dimensions, graphStyle} from 'react-native'

import {PieChart, BarChart } from 'react-native-chart-kit'

export default class StatisticPage extends React.Component {
  render() {
    
    const chartConfig = {
      // backgroundGradientFrom: '#1E2923',
      // backgroundGradientTo: '#08130D',
      // color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
      // strokeWidth: 3 // optional, default 3
      backgroundColor: '#022173',
      backgroundGradientFrom: '#022173',
      backgroundGradientTo: '#1b3fa0',
      color: (opacity = 3) => `rgba(255, 255, 255, ${opacity})`,
      // strokeWidth: 2,
      decimalPlaces: 1,
      strokeWidth: 2,
    // style:{
    //   flex:'center'
    // }
      style: {
        paddingRight: 100
      }
    
    }
    const piedata = [
      { name: 'Food&Drink', population: 21500000, color: 'blue', legendFontColor: '#7F7F7F', legendFontSize: 15 },
      { name: 'Tranports', population: 2800000, color: 'yellow', legendFontColor: '#7F7F7F', legendFontSize: 15 },
      { name: 'Shopping', population: 527612, color: 'red', legendFontColor: '#7F7F7F', legendFontSize: 15 },
      
    ]
    const bardata = {
      labels: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
      datasets: [{
        data: [ 20, 45, 28, 80, 99, 43, 45, 76, 54, 89, 12, 64 ],
        width: 5
      }]
  }
    return(
      <View>
        <View style={{marginTop: 44}}>
          <Text>
          Pie Chart
          </Text>
          <PieChart
            data={piedata}
            width={Dimensions.get('window').width}
            height={200}
            chartConfig={chartConfig}
            accessor="population"
            backgroundColor="transparent"
            paddingLeft="5"
            
          /> 
        </View>
        <View style={{marginLeft: 1}}>
          <Text>BarChart</Text>
          <BarChart
            // style={style}
            data={bardata}
            width={(Dimensions.get('window').width) - 10}
            height={300}
            yAxisLabel={"$"}
            chartConfig={chartConfig}
            
            style={{
              marginVertical: 8,
              borderRadius: 16
            }}
            
          /> 
        </View>

      </View>
    )
  }
}


// in Expo - swipe left to see the following styling, or create your own
// const chartConfigs = [
//   {
//     backgroundColor: '#000000',
//     backgroundGradientFrom: '#1E2923',
//     backgroundGradientTo: '#08130D',
//     color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
//     style: {
//       borderRadius: 16
//     }
//   },
//   {
//     backgroundColor: '#022173',
//     backgroundGradientFrom: '#022173',
//     backgroundGradientTo: '#1b3fa0',
//     color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
//     style: {
//       borderRadius: 16
//     }
//   },
//   {
//     backgroundColor: '#ffffff',
//     backgroundGradientFrom: '#ffffff',
//     backgroundGradientTo: '#ffffff',
//     color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`
//   },
//   {
//     backgroundColor: '#26872a',
//     backgroundGradientFrom: '#43a047',
//     backgroundGradientTo: '#66bb6a',
//     color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
//     style: {
//       borderRadius: 16
//     }
//   },
//   {
//     backgroundColor: '#000000',
//     backgroundGradientFrom: '#000000',
//     backgroundGradientTo: '#000000',
//     color: (opacity = 1) => `rgba(${255}, ${255}, ${255}, ${opacity})`
//   }, {
//     backgroundColor: '#0091EA',
//     backgroundGradientFrom: '#0091EA',
//     backgroundGradientTo: '#0091EA',
//     color: (opacity = 1) => `rgba(${255}, ${255}, ${255}, ${opacity})`
//   },
//   {
//     backgroundColor: '#e26a00',
//     backgroundGradientFrom: '#fb8c00',
//     backgroundGradientTo: '#ffa726',
//     color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
//     style: {
//       borderRadius: 16
//     }
//   },
//   {
//     backgroundColor: '#b90602',
//     backgroundGradientFrom: '#e53935',
//     backgroundGradientTo: '#ef5350',
//     color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
//     style: {
//       borderRadius: 16
//     }
//   },
//   {
//     backgroundColor: '#ff3e03',
//     backgroundGradientFrom: '#ff3e03',
//     backgroundGradientTo: '#ff3e03',
//     color: (opacity = 1) => `rgba(${0}, ${0}, ${0}, ${opacity})`
//   }
// ]

