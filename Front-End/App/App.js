import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Intro from './screens/intro';
import Header from './components/header';
import Notification from './screens/notify';
import MainDrawer from './components/main_drawer';
import You from './screens/you';
import Login from './screens/login';
import Logout from './screens/logOut';
import ProductDetails from './screens/productDetails';
import { AuthProvider, AuthContext  } from './utils/authContext';
const Stack = createNativeStackNavigator();

function AppNavigator() {
  const { isLoggedIn, userDetails } = useContext(AuthContext);
 
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Intro">
        <Stack.Screen name="Intro" component={Intro} options={{ headerShown: false }} />
        {isLoggedIn ? (
          <Stack.Screen
            name="Main"
            component={(props) => <MainDrawer {...props} userType={userDetails.userType} />}
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
        <Stack.Screen name="ProductDetails" component={ProductDetails} options={{ title: 'Product Details' }} />
        <Stack.Screen name="Notifications" component={Notification} options={{ headerShown: true }} />
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="Logout" component={Logout} options={{ headerShown: false }} />
        <Stack.Screen name="You" component={You} options={{ headerShown: true }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}





export default function App() {
  return (
    <AuthProvider>
      <AppNavigator />
    </AuthProvider>
  );
}
    