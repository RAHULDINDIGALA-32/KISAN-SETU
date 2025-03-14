import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';

const Cart = ({ navigation }) => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    // Fetch cart data from the backend
    fetchCartItems();
  }, []);

  const fetchCartItems = async () => {
    // Replace with your backend API endpoint
    const response = await fetch('http://your-backend-api/cart-items');
    const data = await response.json();
    setCartItems(data);
  };

  const handleContinueShopping = () => {
    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      {cartItems.length === 0 ? (
        <View style={styles.emptyCartContainer}>
          <Image source={require('../assets/empty-cart.png')} style={styles.emptyCartImage} />
          <Text style={styles.emptyCartText}>Your cart is Empty</Text>
          <TouchableOpacity style={styles.continueShoppingButton} onPress={handleContinueShopping}>
            <Text style={styles.continueShoppingButtonText}>Continue Shopping</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={cartItems}
          renderItem={({ item }) => (
            <View style={styles.cartItem}>
              <Image source={{ uri: item.image }} style={styles.itemImage} />
              <View style={styles.itemDetails}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemPrice}>${item.price}</Text>
              </View>
            </View>
          )}
          keyExtractor={(item) => item.id}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FDFDFDff',
  },
  emptyCartContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  
    
  },
  emptyCartImage: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  emptyCartText: {
    fontSize: 18,
    color: '#1D3237ff',
    marginBottom: 20,
  },
  continueShoppingButton: {
    backgroundColor: '#D89D5Bff',
    padding: 10,
    borderRadius: 5,
  },
  continueShoppingButtonText: {
    color: '#FDFDFDff',
    fontSize: 16,
  },
  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  itemImage: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    color: '#1D3237ff',
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#D89D5Bff',
  },
});

export default Cart;