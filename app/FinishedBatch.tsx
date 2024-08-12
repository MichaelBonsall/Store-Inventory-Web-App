import {Pressable, SafeAreaView, StyleSheet} from 'react-native';
import { Text, View } from '@/components/Themed';

import BatchTable from '@/components/BatchTable';


const getItemsFromLocalStorage = () => {
    const items = localStorage.getItem('DNF');
    console.log(items)
    return items ? JSON.parse(items) : [];
};

const returnToMain = () => {
    localStorage.removeItem('DNF')
    localStorage.removeItem('items')
    window.open('/', '_self')
}

export default function FinishedBatchScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Batch Complete</Text>
            <Text style = {styles.subtitle}> Here are the items that were marked as DNF</Text>
            <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
            <SafeAreaView style={styles.container}>
                <BatchTable data={getItemsFromLocalStorage()} />
            </SafeAreaView>
            <Pressable 
                onPress={() => returnToMain()}
                style={({ pressed }) => [ 
                {
                    backgroundColor: pressed ? '#0048ac' : '#006bff',
                },
                styles.pressable
            ]}>
                <Text style={styles.text}>Click here to return to the main menu</Text>
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
    subtitle: {
        fontSize: 15,
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