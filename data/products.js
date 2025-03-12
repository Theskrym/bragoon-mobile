import * as FileSystem from 'expo-file-system';
import Papa from 'papaparse';
import { Asset } from 'expo-asset';

const loadCSV = async () => {
    try {
        // Carrega o arquivo CSV como um asset
        const asset = Asset.fromModule(require('../assets/produtos.csv'));
        await asset.downloadAsync(); // Garante que o arquivo está disponível

        // Lê o conteúdo do arquivo CSV
        const csvData = await FileSystem.readAsStringAsync(asset.localUri);
        console.log('CSV carregado:', csvData); // Verifique no console

        // Processa o CSV usando o PapaParse
        const parsedData = Papa.parse(csvData, { header: true }).data;
        console.log('Dados processados:', parsedData); // Verifique no console

        return parsedData;
    } catch (error) {
        console.error('Erro ao carregar CSV:', error);
        return [];
    }
};

export default loadCSV;