import React, {Component} from 'react';
import {Text, View, TextInput, StyleSheet, Button, Alert} from 'react-native';
import AsyncStorageLib from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';

export class UserLogin extends Component {
  state = {
    userName: '',
    password: '',
    token: '',
  };

  constructor(props) {
    super(props);
  }

  onSubmit = async () => {
    try {
      if (this.state.userName && this.state.password !== null) {
        this.setState({token: "mojo'sToken"});
        await AsyncStorageLib.setItem('userName', this.state.userName);
        await AsyncStorageLib.setItem('token', "mojo'sToken");
        props.navigation.navigate('Dashboard');
      } else {
        Alert.alert('Inputs Required');
      }
    } catch (err) {
      console.log(err);
    }
  };

  getData = async () => {
    try {
      const value = await AsyncStorageLib.getItem('token');
      if (value !== null) {
        // this.setState({token: value});
        console.log(this.state.token);
      }
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>{this.state.token}</Text>

        <TextInput
          placeholder="Enter User Name"
          style={styles.inputField}
          onChangeText={text => this.setState({userName: text})}
        />
        <TextInput
          placeholder="Enter Password"
          style={styles.inputField}
          onChangeText={text => this.setState({password: text})}
        />
        <Button title="Login" onPress={this.onSubmit} />
        <Button title="get data" onPress={this.getData} />
      </View>
    );
  }
}

export default UserLogin;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputField: {
    borderWidth: 1,
    width: 300,
    padding: 10,
    margin: 5,
  },
});
