import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ReturnPolicy = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Return Policy Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 20,
    color: '#1D3237ff',
  },
});

export default ReturnPolicy;