import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = ({ navigation }) => {
  const [userType, setUserType] = useState(null);
  const [userName, setuserName] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await fetch('http://172.16.216.138:3000/api/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userType, userName, password }),
        credentials: 'include', 
      });
  
      const text = await response.text();
  
      try {
        const data = JSON.parse(text);
        if (response.ok) {
          await AsyncStorage.setItem('isLoggedIn', 'true');
          await AsyncStorage.setItem('userType', userType);
          await AsyncStorage.setItem('userDetails', JSON.stringify(data.user));
  
          navigation.replace('Main', { isLoggedIn: true, userType: userType });
        } else {
          Alert.alert('Login Failed', data.message);
        }
      } catch (jsonError) {
        console.error("JSON Parse Error:", jsonError);
        Alert.alert("Login Failed", "Invalid Credentials.");
      }
    } catch (error) {
      console.error("Network Error:", error);
      Alert.alert("Login Failed", "An error occurred. Please try again.");
    }
  };
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <Picker
        selectedValue={userType}
        style={styles.picker}
        onValueChange={(itemValue) => setUserType(itemValue)}
        mode="dropdown"
        
      >
        <Picker.Item label="Select User Type" value="" />
        <Picker.Item label="Buyer" value="Buyer" />
        <Picker.Item label="Farmer" value="Farmer" />
      </Picker>
      <TextInput
        style={styles.input}
        placeholder="UserName"
        value={userName}
        onChangeText={setuserName}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
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
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  picker: {
    height: 54,
    width: '100%',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#D99E5C',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    width: '100%',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default Login;