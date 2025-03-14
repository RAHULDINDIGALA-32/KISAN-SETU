import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import {createDrawerNavigator,DrawerContentScrollView,DrawerItemList, DrawerItem,} from '@react-navigation/drawer';

const Header = ({ navigation }) => {
  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={() => navigation.openDrawer()}>
        <Ionicons name="menu" size={33} color="#1D3237ff" />
      </TouchableOpacity>
      <View style={styles.titleContainer}>
        <Text style={styles.titleKisan}>KISAN</Text>
        <Text style={styles.titleSetu}>SETU</Text>
      </View>
      <TouchableOpacity onPress={() => navigation.navigate('Notifications')}>
        <Ionicons name="notifications-outline" size={30} color="#1D3237ff" marginRight={-20} />
      </TouchableOpacity>
      <TouchableOpacity>
        <FontAwesome name="language" size={30} color="#1D3237ff" marginRight={13} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginTop: 40,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleKisan: {
    marginLeft: -38,
    fontSize: 25,
    fontWeight: 'bold',
    color: '#D99E5C',
  },
  titleSetu: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#76A039',
    marginLeft: 10,
  },
});

export default Header;