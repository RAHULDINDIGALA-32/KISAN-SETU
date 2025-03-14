import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated } from 'react-native';

export default function LoadScreen({ navigation }) {
  const fadeInLeft = useRef(new Animated.Value(-200)).current;
  const fadeInRight = useRef(new Animated.Value(200)).current;
  const fadeInOpacity = useRef(new Animated.Value(0)).current;
  const imageScale = useRef(new Animated.Value(0.5)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeInLeft, {
        toValue: 0,
        delay: 800,
        duration: 2000,
        useNativeDriver: true,
      }),
      Animated.timing(fadeInRight, {
        toValue: 0,
        delay: 1800,
        duration: 2000,
        useNativeDriver: true,
      }),
      Animated.timing(fadeInOpacity, {
        toValue: 1,
        delay: 100,
        duration: 2000,
        useNativeDriver: true,
      }),
      Animated.timing(imageScale, {
        toValue: 1,
        delay: 100,
        duration: 2000,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setTimeout(() => {
        navigation.replace('Main'); 
      }, 150);
    });
  }, [fadeInLeft, fadeInRight, fadeInOpacity, imageScale, navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Animated.Text
          style={[
            styles.title,
            {
              transform: [{ translateX: fadeInLeft }],
              opacity: fadeInLeft.interpolate({
                inputRange: [-200, 0],
                outputRange: [0, 1],
              }),
            },
          ]}
        >
          Kisan
        </Animated.Text>
        <Animated.Text
          style={[
            styles.title1,
            {
              transform: [{ translateX: fadeInRight }],
              opacity: fadeInRight.interpolate({
                inputRange: [-200, 0],
                outputRange: [0, 1],
              }),
            },
          ]}
        >
          Setu
        </Animated.Text>
      </View>

      <Animated.Image
        source={require('../assets/logo.jpg')}
        style={[
          styles.logo,
          {
            opacity: fadeInOpacity,
            transform: [{ scale: imageScale }],
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1F3237',
    alignItems: 'center',
    padding: 20,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 125,
    marginBottom: 10,
  },
  title: {
    fontSize: 46,
    fontWeight: 'bold',
    color: '#D9985F',
  },
  title1: {
    fontSize: 45,
    fontWeight: 'bold',
    color: '#70842A',
    marginLeft: 10,
  },
  logo: {
    width: 350,
    height: 350,
    borderRadius: 175,
    resizeMode: 'cover',
    marginBottom: 20,
  },
});