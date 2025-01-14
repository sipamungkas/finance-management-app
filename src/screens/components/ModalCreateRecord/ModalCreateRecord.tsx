import {View, Text, Pressable, Modal, TextInput, Alert} from 'react-native';
import React, {useState} from 'react';

import styles from './styles';

const ModalCreateRecord = ({modalVisible, setModalVisible}: any) => {
  const [type, setType] = useState('expense');
  const [amount, setAmount] = useState(0);
  const [desc, setDesc] = useState('');
  const [category, setCategory] = useState('');

  const onSave = () => {
    if (!type || !amount || !desc || !category) {
      Alert.alert('Semua form harus diisi!');
      return;
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Create New Record</Text>
          <View style={{gap: 8, marginBottom: 18}}>
            <View style={styles.inputWrapper}>
              <TextInput placeholder="type" onChangeText={e => setType(e)} />
            </View>
            <View style={styles.inputWrapper}>
              <TextInput
                placeholder="Amount"
                keyboardType="numeric"
                onChangeText={e => setAmount(Number(e) || 0)}
              />
            </View>
            <View style={styles.inputWrapper}>
              <TextInput
                placeholder="Description"
                onChangeText={e => setDesc(e)}
              />
            </View>
            <View style={styles.inputWrapper}>
              <TextInput
                placeholder="Category"
                onChangeText={e => setCategory(e)}
              />
            </View>
          </View>

          <View style={styles.btnContainer}>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.textStyle}>Batal</Text>
            </Pressable>

            <Pressable
              style={[
                styles.button,
                styles.buttonClose,
                {backgroundColor: 'green'},
              ]}
              onPress={() => onSave()}>
              <Text style={styles.textStyle}>Simpan</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ModalCreateRecord;
