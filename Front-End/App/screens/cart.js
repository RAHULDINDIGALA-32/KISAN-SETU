{/*
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';

const BASE_URL = 'http://172.17.198.119:3000/api';

const Cart = ({ navigation }) => {
  const [baskets, setBaskets] = useState([]);

  useEffect(() => {
    fetchBaskets();
  }, []);

  const handleContinueShopping = () => {
    navigation.navigate('Home');
  };

  const fetchBaskets = async () => {
    try {
      const response = await fetch(`${BASE_URL}/cart`);
      const data = await response.json();
      setBaskets(data.baskets || []);
    } catch (error) {
      console.error('Error fetching baskets:', error);
    }
  };

  const deleteBasket = async (basketId) => {
    try {
      await fetch(`http://172.17.252.61:3000/api/cart/deleteBasket/${basketId}`, { method: 'DELETE' });
      setBaskets(baskets.filter((basket) => basket._id !== basketId));
    } catch (error) {
      console.error('Error deleting basket:', error);
    }
  };

  const calculateTotalPrice = (items) => {
    return items.reduce((sum, item) => sum + (item.productId?.price || 0) * item.quantity, 0);
  };

  return (
    <View style={styles.container}>
      {baskets.length === 0 ? (
        <View style={styles.emptyCartContainer}>
          <Image source={require('../assets/empty-cart.png')} style={styles.emptyCartImage} />
          <Text style={styles.emptyCartText}>Your Basket is Empty</Text>
          <TouchableOpacity style={styles.continueShoppingButton} onPress={handleContinueShopping}>
            <Text style={styles.continueShoppingButtonText}>Continue Shopping</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={baskets}
          renderItem={({ item }) => (
            <View style={styles.basketContainer}>
              <Text style={styles.basketTitle}>{item.basketName}</Text>

              <FlatList
                data={item.items}
                renderItem={({ item }) => (
                  <View style={styles.itemContainer}>
                    <Image source={{ uri: item.productId?.productImage }} style={styles.itemImage} />
                    <View style={styles.itemDetails}>
                      <Text style={styles.itemName}>{item.productId?.productName}</Text>
                      <Text style={styles.itemPrice}>₹{item.productId?.price}</Text>
                      <Text style={styles.itemQuantity}>Quantity: {item.quantity}</Text>
                    </View>
                  </View>
                )}
                keyExtractor={(item) => item._id}
              />

              <Text style={styles.total}>Total: ₹{calculateTotalPrice(item.items)}</Text>

              <TouchableOpacity style={styles.orderButton}>
                <Text style={styles.orderButtonText}>Order Now</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.deleteButton} onPress={() => deleteBasket(item._id)}>
                <Text style={styles.deleteButtonText}>Delete Basket</Text>
              </TouchableOpacity>
            </View>
          )}
          keyExtractor={(item) => item._id}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FDFDFD',
    padding: 10,
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
    color: '#1D3237',
    marginBottom: 20,
  },
  continueShoppingButton: {
    backgroundColor: '#D89D5B',
    padding: 12,
    borderRadius: 5,
  },
  continueShoppingButtonText: {
    color: '#FDFDFD',
    fontSize: 16,
    fontWeight: 'bold',
  },
  basketContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  basketTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1D3237',
    marginBottom: 10,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F8F8',
    padding: 10,
    borderRadius: 8,
    marginVertical: 5,
  },
  itemImage: {
    width: 50,
    height: 50,
    borderRadius: 5,
    marginRight: 10,
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1D3237',
  },
  itemPrice: {
    fontSize: 14,
    color: '#D89D5B',
  },
  itemQuantity: {
    fontSize: 14,
    color: '#1D3237',
  },
  total: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#D89D5B',
    marginTop: 10,
  },
  orderButton: {
    backgroundColor: '#1D3237',
    padding: 12,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  orderButtonText: {
    color: '#FDFDFD',
    fontSize: 16,
    fontWeight: 'bold',
  },
  deleteButton: {
    backgroundColor: '#D9534F',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  deleteButtonText: {
    color: '#FDFDFD',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Cart;

*/}

