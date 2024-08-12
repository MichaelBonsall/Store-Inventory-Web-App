import { View, Text, FlatList, StyleSheet, ListRenderItem, Pressable } from 'react-native';
import {Item} from './iItem'
import  {ImageComponent } from './ImageUtil';

interface TableProps {
    data: any;
}

const removeItem = async (item: Item) => {
    try {
      const storedItems = localStorage.getItem('items');
      
      if (!storedItems) {
        console.error('No items found in localStorage'); //THIS SHOULD NEVER HAPPEN
        return;
      }
      
      const itemsArray: Item[] = JSON.parse(storedItems);
      const updatedArray = itemsArray.filter(storedItem => storedItem._id !== item._id);
      localStorage.setItem('items', JSON.stringify(updatedArray));
      console.log('Item removed successfully');
      window.location.reload();
    } catch (error) {
      console.error('Error removing item:', error);
    }
  };

const BatchTable: React.FC<TableProps> = ({ data }) => {
    const renderItem: ListRenderItem<Item> = ({ item }) => (
        <View style={styles.row}>
            <Text style={styles.cell}>{item._id}</Text>
            <Text style={styles.cell}>{item.item_name}</Text>
            <Text style={styles.cell}>{item.shelf_location}</Text>
            <Text style={styles.cell}>{item.count}</Text>
            <Text style={styles.cell}>{item.price}</Text>
            <Text style={styles.cell}>{item.category}</Text>
            {item.image_path && (
                <ImageComponent filename={item.image_path} /> 
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
                onPress={() => removeItem(item)}
                style={({ pressed }) => [ 
                {
                    backgroundColor: pressed ?  '#d50d04': '#fa0f05',
                },
                styles.pressable
            ]}>
                <Text style={styles.text}>Remove</Text>
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
export default BatchTable;