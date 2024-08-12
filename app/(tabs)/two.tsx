import { StyleSheet } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Text, View } from '@/components/Themed';
import DBTable from '../../components/DBTable';
import { SafeAreaView } from 'react-native';

export default function TabTwoScreen() {

  const [data, setData] = useState([{}]);

  useEffect(() => {
    fetch("http://localhost:5000/get-data")
      .then(res => res.json())
      .then(data => {
        setData(data);
        console.log(data);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);



  return (
    <View style={styles.container}>
      <Text style={styles.title}>Database</Text>
      <SafeAreaView style={styles.container}>
      <DBTable data={data} />
      </SafeAreaView>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});