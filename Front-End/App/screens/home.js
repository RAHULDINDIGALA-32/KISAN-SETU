import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TextInput, ScrollView, TouchableOpacity } from 'react-native';

const Home = () => {
  const [trendingItems, setTrendingItems] = useState([]);
  const [availableItems, setAvailableItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredItems, setFilteredItems] = useState([]);

  useEffect(() => {
    fetchTrendingItems();
    fetchAvailableItems();
  }, []);

  const fetchTrendingItems = async () => {
    try {
      const response = await fetch('http://172.16.216.138:3000/api/products/trending');
      if (!response.ok) throw new Error("Failed to fetch trending products");
      
      const data = await response.json();
      console.log("Trending Data:", data);
      setTrendingItems(data);
    } catch (error) {
      console.error("Error fetching trending items:", error);
    }
  };
  
  const fetchAvailableItems = async () => {
    try {
      const response = await fetch('http://172.16.216.138:3000/api/products');
      if (!response.ok) throw new Error("Failed to fetch available products");
      
      const data = await response.json();
      console.log("Available Products:", data);
      setAvailableItems(data);
    } catch (error) {
      console.error("Error fetching available items:", error);
    }
  };
  
  return (
    <ScrollView style={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder="Search"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

    
      <Text style={styles.sectionTitle}>Flash Sale</Text>
      <FlatList
        horizontal
        data={trendingItems}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.trendingItem}>
            <Image source={{ uri: item.productImage }} style={styles.trendingImage} />
            <Text style={styles.itemName}>{item.productName}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item._id}
        showsHorizontalScrollIndicator={false}
      />

  
      <Text style={styles.sectionTitle}>Available Items</Text>
      <FlatList
        data={searchQuery ? filteredItems : availableItems}
        numColumns={2}
        columnWrapperStyle={styles.row}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card}>
            <Image source={{ uri: item.productImage }} style={styles.itemImage} />
            <Text style={styles.itemName}>{item.productName}</Text>
            <Text style={styles.itemPrice}>₹{item.price}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item._id}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
  },
  searchBar: {
    margin: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
    textAlign: 'left',
  },
  trendingItem: {
    width: 120,
    marginRight: 10,
    alignItems: 'center',
  },
  trendingImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  row: {
    justifyContent: 'space-between',
  },
  card: {
    flex: 1,
    backgroundColor: '#fff',
    margin: 10,
    borderRadius: 10,
    padding: 10,
    elevation: 2, // Adds shadow
    alignItems: 'center',
  },
  itemImage: {
    width: 120,
    height: 120,
    borderRadius: 10,
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 5,
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#e67e22',
  },
});

export default Home;