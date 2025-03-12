import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Importe o ícone
import loadCSV from '../data/products';

const ProductDetailScreen = ({ route }) => {
    const { productId } = route.params;
    const [product, setProduct] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            const products = await loadCSV();
            const selectedProduct = products.find(p => p.product_ID === productId);
            setProduct(selectedProduct);
        };
        fetchProduct();
    }, [productId]);

    if (!product) {
        return <Text>Carregando...</Text>;
    }

    const handleAffiliateLinkPress = () => {
        Linking.openURL(product.affiliate_link);
    };

    return (
        <ScrollView style={styles.container}>
            <Image source={{ uri: product.image_url }} style={styles.image} />
            <Text style={styles.title}>{product.name}</Text>
            <Text style={styles.price}>{product.price}</Text>
            <Text>Disponível em: {product.store}</Text>
            <TouchableOpacity style={styles.affiliateButton} onPress={handleAffiliateLinkPress}>
                <Text style={styles.affiliateButtonText}>Comprar Agora</Text>
                <Ionicons name="cart" size={20} color="#fff" />
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 10,
    },
    image: {
        width: '100%',
        height: 200,
        resizeMode: 'contain',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginVertical: 10,
    },
    price: {
        fontSize: 20,
        color: 'green',
    },
    affiliateButton: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#007BFF',
        padding: 10,
        borderRadius: 5,
        marginTop: 20,
    },
    affiliateButtonText: {
        color: '#fff',
        fontSize: 16,
        marginRight: 10,
    },
});

export default ProductDetailScreen;