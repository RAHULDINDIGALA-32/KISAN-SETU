import React, { useState, useContext, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, BackHandler, KeyboardAvoidingView, ScrollView, Platform } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { AuthProvider, AuthContext } from '../utils/authContext';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; 

const BASE_URL = 'http://172.17.198.119:3000/api';
const Login = ({ navigation }) => {
  const [userType, setUserType] = useState(null);
  const [userName, setuserName] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false); /
  const { checkLoginStatus } = useContext(AuthContext);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackPress);
    return () => backHandler.remove();
  }, []);

  const handleBackPress = () => {
    navigation.replace('Main', { isLoggedIn: true, userType: userType });
    return true;
  };

  const handleLogin = async () => {
    try {
      const response = await fetch(`${BASE_URL}/auth/login`, {
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
          await checkLoginStatus();
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
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
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
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!isPasswordVisible} // Toggle visibility
          />
          <TouchableOpacity onPress={() => setIsPasswordVisible(!isPasswordVisible)} style={styles.eyeIconContainer}>
            <Icon
              name={isPasswordVisible ? 'eye-off' : 'eye'} // Change icon based on visibility
              size={24}
              color="#888"
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  passwordInput: {
    flex: 1,
    paddingVertical: 10,
  },
  eyeIconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 5,
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







