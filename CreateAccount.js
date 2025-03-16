import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView, SafeAreaView, KeyboardAvoidingView, Platform, Image
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { launchImageLibrary } from 'react-native-image-picker';

const CreateAccount = ({ navigation }) => {
  const [userType, setUserType] = useState('');
  const [userName, setUserName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [ifscCode, setIfscCode] = useState('');
  const [bankName, setBankName] = useState('');
  const [branchName, setBranchName] = useState('');
  const [bankAddress, setBankAddress] = useState('');
  const [accountHolder, setAccountHolder] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [address, setAddress] = useState('');
  const [gender, setGender] = useState('');
  const [dob, setDob] = useState('');
  const [passbookImage, setPassbookImage] = useState(null);
  const [idProofImage, setIdProofImage] = useState(null);

  const handleRegister = () => {
    if (!userType || !userName || !phoneNumber || !email || !password || !gender || !dob) {
      Alert.alert('Error', 'Please fill all required fields.');
      return;
    }
    
    if (userType === 'Farmer' && (!ifscCode || !bankName || !branchName || !bankAddress || !accountHolder || !accountNumber || !address || !passbookImage || !idProofImage)) {
      Alert.alert('Error', 'Please fill all bank, address, and upload necessary images for Farmer.');
      return;
    }
    
    Alert.alert('Success', 'User Registered');
    navigation.replace('Login');
  };

  const selectImage = (setImage) => {
    launchImageLibrary({ mediaType: 'photo' }, (response) => {
      if (response.assets && response.assets.length > 0) {
        setImage(response.assets[0].uri);
      }
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"} 
        style={styles.container}
      >
        <ScrollView 
          style={styles.scrollContainer} 
          contentContainerStyle={styles.scrollContent} 
          keyboardShouldPersistTaps="handled"
        >
          <Text style={styles.title}>Register</Text>

          <Picker selectedValue={userType} style={styles.picker} onValueChange={setUserType}>
            <Picker.Item label="Select User Type" value="" />
            <Picker.Item label="Buyer" value="Buyer" />
            <Picker.Item label="Farmer" value="Farmer" />
          </Picker>

          <Text style={styles.sectionTitle}>Personal Details</Text>
          <TextInput style={styles.input} placeholder="User Name" value={userName} onChangeText={setUserName} />
          <TextInput style={styles.input} placeholder="Phone Number" keyboardType="numeric" value={phoneNumber} onChangeText={setPhoneNumber} />
          <TextInput style={styles.input} placeholder="Email" keyboardType="email-address" value={email} onChangeText={setEmail} />
          <TextInput style={styles.input} placeholder="Password" secureTextEntry value={password} onChangeText={setPassword} />
          
          <Picker selectedValue={gender} style={styles.picker} onValueChange={setGender}>
            <Picker.Item label="Select Gender" value="" />
            <Picker.Item label="Male" value="Male" />
            <Picker.Item label="Female" value="Female" />
            <Picker.Item label="Other" value="Other" />
          </Picker>

          <TextInput style={styles.input} placeholder="Date of Birth (YYYY-MM-DD)" value={dob} onChangeText={setDob} />
          
          {userType === 'Farmer' && (
            <>
              <Text style={styles.sectionTitle}>Address & Bank Details</Text>
              <TextInput style={styles.input} placeholder="IFSC Code" value={ifscCode} onChangeText={setIfscCode} />
              <TextInput style={styles.input} placeholder="Bank Name" value={bankName} onChangeText={setBankName} />
              <TextInput style={styles.input} placeholder="Branch Name" value={branchName} onChangeText={setBranchName} />
              <TextInput style={styles.input} placeholder="Bank Address" value={bankAddress} onChangeText={setBankAddress} />
              <TextInput style={styles.input} placeholder="Account Holder Name (As per Bank details)" value={accountHolder} onChangeText={setAccountHolder} />
              <TextInput style={styles.input} placeholder="Account Number" value={accountNumber} onChangeText={setAccountNumber} />
              <TextInput style={styles.input} placeholder="Address" value={address} onChangeText={setAddress} />

              <Text style={styles.sectionTitle}>Upload Documents</Text>

              <TouchableOpacity style={styles.uploadButton} onPress={() => selectImage(setPassbookImage)}>
                <Text style={styles.buttonText}>Upload Passbook Proof</Text>
              </TouchableOpacity>
              {passbookImage && <Image source={{ uri: passbookImage }} style={styles.previewImage} />}

              <TouchableOpacity style={styles.uploadButton} onPress={() => selectImage(setIdProofImage)}>
                <Text style={styles.buttonText}>Upload ID Proof</Text>
              </TouchableOpacity>
              {idProofImage && <Image source={{ uri: idProofImage }} style={styles.previewImage} />}
            </>
          )}

          <View style={styles.footerContainer}>
            <TouchableOpacity style={styles.cancelButton} onPress={() => navigation.goBack()}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.submitButton} onPress={handleRegister}>
              <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#fff' },
  container: { flex: 1 },
  scrollContainer: { flex: 1 },
  scrollContent: { flexGrow: 1, padding: 20, paddingBottom: 100 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginTop: 20, marginBottom: 10, color: '#127D41' },
  picker: { height: 55, width: '100%', marginBottom: 20, backgroundColor: '#f0f0f0' },
  input: { width: '100%', borderWidth: 1, borderColor: '#ccc', borderRadius: 5, padding: 12, marginBottom: 10, backgroundColor: '#f9f9f9' },
  uploadButton: { backgroundColor: '#127D41', padding: 12, borderRadius: 5, alignItems: 'center', marginBottom: 10 },
  previewImage: { width: '100%', height: 200, marginTop: 10, borderRadius: 5 },
  footerContainer: { marginTop: 20, flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 12, paddingHorizontal: 20, backgroundColor: '#fff', borderTopWidth: 1, borderColor: '#ccc' },
  cancelButton: { backgroundColor: '#d9534f', padding: 12, borderRadius: 5, alignItems: 'center', flex: 1, marginRight: 5 },
  submitButton: { backgroundColor: '#127D41', padding: 12, borderRadius: 5, alignItems: 'center', flex: 1, marginLeft: 5 },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});

export default CreateAccount;
