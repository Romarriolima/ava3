// src/screens/AddProdutoScreen.js (CORRIGIDO)

import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import api from '../services/api'; // 1. Importa nossa API centralizada

export default function AddProdutoScreen({ navigation }) {
  const [nome, setNome] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [preco, setPreco] = useState('');

  const handleAddProduto = async () => {
    if (!nome || !quantidade || !preco) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }

    try {
      // 2. USA O 'api.post' COM O CAMINHO '/produto'
      await api.post('/produto', {
        nome,
        quantidade: parseInt(quantidade),
        preco: parseFloat(preco),
      });
      navigation.goBack(); // Volta para a lista, que será atualizada
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível adicionar o produto.');
      console.error("Erro ao adicionar produto:", error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Nome do Produto"
        value={nome}
        onChangeText={setNome}
        style={styles.input}
      />
      <TextInput
        placeholder="Quantidade"
        value={quantidade}
        onChangeText={setQuantidade}
        style={styles.input}
        keyboardType="numeric"
      />
      <TextInput
        placeholder="Preço"
        value={preco}
        onChangeText={setPreco}
        style={styles.input}
        keyboardType="numeric"
      />
      <Button title="Salvar Produto" onPress={handleAddProduto} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  input: { height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10, paddingHorizontal: 10 },
});