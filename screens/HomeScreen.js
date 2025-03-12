import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet, TextInput, Text } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import ProductCard from '../components/ProductCard';
import loadCSV from '../data/products';
import { debounce } from 'lodash'; // Importe o debounce da lodash

const HomeScreen = ({ navigation }) => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [selectedType, setSelectedType] = useState('all'); // Estado para o tipo selecionado
    const [searchQuery, setSearchQuery] = useState(''); // Estado para a barra de pesquisa

    useEffect(() => {
        const loadProducts = async () => {
            const data = await loadCSV();
            setProducts(data);
            setFilteredProducts(data); // Inicialmente, todos os produtos são exibidos
        };
        loadProducts();
    }, []);

    // Função para filtrar os produtos com base no tipo selecionado e na barra de pesquisa
    const filterProducts = debounce((query, type) => {
        let filtered = products;

        // Filtra por tipo
        if (type === 'hd_ssd') {
            filtered = filtered.filter(
                (product) =>
                    product.type === 'hd' || product.type === 'ssd' || product.type === 'hd_ssd'
            );
        } else if (type !== 'all') {
            filtered = filtered.filter((product) => product.type === type);
        }

        // Filtra por nome (barra de pesquisa)
        if (query) {
            filtered = filtered.filter((product) =>
                product.name && product.name.toLowerCase().includes(query.toLowerCase())
            );

            // Ordena os resultados pela proximidade do texto digitado
            filtered.sort((a, b) => {
                const aIndex = a.name.toLowerCase().indexOf(query.toLowerCase());
                const bIndex = b.name.toLowerCase().indexOf(query.toLowerCase());
                return aIndex - bIndex;
            });
        }

        setFilteredProducts(filtered);
    }, 300); // Debounce de 300ms

    useEffect(() => {
        filterProducts(searchQuery, selectedType);
    }, [searchQuery, selectedType, products]);

    return (
        <View style={styles.container}>
            {/* Barra de pesquisa */}
            <TextInput
                style={styles.searchBar}
                placeholder="Pesquisar por nome..."
                value={searchQuery}
                onChangeText={(text) => setSearchQuery(text)}
            />

            {/* Dropdown para selecionar o tipo de produto */}
            <Picker
                selectedValue={selectedType}
                onValueChange={(itemValue) => setSelectedType(itemValue)}
                style={styles.picker}
            >
                <Picker.Item label="Todos" value="all" />
                <Picker.Item label="CPU" value="cpu" />
                <Picker.Item label="Placa Mãe" value="placa_mae" />
                <Picker.Item label="GPU" value="gpu" />
                <Picker.Item label="RAM" value="ram" />
                <Picker.Item label="HD" value="hd" />
                <Picker.Item label="SSD" value="ssd" />
                <Picker.Item label="HD/SSD" value="hd_ssd" />
                <Picker.Item label="Fonte" value="fonte" />
            </Picker>

            {/* Lista de produtos filtrados */}
            {filteredProducts.length > 0 ? (
                <FlatList
                    data={filteredProducts}
                    keyExtractor={(item) => item.product_ID}
                    renderItem={({ item }) => (
                        <ProductCard product={item} navigation={navigation} />
                    )}
                />
            ) : (
                <Text style={styles.noResultsText}>Nenhum produto encontrado.</Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#d3c5aa',
    },
    searchBar: {
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#ccc',
        marginBottom: 10,
    },
    picker: {
        backgroundColor: '#fff',
        marginBottom: 10,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#ccc',
    },
    noResultsText: {
        textAlign: 'center',
        marginTop: 20,
        fontSize: 16,
        color: '#666',
    },
});

export default HomeScreen;