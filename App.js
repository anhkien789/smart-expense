// /**
//  * Sample React Native App
//  * https://github.com/facebook/react-native
//  *
//  * @format
//  * @flow
//  * @lint-ignore-every XPLATJSCOPYRIGHT1
//  */

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

import React, { Component } from 'react';
import { Container, Header, Content, Form, Item, Input, Label, Footer, Text, Button } from 'native-base';
export default class FixedLabelExample extends Component {
  render() {
    return (
      <Container>
        <Header> 
          <Text> Smart Expense</Text>
        </Header>
        <Content>
          <Form>
            <Item fixedLabel>
              <Label>Username</Label>
              <Input />
            </Item>
            <Item fixedLabel last>
              <Label>Password</Label>
              <Input />
            </Item>
          </Form>
        </Content>
        <Footer>
          <Button>
            <Text>Start</Text>
          </Button>
        </Footer>
      </Container>
    );
  }
}