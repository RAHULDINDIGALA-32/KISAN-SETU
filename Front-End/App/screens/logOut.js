import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../utils/authContext';

const BASE_URL = 'http://172.17.198.119:3000/api';

const Logout = ({ navigation }) => {
  const { setIsLoggedIn, setUserDetails } = useContext(AuthContext); // Get AuthContext methods

  const handleLogout = async () => {
    try {
      const response = await fetch(`${BASE_URL}/auth/logout`, {
        method: 'POST',
        credentials: 'include', 
      });

      if (response.ok) {
        await AsyncStorage.multiRemove(['isLoggedIn', 'userType', 'userDetails']);
        setIsLoggedIn(false);
        setUserDetails(null);
        navigation.replace('Login');
      } else {
        Alert.alert('Logout Failed', 'Something went wrong, please try again.');
      }
    } catch (error) {
      console.error('Logout Error:', error);
      Alert.alert('Error', 'Failed to connect to the server.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Are you sure you want to logout?</Text>
      <TouchableOpacity style={styles.button} onPress={handleLogout}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 20,
    color: '#1D3237ff',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#D99E5C',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default Logout;
