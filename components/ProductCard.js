import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Importe o ícone

const ProductCard = ({ product, navigation }) => {
    const storeIcon = product.store === 'Amazon' ? 'logo-amazon' : 'cart'; // Escolha o ícone com base na loja
    const storeBackground = product.store === 'Amazon' ? '#FFD700' : '#FFA500'; // Escolha a cor de fundo com base na loja

    return (
        <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('ProductDetail', { productId: product.product_ID })}
        >
            <View style={[styles.storeIconContainer, { backgroundColor: storeBackground }]}>
                <Ionicons name={storeIcon} size={20} color="#fff" />
            </View>
            <Image source={{ uri: product.image_url }} style={styles.image} />
            <Text style={styles.title}>{product.name}</Text>
            <Text style={styles.price}>{product.price}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 10,
        margin: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
        position: 'relative', // Para posicionar o ícone da loja
    },
    storeIconContainer: {
        position: 'absolute',
        top: 10,
        right: 10,
        padding: 5,
        borderRadius: 20,
        zIndex: 1, // Para garantir que o ícone fique acima da imagem
    },
    image: {
        width: '100%',
        height: 150,
        resizeMode: 'contain',
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 10,
    },
    price: {
        fontSize: 14,
        color: 'green',
        marginTop: 5,
    },
});

export default ProductCard;