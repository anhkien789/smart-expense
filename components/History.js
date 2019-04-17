import React from 'react';
import {StyleSheet, Text, View, Dimensions, TouchableOpacity, Image} from 'react-native';
import { Container, Header, Icon, Button, Grid, Row, Col} from 'native-base';

export default class History extends React.Component {

  render() {
    
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
            <Text style={{fontSize: (Dimensions.get('window').height * 1)/14 * (22/60), fontFamily: 'Arial Rounded MT Bold', color: 'white'}}>Date: 04/04/2019</Text>
          </View>
          <View style={styles.boxview}>
            <View style={styles.boxtotal}>
              <Text style={{fontSize: (Dimensions.get('window').height * 1)/14 * (25/60), fontFamily: 'Arial Rounded MT Bold', color: 'white'}}>Total: $65</Text>
            </View>
            <View style={styles.boxfoodanddrink}>
              <View style={styles.foodanddrink}>
                <Image style={{width: (Dimensions.get('window').height * 1)/14 * (41/60), height: (Dimensions.get('window').height * 1)/14 * (41/60)}} source={require('./FoodAndDrink-symbol.png')}/>
              </View>
              <View style={styles.foodanddrinktext}>
                <Text style={{fontSize: (Dimensions.get('window').height * 1)/14 * (16/60), fontWeight: 'bold', fontFamily: 'Arial Rounded MT Bold'}}>Food/Drink</Text>
              </View>
              <View style={styles.foodanddrinkprice}>
                <Text style={{fontSize: (Dimensions.get('window').height * 1)/14 * (16/60), fontWeight: 'bold', fontFamily: 'Arial Rounded MT Bold'}}>$15</Text>
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
                <Text style={{fontSize: (Dimensions.get('window').height * 1)/14 * (16/60), fontWeight: 'bold', fontFamily: 'Arial Rounded MT Bold'}}>$20</Text>
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
                <Text style={{fontSize: (Dimensions.get('window').height * 1)/14 * (16/60), fontWeight: 'bold', fontFamily: 'Arial Rounded MT Bold'}}>$30</Text>
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
    marginTop: (Dimensions.get('window').height * 1)/14 * (10/60)
  },
  datetext: {
    marginTop: (Dimensions.get('window').height * 1)/14 * (10/60)
  },
  boxview: {
    borderRadius: (Dimensions.get('window').height * 1)/14 * (18/60),
    marginTop: (Dimensions.get('window').height * 1)/14 * (10/60),
    width: (Dimensions.get('window').height * 1)/14 * (310/60),
    height: (Dimensions.get('window').height * 1)/14 * (600/60),
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