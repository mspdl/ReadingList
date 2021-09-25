import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Book = ({ navigation }) => {
    const book = navigation.getParam("book", {
        title: '',
        description: '',
        read: false,
        photo: ''
    })

    const isEdit = navigation.getParam("isEdit", false);

    const [books, setBooks] = useState([]);
    const [title, setTitle] = useState(book.title);
    const [description, setDescription] = useState(book.description);
    const [photo, setPhoto] = useState(book.photo);
    const [read, setRead] = useState(book.read);

    useEffect(() => {
        AsyncStorage.getItem("books").then(data => {
            const bookList = data ? JSON.parse(data) : [];
            setBooks(bookList)
        });
    }, [])

    const onSave = async () => {
        if (isValid()) {
            if (isEdit) {
                let newBooks = books;
                newBooks.map((item) => {
                    if (item.id === book.id) {
                        item.title = title;
                        item.description = description;
                        item.photo = photo;
                        item.read = read;
                    }
                    return item;
                });
                await AsyncStorage.setItem('books', JSON.stringify(newBooks))
            } else {
                const data = {
                    id: Math.random().toString(36).substr(2, 9).toUpperCase(),
                    title,
                    description,
                    photo
                }
                books.push(data)
                await AsyncStorage.setItem('books', JSON.stringify(books))
            }
            navigation.goBack();
        }
    }

    const isValid = () => {
        if (title) {
            return true;
        }
        return false;
    }

    return (
        <View style={styles.container}>
            <Text style={styles.pageTitle}>Inclua seu novo livro</Text>
            <TextInput
                value={title}
                onChangeText={(text) => setTitle(text)}
                style={styles.titleInput}
                placeholder='Título'
            />
            <TextInput
                value={description}
                onChangeText={(text) => setDescription(text)}
                style={styles.titleInput}
                multiline={true}
                numberOfLines={4}
                placeholder='Descrição'
            />
            <TouchableOpacity style={styles.cameraButton}>
                <Icon name="photo-camera" size={30} color='#fff' />
            </TouchableOpacity>
            <TouchableOpacity
                style={[styles.saveButton, !isValid() && styles.saveButtonInvalid]}
                onPress={onSave}
            >
                <Text style={styles.saveButtonText}>{isEdit ? 'Atualizar' : 'Cadastrar'}</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => {
                    navigation.goBack();
                }}
            >
                <Text style={styles.cancelButtonText}>Cancelar</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    pageTitle: {
        textAlign: 'center',
        fontSize: 22,
        marginBottom: 20,
    },
    titleInput: {
        fontSize: 16,
        borderBottomColor: '#f39c12',
        borderBottomWidth: 1,
        marginBottom: 10,
    },
    cameraButton: {
        backgroundColor: '#f39c12',
        borderRadius: 50,
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
        alignItems: 'center',
        alignSelf: 'center',
        marginBottom: 50,
    },
    saveButton: {
        backgroundColor: '#f39c12',
        alignSelf: 'center',
        borderRadius: 8,
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginBottom: 20,
    },
    saveButtonInvalid: {
        backgroundColor: '#CCC',
    },
    saveButtonText: {
        color: '#fff',
        fontSize: 16,
    },
    cancelButton: {
        alignSelf: 'center',
    },
    cancelButtonText: {
        color: '#95a5a6',
        fontSize: 16,
    },
});

export default Book;