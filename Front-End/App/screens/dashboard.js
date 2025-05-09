import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';


const BASE_URL = 'http://172.17.198.119:3000/api';

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await fetch(`${BASE_URL}/dashboard`); 
      if (!response.ok) throw new Error('Failed to fetch stats');

      const data = await response.json();
      setStats({
        productsListed: data.totalProducts, 
        totalSales: data.totalSales,
        totalRevenue: data.totalRevenue,
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <ActivityIndicator size="large" color="#D99E5C" style={styles.loader} />;
  if (error) return <Text style={styles.errorText}>{error}</Text>;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dashboard</Text>

      <View style={styles.card}>
        <Text style={styles.statLabel}>Products Listed</Text>
        <Text style={styles.statValue}>{stats.productsListed}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.statLabel}>Total Sales</Text>
        <Text style={styles.statValue}>{stats.totalSales}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.statLabel}>Total Revenue</Text>
        <Text style={styles.statValue}>₹{stats.totalRevenue}</Text>
      </View>
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
  card: {
    backgroundColor: '#FAF3E3',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 18,
    color: '#555',
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#D99E5C',
  },
  loader: {
    marginTop: 50,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    fontSize: 16,
    marginTop: 20,
  },
});

export default Dashboard;
