// Substitua todo o conteúdo de src/screens/ListaProdutosScreen.js por isto:

import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Button, StyleSheet, ActivityIndicator, Alert, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import api from '../services/api'; // Importa nossa API centralizada

export default function ListaProdutosScreen() {
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigation = useNavigation();

  const fetchProdutos = async () => {
    try {
      setLoading(true);
      setError(null);
      // CORREÇÃO: Usa a rota '/produto'
      const response = await api.get('/produto'); 
      setProdutos(response.data);
    } catch (err) {
      setError('Não foi possível carregar a lista de produtos.');
      console.error("Erro ao buscar produtos:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchProdutos();
    });
    return unsubscribe;
  }, [navigation]);

  const handleDelete = (id) => {
    Alert.alert(
      'Confirmar Exclusão',
      'Você tem certeza que deseja excluir este produto?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Confirmar',
          onPress: async () => {
            try {
              // CORREÇÃO: Usa a rota '/produto/:id'
              await api.delete(`/produto/${id}`);
              fetchProdutos();
            } catch (err) {
              Alert.alert('Erro', 'Não foi possível excluir o produto.');
              console.error("Erro ao excluir produto:", err);
            }
          },
          style: 'destructive',
        },
      ]
    );
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#007bff" />
        <Text>Carregando...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>{error}</Text>
        <Button title="Tentar Novamente" onPress={fetchProdutos} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate('AddProduto')} style={styles.addButton}>
        <Text style={styles.addButtonText}>Adicionar Novo Produto</Text>
      </TouchableOpacity>
      <FlatList
        data={produtos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <View style={styles.itemTextContainer}>
              <Text style={styles.itemNome}>{item.nome}</Text>
              <Text style={styles.itemArea}>Qtd: {item.quantidade} | R$ {item.preco}</Text>
            </View>
            <View style={styles.itemButtonContainer}>
              <Button title="Excluir" color="red" onPress={() => handleDelete(item.id)} />
              <Button title="Editar" onPress={() => navigation.navigate('EditProduto', { produtoId: item.id })} />
            </View>
          </View>
        )}
        ListEmptyComponent={() => <Text style={styles.emptyText}>Nenhum produto cadastrado.</Text>}
      />
    </View>
  );
}

// Seus estilos
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5', padding: 10 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  errorText: { fontSize: 16, color: 'red', marginBottom: 10 },
  addButton: { backgroundColor: '#007bff', padding: 15, borderRadius: 8, margin: 10, alignItems: 'center' },
  addButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  itemContainer: { flexDirection: 'row', padding: 16, marginVertical: 8, borderRadius: 8, backgroundColor: '#fff', justifyContent: 'space-between', alignItems: 'center',
    elevation: 2, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.22, shadowRadius: 2.22,
  },
  itemTextContainer: { flex: 1 },
  itemNome: { fontSize: 18, fontWeight: 'bold' },
  itemArea: { fontSize: 14, color: 'gray', marginTop: 4 },
  itemButtonContainer: { flexDirection: 'row' },
  emptyText: { textAlign: 'center', marginTop: 50, fontSize: 16, color: 'gray' },
});