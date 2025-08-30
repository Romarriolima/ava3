// Substitua todo o conteúdo de src/screens/EditProdutoScreen.js por isto:

import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, Alert, Text, ActivityIndicator } from 'react-native';
import api from '../services/api'; // Importa nossa API centralizada

export default function EditProdutoScreen({ route, navigation }) {
  const { produtoId } = route.params;

  const [nome, setNome] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [preco, setPreco] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduto = async () => {
      try {
        // CORREÇÃO: Usa a rota '/produto/:id'
        const response = await api.get(`/produto/${produtoId}`); 
        setNome(response.data.nome);
        setQuantidade(response.data.quantidade.toString());
        setPreco(response.data.preco.toString());
      } catch (error) {
        Alert.alert('Erro', 'Não foi possível carregar os dados do produto.');
        navigation.goBack();
      } finally {
        setLoading(false);
      }
    };
    fetchProduto();
  }, [produtoId]);

  const handleUpdate = async () => {
    if (!nome || !quantidade || !preco) {
      Alert.alert('Erro', 'Todos os campos são obrigatórios.');
      return;
    }

    try {
      // CORREÇÃO: Usa a rota '/produto/:id'
      await api.put(`/produto/${produtoId}`, {
        nome,
        quantidade: parseInt(quantidade),
        preco: parseFloat(preco)
      });
      navigation.goBack();
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível atualizar o produto.');
    }
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#007bff" />
        <Text>Carregando dados do produto...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nome do Produto:</Text>
      <TextInput
        value={nome}
        onChangeText={setNome}
        style={styles.input}
        placeholder='Digite o nome do produto'
      />
      <Text style={styles.label}>Quantidade:</Text>
      <TextInput
        value={quantidade}
        onChangeText={setQuantidade}
        keyboardType="numeric"
        style={styles.input}
        placeholder='Digite a quantidade'
      />
      <Text style={styles.label}>Preço:</Text>
      <TextInput
        value={preco}
        onChangeText={setPreco}
        keyboardType="numeric"
        style={styles.input}
        placeholder='Digite o preço'
      />
      <Button title="Salvar Alterações" onPress={handleUpdate} />
    </View>
  );
}

// Seus estilos
const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f5f5f5' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  label: { fontSize: 16, marginBottom: 5, color: '#333' },
  input: { backgroundColor: '#fff', height: 50, borderColor: '#ddd', borderWidth: 1, borderRadius: 8, marginBottom: 20, paddingHorizontal: 15, fontSize: 16 },
});