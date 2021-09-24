import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Main = ({ navigation }) => {
    const [books, setBooks] = useState([]);

    useEffect(()=>{
        AsyncStorage.getItem("books").then(data => {
            const bookList = data ? JSON.parse(data) : [];
            setBooks(bookList)
        });
        console.log('books', books)
    },[])

    return (
        <View style={styles.container}>
            <View style={styles.toolbox}>
                <Text style={styles.title}>Lista de Leitura</Text>
                <TouchableOpacity
                    style={styles.addButton}
                    onPress={() => {
                        navigation.navigate('Book')
                    }}
                >
                    <Icon name="add" size={30} color="#fff" />
                </TouchableOpacity>
            </View>
            <FlatList
                data={books}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity style={styles.itemButton}>
                        <Text style={styles.itemText}>{item.title}</Text>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 5,
    },
    toolbox: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    title: {
        flex: 1,
        fontSize: 22,
        textAlign: 'center',
        color: '#3498db',
    },
    addButton: {
        backgroundColor: '#3498db',
        borderRadius: 50,
        width: 45,
        height: 45,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10
    },
    itemButton: {

    },
    itemText: {
        fontSize: 16,
    }
});

export default Main;