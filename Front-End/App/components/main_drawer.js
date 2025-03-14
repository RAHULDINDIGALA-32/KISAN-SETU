import React, { useEffect, useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons'; 
import Home from '../screens/home';
import Cart from '../screens/cart';
import Community from '../screens/community';
import Orders from '../screens/orders';
import Address from '../screens/address';
import ShippingPolicy from '../screens/shippingPolicy';
import ReturnPolicy from '../screens/returnPolicy';
import RefundPolicy from '../screens/refundPolicy';
import ContactUs from '../screens/contact';
import About from '../screens/about';
import ShareApp from '../screens/share';
import RateApp from '../screens/rate';
import Logout from '../screens/logOut';
import Shop from '../screens/shop';
import Dashboard from '../screens/dashboard';
import You from '../screens/you';
import CustomDrawerContent from './drawerContent';

const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

function BuyerTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Cart') {
            iconName = focused ? 'cart' : 'cart-outline';
          } else if (route.name === 'Community') {
            iconName = focused ? 'people' : 'people-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: 'tomato',
        inactiveTintColor: 'gray',
      }}
    >
      <Tab.Screen name="Home" component={Home} options={{ headerShown: false }} />
      <Tab.Screen name="Cart" component={Cart} options={{ headerShown: false }} />
      <Tab.Screen name="Community" component={Community} options={{ headerShown: false }} /> 
    </Tab.Navigator>
  );
}

function FarmerTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Shop') {
            iconName = focused ? 'storefront' : 'storefront-outline';
          } else if (route.name === 'Dashboard') {
            iconName = focused ? 'stats-chart' : 'stats-chart-outline';
          } else if (route.name === 'Community') {
            iconName = focused ? 'people' : 'people-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: 'tomato',
        inactiveTintColor: 'gray',
      }}
    >
      <Tab.Screen name="Home" component={Home} options={{ headerShown: false }} />
      <Tab.Screen name="Shop" component={Shop} options={{ headerShown: false }} />
      <Tab.Screen name="Dashboard" component={Dashboard} options={{ headerShown: false }} />
      <Tab.Screen name="Community" component={Community} options={{ headerShown: false }} /> 
    </Tab.Navigator>
  );
}

function DefaultTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'You') {
            iconName = focused ? 'person' : 'person-outline';
          } else if (route.name === 'Community') {
            iconName = focused ? 'people' : 'people-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: 'tomato',
        inactiveTintColor: 'gray',
      }}
    >
      <Tab.Screen name="Home" component={Home} options={{ headerShown: false }} />
      <Tab.Screen name="You" component={You} options={{ headerShown: false }} />
      <Tab.Screen name="Community" component={Community} options={{ headerShown: false }} /> 
    </Tab.Navigator>
  );
}

export default function DrawerNavigator({ userType }) {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      swipeEnabled={true} 
    >
      {userType === 'Buyer' && (
        <Drawer.Screen name="MainTabs" component={BuyerTabs} options={{ drawerItemStyle: { display: "none" }, headerShown: false }} />
      )}
      {userType === 'Farmer' && (
        <Drawer.Screen name="MainTabs" component={FarmerTabs} options={{ drawerItemStyle: { display: "none" }, headerShown: false }} />
      )}
      {userType === null && (
        <Drawer.Screen name="MainTabs" component={DefaultTabs} options={{ drawerItemStyle: { display: "none" }, headerShown: false }} />
      )}
      <Drawer.Screen name="Orders" component={Orders} options={{ headerShown: false }} />
      <Drawer.Screen name="Address" component={Address} options={{ headerShown: false }} />
      <Drawer.Screen name="ShippingPolicy" component={ShippingPolicy} options={{ headerShown: false }} />
      <Drawer.Screen name="ReturnPolicy" component={ReturnPolicy} options={{ headerShown: false }} />
      <Drawer.Screen name="RefundPolicy" component={RefundPolicy} options={{ headerShown: false }} />
      <Drawer.Screen name="ContactUs" component={ContactUs} options={{ headerShown: false }} />
      <Drawer.Screen name="About" component={About} options={{ headerShown: false }} />
      <Drawer.Screen name="ShareApp" component={ShareApp} options={{ headerShown: false }} />
      <Drawer.Screen name="RateApp" component={RateApp} options={{ headerShown: false }} />
      <Drawer.Screen name="Logout" component={Logout} options={{ headerShown: false }} />
    </Drawer.Navigator>
  );
}