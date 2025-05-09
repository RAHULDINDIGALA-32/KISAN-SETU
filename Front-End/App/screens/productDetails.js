import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Alert, Modal, TextInput, FlatList, Dimensions } from 'react-native';

const screenHeight = Dimensions.get('window').height;
const BASE_URL = "http://172.17.198.119:3000/api";
const ProductDetails = ({ route }) => {
  const { product } = route.params;
  const [baskets, setBaskets] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [newBasketName, setNewBasketName] = useState('');

  useEffect(() => {
    fetchBaskets();
  }, []);

  const fetchBaskets = async () => {
    try {
      const response = await fetch(`${BASE_URL}/cart`);
      const data = await response.json();
      setBaskets(data.baskets);
      console.log("fetched Baskets: ", data.baskets[0]["items"][0]);
    } catch (error) {
      console.error('Error fetching baskets:', error);
    }
  };

  const addToBasket = async (basketId) => {
    try {
      await fetch(`${BASE_URL}/cart/addToBasket`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId: product._id, quantity: 1, basketId }),
      });
      Alert.alert('Success', `${product.productName} added to basket.`);
      setModalVisible(false);
    } catch (error) {
      console.error('Error adding to basket:', error);
    }
  };

  const createNewBasket = async () => {
    try {
      const response = await fetch(`${BASE_URL}/cart/createBasket`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ basketName: newBasketName }),
      });
      
      const newBasket = await response.json();
      console.log(newBasket);

      setBaskets([...baskets, newBasket]);
      setNewBasketName('');
      
      addToBasket(newBasket._id);
    } catch (error) {
      console.error('Error creating basket:', error);
    }
  };
  
  return (
    <View style={styles.container}>
      <Image source={{ uri: product.productImage }} style={styles.image} />
      <Text style={styles.name}>{product.productName}</Text>
      <Text style={styles.price}>₹{product.price}</Text>
      <Text style={styles.description}>{product.description}</Text>
      
      <TouchableOpacity style={styles.button} onPress={() => setModalVisible(true)}>
        <Text style={styles.buttonText}>Add to Basket</Text>
      </TouchableOpacity>

      <Modal visible={modalVisible} animationType="slide" 
        onRequestClose={() => setModalVisible(false)} style={styles.modalContainer}
        transparent={true} >
            
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { height: screenHeight / 2.6 }]}>
            <Text style={styles.modalTitle}>Choose a Basket</Text>
            <FlatList
              data={baskets}
              renderItem={({ item }) => (
                <TouchableOpacity style={styles.basketItem} onPress={() => addToBasket(item._id)}>
                  <Text>{item.basketName}</Text>
                </TouchableOpacity>
              )}
              keyExtractor={(item) => item._id}
            />
            <TextInput
              placeholder=" New Basket Name"
              value={newBasketName}
              onChangeText={setNewBasketName}
              style={styles.input}
            />
            <TouchableOpacity style={styles.createButton} onPress={createNewBasket}>
              <Text style={styles.buttonText}>Create & Add</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  image: { width: '100%', height: 250, resizeMode: 'contain' },
  name: { fontSize: 22, fontWeight: 'bold', marginVertical: 10 },
  price: { fontSize: 18, fontWeight: 'bold', color: '#e67e22' },
  description: { fontSize: 16, color: '#555', marginVertical: 10 },
  button: { backgroundColor: '#D99E5C', padding: 15, borderRadius: 5, alignItems: 'center' },
  buttonText: { fontSize: 16, fontWeight: 'bold', color: '#fff' },
  modalContainer: { backgroundColor: '#D99E5C', flex: 1, },
  modalTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginVertical: 10, borderRadius: 5 },
  createButton: { backgroundColor: '#76A039', padding: 10, borderRadius: 5, alignItems: 'center' },
  basketItem: { padding: 10, borderBottomWidth: 1, borderBottomColor: '#ccc',  },
  closeText: { textAlign: 'center', marginTop: 10, color: '#e74c3c', fontSize: 16, fontWeight: 'bold' },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)', 
  },
  modalContent: {
    backgroundColor: 'rgba(255, 255, 255, 0.98)', 
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    elevation: 5,
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default ProductDetails;
