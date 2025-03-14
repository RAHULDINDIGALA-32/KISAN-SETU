import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity, Image } from 'react-native';

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [newProductName, setNewProductName] = useState('');
  const [newProductPrice, setNewProductPrice] = useState('');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('http://172.16.216.138:3000/api/shop'); 
      const data = await response.json();
      setProducts(data.products); 
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleAddProduct = async () => {
    try {
      const response = await fetch('http://172.16.216.138:3000/api/shop/addProduct', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productName: newProductName,
          productImage: "https://via.placeholder.com/150", 
          price: newProductPrice,
          quantity: 1,
          description: "Sample product description"
        }),
      });

      const newProduct = await response.json();
      setProducts([newProduct, ...products]);
      setNewProductName('');
      setNewProductPrice('');
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}> Your Shop</Text>
      
      <FlatList
        data={products}
        renderItem={({ item }) => (
          <View style={styles.productItem}>
            <Image source={{ uri: item.productImage }} style={styles.productImage} />
            <View style={styles.productDetails}>
              <Text style={styles.productName}>{item.productName}</Text>
              <Text style={styles.productPrice}>₹{item.price} per kg</Text>
              <Text style={styles.productPrice}>Available: {item.quantity} kg</Text>
            </View>
          </View>
        )}
        keyExtractor={(item) => item._id} 
      />

      <TextInput
        style={styles.input}
        placeholder="Product Name"
        value={newProductName}
        onChangeText={setNewProductName}
      />
      <TextInput
        style={styles.input}
        placeholder="Product Price"
        value={newProductPrice}
        onChangeText={setNewProductPrice}
        keyboardType="numeric"
      />
      <TouchableOpacity style={styles.button} onPress={handleAddProduct}>
        <Text style={styles.buttonText}>Add Product</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  productItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  productImage: {
    width: 60,
    height: 60,
    marginRight: 10,
    borderRadius: 5,
  },
  productDetails: {
    flex: 1,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  productPrice: {
    fontSize: 16,
    color: '#555',
  },
  input: {
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
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default Shop;
