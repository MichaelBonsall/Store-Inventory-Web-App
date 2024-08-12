
import { View, Text, FlatList, StyleSheet, ListRenderItem, Alert, Pressable } from 'react-native';
import {Item} from './iItem'
import {ImageComponent } from './ImageUtil';
import alert from './Alert';

interface TableProps {
    data: any;
}

const addItem = async (item: Item) => {
    if (item.count === '0') alert("Oops! This item is out of stock", "", ["ok", "cancel"]);
    try {
        const response = await fetch('http://localhost:5000/add-to-batch', { //making sure that the ID is valid, in case server changes and client doesnt
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
        body: JSON.stringify({_id: item._id}),
        });
      const result = await response.json();
      if (response.ok) { //add to local storage
        let items = JSON.parse(localStorage.getItem('items') || '[]');
        items.push(item);
        localStorage.setItem('items', JSON.stringify(items));
        console.log(items)
        window.location.reload();
    } else {
        Alert.alert('Error', `Server response error: ${result.message || 'Failed to submit data'}`);
    }

    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', `Failed to submit data with ID ${item._id}`);
    }
};

const DBTable: React.FC<TableProps> = ({ data }) => {
    const renderItem: ListRenderItem<Item> = ({ item }) => (
        <View style={styles.row}>
            <Text style={styles.cell}>{item._id}</Text>
            <Text style={styles.cell}>{item.item_name}</Text>
            <Text style={styles.cell}>{item.shelf_location}</Text>
            <Text style={styles.cell}>{item.count}</Text>
            <Text style={styles.cell}>{item.price}</Text>
            <Text style={styles.cell}>{item.category}</Text>
            {item.image_path && (
                <ImageComponent filename={item.image_path}
                imageStyle={{ width: 50, height: 100 }} /> 
            )}
            <View style={styles.cell}>
                {item.specifications?.map((spec, index) => ( 
                <Text key={index} style={styles.specificationText}>
                    {spec}
                </Text>
            ))}
            </View>
            <View style={styles.cell}>
            <Pressable 
                onPress={() => addItem(item)}
                style={({ pressed }) => [ 
                {
                    backgroundColor: pressed ? '#F7CA00' : '#FFD814',
                },
                styles.pressable
            ]}>
                <Text style={styles.text}>Add to Batch</Text>
            </Pressable>  
            </View>
        </View>
    );
  
    return (
        <FlatList
            data={data}
            renderItem={renderItem}
            ListHeaderComponent={
                <View style={styles.header}>
                    <Text style={styles.headerCell}>ID</Text>
                    <Text style={styles.headerCell}>Item Name</Text>
                    <Text style={styles.headerCell}>Shelf Location</Text>
                    <Text style={styles.headerCell}>Count</Text>
                    <Text style={styles.headerCell}>Price</Text>
                    <Text style={styles.headerCell}>Category</Text>
                    <Text style={styles.headerCell}>Image</Text>
                    <Text style={styles.headerCell}>Specifications</Text>
                </View>
            }   
        />
    );
};
  
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    header: {
    flexDirection: 'row',
        backgroundColor: '#f0f0f0',
        paddingVertical: 10,
        paddingHorizontal: 5,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    headerCell: {
        textAlign: 'center',
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        width: 115, 
    },
    row: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        paddingVertical: 10,
        paddingHorizontal: 5,
    },
    cell: {
        textAlign: 'center',
        paddingVertical: 5,
        paddingHorizontal: 10,
        width: 115, 
    },
    specificationText: {
        textAlign: 'left', 
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
export default DBTable;