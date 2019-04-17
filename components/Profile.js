import React from 'react';
import { Image, StyleSheet, View, TouchableHighlight, Text, TouchableOpacity, Dimensions } from 'react-native'
import { Container, Header, Content, Form, Item, Input, Label, Footer, Icon, DatePicker } from 'native-base';
import ImagePicker from 'react-native-image-picker'


export default class Profile extends React.Component {

  constructor() {
    super()
    this.state = { photo: null}
  }
  // state = {
  //   photo: null
  // }

  handleChoosePhoto = () => {
    const options = {
      noData: true
    }
    ImagePicker.launchImageLibrary(options, response => {
      console.log("response", response)
      if (response.uri) {
        this.setState({ photo: response})
      }
    })
  }

  render() {
    // const {photo} = this.state
    return(
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.viewmenuprofile}>
            <TouchableOpacity style={styles.button} onPress={()=> this.props.navigation.openDrawer()}>
              <Icon name='menu' style={styles.iconmenu}/>
            </TouchableOpacity>
            <View style={styles.textprofile}>
              <Text style={{fontSize: (Dimensions.get('window').height * 1)/14 * (22/60), fontWeight: 'bold', fontFamily: 'Arial Rounded MT Bold',color: '#F8F8F8'}}>Profile</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.viewimage} onPress={this.handleChoosePhoto}>
            {this.state.photo == null ? (<Image style= {{width: (Dimensions.get('window').height * 1)/14 * (135/60), height: (Dimensions.get('window').height * 1)/14 * (135/60)}} source={require('./user-default-image.png')}/>) : (
              <Image
                source={{uri: this.state.photo.uri}}
                style={{width: (Dimensions.get('window').height * 1)/14 * (135/60), height: (Dimensions.get('window').height * 1)/14 * (135/60), borderRadius: (Dimensions.get('window').height * 1)/14 * (67/60)}}
              />
            )}
          </TouchableOpacity>
          <View style={styles.viewname}>
            <Text style={{fontSize: (Dimensions.get('window').height * 1)/14 * (40/60), fontFamily: 'Savoye LET', color: '#F8F8F8'}}>Kien Le Minh</Text>
          </View>
          <View style={styles.viewaddress}>
            <Icon name='home' style={{color: '#F8F8F8', width: (Dimensions.get('window').height * 1)/14 * (30/60)}}/>  
            <Text style={{fontSize: (Dimensions.get('window').height * 1)/14 * (15/60), fontFamily: 'Arial Rounded MT Bold', color: '#F8F8F8'}}>36A Thanh Hai</Text>
          </View>
          <View style={styles.viewphone}>
            <Icon name='phone-portrait' style={{color: '#F8F8F8', width: (Dimensions.get('window').height * 1)/14 * (30/60)}}/>  
            <Text style={{fontSize: (Dimensions.get('window').height * 1)/14 * (15/60), fontFamily: 'Arial Rounded MT Bold', color: '#F8F8F8'}}>0900000000</Text>
          </View>
        </View>
        <View style={styles.content}>
          <TouchableOpacity style={styles.changepassword}>
            <Text style={{fontSize: (Dimensions.get('window').height * 1)/14 * (23/60), fontWeight: 'bold', fontFamily: 'Arial Rounded MT Bold'}}>Change Password</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.viewincome}>
            <Text style={{fontSize: (Dimensions.get('window').height * 1)/14 * (23/60), fontWeight: 'bold', fontFamily: 'Arial Rounded MT Bold'}}>Income: $1000</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.viewsaving}>
            <Text style={{fontSize: (Dimensions.get('window').height * 1)/14 * (23/60), fontWeight: 'bold', fontFamily: 'Arial Rounded MT Bold'}}>Saving: 20%</Text>
          </TouchableOpacity>
        </View>
      </View>    
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column'
  },
  header: {
    borderWidth: (Dimensions.get('window').height * 1)/14 * (1/60),
    borderColor: '#FF5148',
    // marginTop: (Dimensions.get('window').height * 1)/20,
    height: (Dimensions.get('window').height * 1)/14 * (375/60),
    width: Dimensions.get('window').width,
    backgroundColor: '#FF5148',
    flexDirection: 'column',
  },
  viewmenuprofile: {
    flexDirection: 'row',
    // marginTop: (Dimensions.get('window').height * 1)/14 * (5/60)
    marginTop: (Dimensions.get('window').height * 1)/20
  },
  button: {
    width: (Dimensions.get('window').height * 1)/14 * (50/60),
    alignItems: 'center',
    justifyContent: 'center'
  },
  iconmenu: {
    color: '#F8F8F8'
  },
  textprofile: {
    width: (Dimensions.get('window').width - ((Dimensions.get('window').height * 1)/14 * (50/60))*2),
    alignItems: 'center',
    justifyContent: 'center'
  },
  viewimage: {
    marginTop: (Dimensions.get('window').height * 1)/14 * (10/60),
    borderRadius: (Dimensions.get('window').height * 1)/14 * (67/60),
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    width: (Dimensions.get('window').height * 1)/14 * (135/60)
  },
  viewname: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: (Dimensions.get('window').height * 1)/14 * (10/60)
  },
  viewaddress: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  },
  viewphone: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  },
  content: {
    width: (Dimensions.get('window').height * 1)/14 * (375/60),
    height: (Dimensions.get('window').height * 1)/14 * (366/60),
    flexDirection: 'column',
    alignItems: 'center'
  },
  changepassword: {
    marginTop: (Dimensions.get('window').height * 1)/14 * (36/60),
    borderWidth: (Dimensions.get('window').height * 1)/14 * (1/60),
    borderColor: 'rgba(0,0,0,0.2)',
    width: (Dimensions.get('window').height * 1)/14 * (310/60),
    height: (Dimensions.get('window').height * 1)/14 * (64/60),
    borderRadius: (Dimensions.get('window').height * 1)/14 * (18/60),
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: 'rgba(0,0,0,0.1)',
    shadowOffset: { width: 4, height: 5 },
    shadowOpacity: 0.9,
    shadowRadius: 2
  },
  viewincome: {
    marginTop: (Dimensions.get('window').height * 1)/14 * (36/60),
    borderWidth: (Dimensions.get('window').height * 1)/14 * (1/60),
    borderColor: 'rgba(0,0,0,0.2)',
    width: (Dimensions.get('window').height * 1)/14 * (310/60),
    height: (Dimensions.get('window').height * 1)/14 * (64/60),
    borderRadius: (Dimensions.get('window').height * 1)/14 * (18/60),
    shadowColor: 'rgba(0,0,0,0.1)',
    shadowOffset: { width: 4, height: 5 },
    shadowOpacity: 0.9,
    shadowRadius: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  viewsaving: {
    marginTop: (Dimensions.get('window').height * 1)/14 * (36/60),
    borderWidth: (Dimensions.get('window').height * 1)/14 * (1/60),
    borderColor: 'rgba(0,0,0,0.2)',
    width: (Dimensions.get('window').height * 1)/14 * (310/60),
    height: (Dimensions.get('window').height * 1)/14 * (64/60),
    borderRadius: (Dimensions.get('window').height * 1)/14 * (18/60),
    shadowColor: 'rgba(0,0,0,0.1)',
    shadowOffset: { width: 4, height: 5 },
    shadowOpacity: 0.9,
    shadowRadius: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  }
})