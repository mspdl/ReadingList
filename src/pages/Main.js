import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';


const Main = ({ navigation }) => {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        AsyncStorage.getItem("books").then(data => {
            const bookList = data ? JSON.parse(data) : [];
            setBooks(bookList)
        });
    }, [])

    const onNewBook = () => {
        navigation.navigate('Book')
    }

    const onBookEdit = (bookId) => {
        const book = books.find(b => b.id === bookId);
        navigation.navigate('Book', { book: book, isEdit: true })
    }

    const onBookDelete = async (bookId) => {
        const newBooks = books.filter(item => item.id !== bookId);
        await AsyncStorage.setItem("books", JSON.stringify(newBooks));
        setBooks(newBooks);
    }

    const onBookRead = async (bookId) => {
        const newBooks = books.map((item) => {
            if (item.id === bookId) {
                item.read = !item.read;
            }
            return item;
        });
        await AsyncStorage.setItem("books", JSON.stringify(newBooks));
        setBooks(newBooks);
    }

    return (
        <View style={styles.container}>
            <View style={styles.toolbox}>
                <Text style={styles.title}>Lista de Leitura</Text>
                <TouchableOpacity
                    style={styles.addButton}
                    onPress={onNewBook}
                >
                    <Icon name="add" size={30} color="#fff" />
                </TouchableOpacity>
            </View>
            <FlatList
                data={books}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <View style={styles.itemsContainer}>
                        <TouchableOpacity style={styles.itemButton} onPress={() => onBookRead(item.id)}>
                            <Text style={[styles.itemText, item.read ? styles.itemRead : '']}>{item.title}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.editButton} onPress={() => onBookEdit(item.id)}>
                            <Icon name="create" size={30} color="#2ecc71" />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.deleteButton} onPress={() => onBookDelete(item.id)}>
                            <Icon name="delete" size={30} color="#e74c3c" />
                        </TouchableOpacity>
                    </View>
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
        margin: 10,
    },
    itemsContainer: {
        flexDirection: "row",
    },
    itemButton: {
        flex: 1,
    },
    itemText: {
        fontSize: 16,
    },
    itemRead: {
        textDecorationLine: "line-through",
        color: "#95a5a6",
    },
    editButton: {},
    deleteButton: {},
});

export default Main;