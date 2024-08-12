import {Button, Pressable, StyleSheet} from 'react-native';
import { Text, View } from '@/components/Themed';
import {ImageComponent } from '../components/ImageUtil';
import { useState } from 'react';
import {sortBatch} from '../components/BatchSorter';
import { Item } from '@/components/iItem';


export default function RunBatchScreen() {
    const storedItems = JSON.parse(localStorage.getItem('items') || '[]'); 
    const sortedBatch: Item[] = sortBatch(storedItems)
    const [currentIndex, setCurrentIndex] = useState(0);
    console.log("sorted", sortedBatch)
 
    
    const handleNext = () => {
      if (currentIndex < sortedBatch.length - 1) {
        decrementCount(sortedBatch[currentIndex]._id)
        setCurrentIndex(currentIndex + 1);
        
      }
      else{
        window.open('/FinishedBatch', '_self')
      }
    };

    const handleDNF = () => {
        
        let DNF = JSON.parse(localStorage.getItem('DNF') || '[]');
        DNF.push(sortedBatch[currentIndex]);
        localStorage.setItem('DNF', JSON.stringify(DNF));
        console.log("DNF", DNF)
        
        if (currentIndex < sortedBatch.length - 1)
        setCurrentIndex(currentIndex + 1);
        else{
            window.open('/FinishedBatch')
        }
    }

    const decrementCount = async (id: string) => {
        try {
          const response = await fetch(`http://localhost:5000/decrement-count/${id}`, {
            method: 'GET',
          });
      
          const result = await response.json();
      
          if (response.ok) {
            console.log('Success', `Count updated successfully for item: ${id}`);
          } else {
            console.log('Error', result.error || 'Failed to update count');
          }
        } catch (error) {
          console.log('Error', error)
        }
      };
  
    return (
      <View style={styles.container}>
        <ImageComponent 
            filename={sortedBatch[currentIndex].image_path} 
            imageStyle={{ width: 200, height: 400 }}
        />
        <Text style={styles.text}>{sortedBatch[currentIndex]._id}</Text>
        <Text style={styles.text}>{sortedBatch[currentIndex].item_name}</Text>
        <Text style={styles.text}>{sortedBatch[currentIndex].shelf_location}</Text>
        <Text style={styles.text}>{sortedBatch[currentIndex].count}</Text>
        <Text style={styles.text}>{sortedBatch[currentIndex].price}</Text>
        <Text style={styles.text}>{sortedBatch[currentIndex].category}</Text>
        <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
        <View style={styles.buttonContainer}>
        <Pressable 
                onPress={() => handleDNF()}
                style={({ pressed }) => [ 
                {
                    backgroundColor: pressed ? '#0048ac' : '#006bff',
                },
                styles.pressable
            ]}>
                <Text style={styles.text}>Did not Find</Text>
        </Pressable>
        <Pressable 
                onPress={() => handleNext()}
                style={({ pressed }) => [ 
                {
                    backgroundColor: pressed ? '#0048ac' : '#006bff',
                },
                styles.pressable
            ]}>
                <Text style={styles.text}>Next</Text>
        </Pressable>  
        </View>
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    separator: {
      marginVertical: 30,
      height: 1,
      width: '80%',
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '80%',
    },
    pressable: {
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    text: {
        fontSize: 16,
        color: 'black',
    },
  });