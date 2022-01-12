import React, {Component} from 'react';
import {Text, StyleSheet, View, Button} from 'react-native';
import AsyncStorageLib from '@react-native-async-storage/async-storage';

export default class HomeScreen extends Component {
  state = {
    userName: '',
    password: '',
    token: '',
  };

  constructor(props) {
    super(props);
  }

  getData = async () => {
    try {
      const value = await AsyncStorageLib.getItem('token');
      const userName = await AsyncStorageLib.getItem('userName');
      if (value !== null) {
        this.setState({token: value});
        console.log(this.state.token);
      }
      if (userName !== null) {
        this.setState({userName});
      }
    } catch (err) {
      console.log(err);
    }
  };

  signOut = async() => {
    this.state.token !== await AsyncStorageLib.removeItem('token');
  }

  render() {
    return <View style={styles.container}>
        <Text>{this.state.token}</Text>
        <Button title='get token' onPress={this.getData}/>
        <Button title='signed out' onPress={this.signOut}/>
    </View>;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
