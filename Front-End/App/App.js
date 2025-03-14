import React, { useState, useEffect, useCallback } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFocusEffect } from '@react-navigation/native';
import { StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Intro from './screens/intro';
import Header from './components/header';
import Notification from './screens/notify';
import MainDrawer from './components/main_drawer';
import You from './screens/you';
import Login from './screens/login';
import Logout from './screens/logOut';

const Stack = createNativeStackNavigator();

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState(null);

  const checkLoginStatus = async () => {
    try {
      const response = await fetch('http://172.16.216.138:3000/api/auth/status', { 
        method: 'GET',
        credentials: 'include', 
      });

      if (response.ok) {
        const user = await response.json();
        setIsLoggedIn(true);
        setUserType(user.userType);
        await AsyncStorage.setItem('isLoggedIn', 'true');
        await AsyncStorage.setItem('userType', user.userType);
        await AsyncStorage.setItem('userDetails', JSON.stringify(user));
      } else {
        setIsLoggedIn(false);
        setUserType(null);
        await AsyncStorage.removeItem('isLoggedIn');
        await AsyncStorage.removeItem('userType');
        await AsyncStorage.removeItem('userDetails');
      }
    } catch (error) {
      console.error('Failed to check login status:', error);
    }
  };

  useEffect(() => {
    checkLoginStatus();
  }, []);

 
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Intro">
        <Stack.Screen name="Intro" component={Intro} options={{ headerShown: false }} />
        {isLoggedIn ? (
          <Stack.Screen
            name="Main"
            component={(props) => <MainDrawer {...props} userType={userType} />}
            options={{
              header: ({ navigation }) => <Header navigation={navigation} />,
            }}
          />
        ) : (
          <Stack.Screen
            name="Main"
            component={(props) => <MainDrawer {...props} userType={null} />}
            options={{
              header: ({ navigation }) => <Header navigation={navigation} />,
            }}
          />
        )}
        <Stack.Screen name="Notifications" component={Notification} options={{ headerShown: true }} />
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="Logout" component={Logout} options={{ headerShown: false }} />
        <Stack.Screen name="You" component={You} options={{ headerShown: true }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'red',
    fontSize: 20,
  },
});
