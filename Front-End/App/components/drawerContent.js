import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';
import { AuthContext, AuthProvider } from '../utils/authContext';  
const CustomDrawerContent = (props) => {
  const { userDetails } = useContext(AuthContext);  

  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.userDetailsContainer}>
        <Ionicons name="person-circle-outline" size={80} color="#1D3237ff" />
        <Text style={styles.userName}>{userDetails?.userName || "Guest"}</Text>
        <Text style={styles.userPhone}>{userDetails?.phoneNo || "No Phone"}</Text>
        <Text style={styles.userType}>{userDetails?.userType || "Unknown"}</Text>
      </View>
      <View style={styles.section}>
        <DrawerItem
          label="Orders"
          onPress={() => props.navigation.navigate('Orders')}
          icon={() => <Ionicons name="list-outline" size={24} color="#1D3237ff" />}
        />
        <DrawerItem
          label="Address"
          onPress={() => props.navigation.navigate('Address')}
          icon={() => <Ionicons name="location-outline" size={24} color="#1D3237ff" />}
        />
      </View>
      <Text style={styles.sectionHeading}>Policy Information</Text>
      <View style={styles.section}>
        <DrawerItem
          label="Shipping Policy"
          onPress={() => props.navigation.navigate('ShippingPolicy')}
          icon={() => <Ionicons name="document-text-outline" size={24} color="#1D3237ff" />}
        />
        <DrawerItem
          label="Return Policy"
          onPress={() => props.navigation.navigate('ReturnPolicy')}
          icon={() => <Ionicons name="document-text-outline" size={24} color="#1D3237ff" />}
        />
        <DrawerItem
          label="Refund Policy"
          onPress={() => props.navigation.navigate('RefundPolicy')}
          icon={() => <Ionicons name="document-text-outline" size={24} color="#1D3237ff" />}
        />
      </View>
      <Text style={styles.sectionHeading}>Feedback</Text>
      <View style={styles.section}>
        <DrawerItem
          label="Contact Us"
          onPress={() => props.navigation.navigate('ContactUs')}
          icon={() => <Ionicons name="call-outline" size={24} color="#1D3237ff" />}
        />
        <DrawerItem
          label="About"
          onPress={() => props.navigation.navigate('About')}
          icon={() => <Ionicons name="information-circle-outline" size={24} color="#1D3237ff" />}
        />
        <DrawerItem
          label="Share App"
          onPress={() => props.navigation.navigate('ShareApp')}
          icon={() => <Ionicons name="share-outline" size={24} color="#1D3237ff" />}
        />
        <DrawerItem
          label="Rate App"
          onPress={() => props.navigation.navigate('RateApp')}
          icon={() => <Ionicons name="star-outline" size={24} color="#1D3237ff" />}
        />
      </View>
      <View style={styles.section}>
        <DrawerItem
          label="Logout"
          onPress={() => props.navigation.navigate('Logout')}
          icon={() => <Ionicons name="log-out-outline" size={24} color="#1D3237ff" />}
        />
      </View>
    </DrawerContentScrollView>
  );
};




const styles = StyleSheet.create({
  userDetailsContainer: {
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1D3237ff',
  },
  userPhone: {
    fontSize: 16,
    color: '#1D3237ff',
  },
  userType: {
    fontSize: 16,
    color: '#D99E5C',
  },
  section: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginVertical: 10,
  },
  sectionHeading: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1D3237ff',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
});

export default CustomDrawerContent;
