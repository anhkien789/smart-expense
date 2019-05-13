
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions} from 'react-native'
import { Container, Header, Tab, Tabs, TabHeading, ScrollableTab, Content, Icon} from 'native-base';
import ExpenseTab from './ExpenseTab.js';
import SavingTab from './SavingTab.js';

export default class StatisticPage extends React.Component {

  constructor() {
    super()
    this.state = { userId: '', income: 0}
  }

  componentDidMount() {
    this.setState({
      userId: JSON.parse(this.props.userId),
      income: JSON.parse(this.props.income)
    })
  }

  render() {
    return (
      <Container style={{backgroundColor: '#FF5148'}}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.button} onPress={()=> this.props.navigation.openDrawer()}>
            <Icon name='menu' style={styles.iconmenu}/>
          </TouchableOpacity>
          <View style={styles.textstatistic}>
            <Text style={{fontSize: (Dimensions.get('window').height * 1)/14 * (22/60), fontWeight: 'bold', fontFamily: 'Arial Rounded MT Bold', color: 'black'}}>Statistic</Text>
            {/* <Text style={{fontSize: (Dimensions.get('window').height * 1)/14 * (15/60), fontWeight: 'bold', fontFamily: 'Arial Rounded MT Bold', color: 'black'}}>{JSON.parse(this.props.userId)}</Text> */}
          </View>
        </View>
        <Content  hasTabs>
        <Tabs  renderTabBar={()=> <ScrollableTab style={{backgroundColor: '#FF948F'}}/>}>
          <Tab heading={<TabHeading style={{backgroundColor: '#FF948F'}}><Text style={{fontSize: (Dimensions.get('window').height * 1)/14 * (15/60), fontWeight: 'bold', fontFamily: 'Arial Rounded MT Bold', color: 'black'}}>Expense Statistic</Text></TabHeading>}>
            <ExpenseTab  userId = {this.state.userId}/>
          </Tab>
          <Tab heading={<TabHeading style={{backgroundColor: '#FF948F'}}><Text style={{fontSize: (Dimensions.get('window').height * 1)/14 * (15/60), fontWeight: 'bold', fontFamily: 'Arial Rounded MT Bold', color: 'black'}}>Saving Statistic</Text></TabHeading>}>
            <SavingTab userId = {this.state.userId} income = {this.state.income}/>
          </Tab>
          
        </Tabs>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create ({
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
  textstatistic: {
    width: (Dimensions.get('window').width - ((Dimensions.get('window').height * 1)/14 * (50/60))*2),
    alignItems: 'center'
  }
})
