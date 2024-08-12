import { StyleSheet, Pressable, SafeAreaView} from 'react-native';
import React from 'react';
import { Text, View } from '@/components/Themed';
import BatchTable from '@/components/BatchTable';
import {Item} from '../../components/iItem';
import alert from '../../components/Alert';

const getItemsFromLocalStorage = () => {
    const items = localStorage.getItem('items');
    console.log(items)
    return items ? JSON.parse(items) : [];
};

const startBatch = () =>{

    let items: Array<Item> = getItemsFromLocalStorage()
    console.log(items.length)
    if (items.length == 0){
        alert("Oops! The batch is empty", "Please add items to your batch and try again.", ["ok", "cancel"])
    }
    else{
        window.open('/RunBatch','_self') //This isn't a good way to do this, but it works
    }
    
}


export default function TabOneScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Items in Batch</Text>
            <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
            <SafeAreaView style={styles.container}>
                <BatchTable data={getItemsFromLocalStorage()} />
            </SafeAreaView>
            <Pressable 
                onPress={() => startBatch()}
                style={({ pressed }) => [ 
                {
                    backgroundColor: pressed ? '#0048ac' : '#006bff',
                },
                styles.pressable
            ]}>
                <Text style={styles.text}>Run Batch</Text>
            </Pressable>  
    
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
