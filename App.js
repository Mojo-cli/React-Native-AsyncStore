import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import HomeScreen from './app/screens/HomeScreen';
import UserLogin from './app/screens/UserLogin';
import AsyncStorageLib from '@react-native-async-storage/async-storage';

const Stack = createNativeStackNavigator();

export default class App extends React.Component {
  state = {
    userName: '',
    password: '',
    token: '',
    isToken: null,
  };

  constructor(props) {
    super(props);
  }

  async componentDidMount() {
    try {
      console.log(this.state.token);
      const value = await AsyncStorageLib.getItem('token');
      const userName = await AsyncStorageLib.getItem('userName');
      if (value !== null) {
        this.setState({token: value});
        this.setState({isToken: value});
        console.log(this.state.token);
      }
      if (userName !== null) {
        this.setState({userName});
      }
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    return this.state.isToken === null ? (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="User Login" component={UserLogin} />
          <Stack.Screen name="Dashboard" component={HomeScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    ) : (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Dashboard" component={HomeScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
