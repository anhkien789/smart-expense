import React from "react";
import {
    Text,
    AppRegistry,
    StyleSheet,
    View,
    Dimensions,
    TouchableOpacity
  } from 'react-native';
import { Container, Header, Content, Accordion, Icon } from "native-base";
const dataArray = [
  { title: "Le Minh Trung Kien", content: '+Specific Jobs: Coder & Designer\n\n+Email: s3651471@rmit.edu.vn'  },
  { title: "Nguyen Quoc Khanh", content: '+Specific Jobs: Coder for Back-end\n\n+Email: s3651072@rmit.edu.vn' },
  { title: "Vu Dinh Hoang", content: '+Specific Jobs: Project Manager\n\n+Email: s3681437@rmit.edu.vn'},
  { title: "Ninh Ngoc Phuong Trung", content: '+Specific Jobs: Coder & Designer\n\n+Email: s3574912@rmit.edu.vn' }
];

export default class InfoPage extends React.Component {
  render() {
    return (
      // <Container style={styles.container}>
      //   <Header style={styles.header}>
      //     <Text style={styles.headerText} >Team Information</Text> 
      //   </Header>
      //   <Content padde style={styles.content}>
      //     <Accordion 
      //     dataArray={dataArray} 
      //     icon="add"
      //     expandedIcon="remove"
      //     style={styles.accordion}/>
      //   </Content>
      // </Container>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.button} onPress={()=> this.props.navigate('Login')}>
            <Icon name='arrow-back' style={styles.iconarrow}/>
            <Text style={{color: 'black', fontSize: (Dimensions.get('window').height * 1)/14 * (20/60)}}>Back</Text>
          </TouchableOpacity>
          <View style={styles.textinformation}>
            <Text style={{fontSize: (Dimensions.get('window').height * 1)/14 * (20/60), fontWeight: 'bold', fontFamily: 'Arial Rounded MT Bold', color: 'black'}}>Information Team</Text>
          </View>
        </View>
        <View style={styles.content}>
          <Accordion 
            dataArray={dataArray} 
            icon="add"
            expandedIcon="remove"
            style={styles.accordion}
          />
        </View>
      </View>
    );
  }
}

const styles=StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: '#ff5148',
    flexDirection: 'column',
    alignItems: 'center'  
  },
  header:{
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
    height: (Dimensions.get('window').height * 1)/14 * (44/60),
    width: (Dimensions.get('window').height * 1)/14 * (70/60),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  iconarrow: {
    color: 'black'
  },
  textinformation: {
    width: (Dimensions.get('window').width - ((Dimensions.get('window').height * 1)/14 * (70/60))*2),
    alignItems: 'center'
  },
  content:{
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
  accordion:{
    marginTop: (Dimensions.get('window').height * 1)/14 * (50/60),
    width: (Dimensions.get('window').height * 1)/14 * (364/60),
    height: (Dimensions.get('window').height * 1)/14 * (626/60)
  },
})