import React from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Book = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.pageTitle}>Inclua seu novo livro</Text>
            <TextInput
                style={styles.titleInput}
                placeholder='Título'
            />
            <TextInput
                style={styles.titleInput}
                multiline={true}
                numberOfLines={4}
                placeholder='Descrição'
            />
            <TouchableOpacity style={styles.cameraButton}>
                <Icon name="photo-camera" size={30} color='#fff' />
            </TouchableOpacity>
            <TouchableOpacity style={styles.saveButton}>
                <Text style={styles.saveButtonText}>Cadastrar</Text>
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