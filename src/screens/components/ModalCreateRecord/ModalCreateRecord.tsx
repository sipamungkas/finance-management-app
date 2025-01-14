import {
  View,
  Text,
  Pressable,
  Modal,
  TextInput,
  Alert,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';

import styles from './styles';
import {
  getDBConnection,
  getRecords,
  getRecordsByMonth,
  saveRecord,
  updateRecordById,
} from '../../../libs/db/db-services';
import {useRecordsStore} from '../../../libs/store';

const ModalCreateRecord = ({modalVisible, setModalVisible, id}: any) => {
  const {setNewData, setMonthlyExpense, setMonthlyIncome, data} =
    useRecordsStore();
  const detail = data.find((item: any) => item.id === id);
  const [type, setType] = useState('expense');
  const [amount, setAmount] = useState(0);
  const [desc, setDesc] = useState('');
  const [category, setCategory] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (id) {
      setType(detail.type);
      setAmount(detail.amount);
      setDesc(detail.description);
      setCategory(detail.category);
    } else {
      setType('');
      setAmount(0);
      setDesc('');
      setCategory('');
    }
  }, [detail, id]);

  const onSave = async () => {
    if (!type || !amount || !desc || !category) {
      Alert.alert('Semua form harus diisi!');
      return;
    }
    try {
      setIsLoading(true);
      const db = await getDBConnection();
      if (!id) {
        await saveRecord(db, {type, amount, description: desc, category});
      } else {
        updateRecordById(db, {type, amount, description: desc, category, id});
      }
      const newData = await getRecords(db);
      setNewData(newData);
      const _monthlyIncome = await getRecordsByMonth(
        db,
        new Date().getMonth() + 1,
        'income',
      );

      const _monthlyExpense = await getRecordsByMonth(
        db,
        new Date().getMonth() + 1,
        'expense',
      );

      setMonthlyExpense(_monthlyExpense);
      setMonthlyIncome(_monthlyIncome);
      setModalVisible(false);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
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
          <Text style={styles.modalText}>
            {id ? 'Update' : 'Create New'} Record
          </Text>
          <View style={{gap: 8, marginBottom: 18}}>
            <View style={styles.inputWrapper}>
              <TextInput
                placeholder="type"
                onChangeText={e => setType(e)}
                value={type}
              />
            </View>
            <View style={styles.inputWrapper}>
              <TextInput
                placeholder="Amount"
                keyboardType="numeric"
                onChangeText={e => setAmount(Number(e) || 0)}
                value={amount.toString()}
              />
            </View>
            <View style={styles.inputWrapper}>
              <TextInput
                placeholder="Description"
                onChangeText={e => setDesc(e)}
                value={desc}
              />
            </View>
            <View style={styles.inputWrapper}>
              <TextInput
                placeholder="Category"
                onChangeText={e => setCategory(e)}
                value={category}
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
              disabled={isLoading}
              onPress={() => onSave()}>
              <Text style={styles.textStyle}>
                {isLoading ? <ActivityIndicator /> : id ? 'Update' : 'Simpan'}
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ModalCreateRecord;