import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

const BASE_URL = 'http://172.17.198.119:3000/api';

const Cart = ({ navigation }) => {
  const [baskets, setBaskets] = useState([]);

  useFocusEffect(
    useCallback(() => {
      fetchBaskets();
    }, [])
  );

  const handleContinueShopping = () => {
    navigation.navigate('Home');
  };

  const fetchBaskets = async () => {
    try {
      const response = await fetch(`${BASE_URL}/cart`);
      const data = await response.json();
      setBaskets(data.baskets || []);
    } catch (error) {
      console.error('Error fetching baskets:', error);
    }
  };

  const deleteBasket = async (basketId) => {
    try {
      await fetch(`${BASE_URL}/cart/deleteBasket/${basketId}`, { method: 'DELETE' });
      setBaskets(baskets.filter((basket) => basket._id !== basketId));
    } catch (error) {
      console.error('Error deleting basket:', error);
    }
  };

  const calculateTotalPrice = (items) => {
    return items.reduce((sum, item) => sum + (item.productId?.price || 40) * item.quantity, 0);
  };

  return (
    <View style={styles.container}>
      {baskets.length === 0 ? (
        <View style={styles.emptyCartContainer}>
          <Image source={require('../assets/empty-cart.png')} style={styles.emptyCartImage} />
          <Text style={styles.emptyCartText}>Your Cart is Empty</Text>
          <TouchableOpacity style={styles.continueShoppingButton} onPress={handleContinueShopping}>
            <Text style={styles.continueShoppingButtonText}>Continue Shopping</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={baskets}
          renderItem={({ item }) => (
            <View style={styles.basketContainer}>
              <Text style={styles.basketTitle}>{item.basketName}</Text>

              <FlatList
                data={item.items}
                renderItem={({ item }) => (
              
                  <View style={styles.itemContainer}>
                    <Image source={{ uri: item.productId?.productImage }} style={styles.itemImage} />
                    <View style={styles.itemDetails}>
                      <Text style={styles.itemName}>{item.productId?.productName}</Text>
                     
                      
                    </View>
                  </View>
                )}
                keyExtractor={(item) => item._id}
              />

              <Text style={styles.total}>Total: ₹40</Text>

              <TouchableOpacity style={styles.orderButton}>
                <Text style={styles.orderButtonText}>Order Now</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.deleteButton} onPress={() => deleteBasket(item._id)}>
                <Text style={styles.deleteButtonText}>Delete Basket</Text>
              </TouchableOpacity>
            </View>
          )}
          keyExtractor={(item) => item._id}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FDFDFD',
    padding: 10,
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
    color: '#1D3237',
    marginBottom: 20,
  },
  continueShoppingButton: {
    backgroundColor: '#D89D5B',
    padding: 12,
    borderRadius: 5,
  },
  continueShoppingButtonText: {
    color: '#FDFDFD',
    fontSize: 16,
    fontWeight: 'bold',
  },
  basketContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  basketTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1D3237',
    marginBottom: 10,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F8F8',
    padding: 10,
    borderRadius: 8,
    marginVertical: 5,
  },
  itemImage: {
    width: 50,
    height: 50,
    borderRadius: 5,
    marginRight: 10,
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1D3237',
  },
  itemPrice: {
    fontSize: 14,
    color: '#D89D5B',
  },
  itemQuantity: {
    fontSize: 14,
    color: '#1D3237',
  },
  total: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#D89D5B',
    marginTop: 10,
  },
  orderButton: {
    backgroundColor: '#1D3237',
    padding: 12,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  orderButtonText: {
    color: '#FDFDFD',
    fontSize: 16,
    fontWeight: 'bold',
  },
  deleteButton: {
    backgroundColor: '#D9534F',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  deleteButtonText: {
    color: '#FDFDFD',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Cart;

