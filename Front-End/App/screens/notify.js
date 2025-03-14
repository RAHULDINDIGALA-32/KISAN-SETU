import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

const Notification = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Fetch notifications from the backend
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    // Replace with your backend API endpoint
    const response = await fetch('http://your-backend-api/notifications');
    const data = await response.json();
    setNotifications(data);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={notifications}
        renderItem={({ item }) => (
          <View style={styles.notificationItem}>
            <Text style={styles.notificationText}>{item.message}</Text>
          </View>
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FDFDFDff',
    padding: 10,
  },
  notificationItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  notificationText: {
    fontSize: 16,
    color: '#1D3237ff',
  },
});

export default Notification;