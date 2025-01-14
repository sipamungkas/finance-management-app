import {
  View,
  Text,
  Pressable,
  Modal,
  TextInput,
  Alert,
  ActivityIndicator,
} from 'react-native';
import React, {useState} from 'react';

import styles from './styles';
import {
  getDBConnection,
  getRecords,
  getRecordsByMonth,
  saveRecord,
} from '../../../libs/db/db-services';
import {useRecordsStore} from '../../../libs/store';

const ModalCreateRecord = ({modalVisible, setModalVisible}: any) => {
  const {setNewData, setMonthlyExpense, setMonthlyIncome} = useRecordsStore();
  const [type, setType] = useState('expense');
  const [amount, setAmount] = useState(0);
  const [desc, setDesc] = useState('');
  const [category, setCategory] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const onSave = async () => {
    if (!type || !amount || !desc || !category) {
      Alert.alert('Semua form harus diisi!');
      return;
    }
    try {
      setIsLoading(true);
      const db = await getDBConnection();
      await saveRecord(db, {type, amount, description: desc, category});
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
              disabled={isLoading}
              onPress={() => onSave()}>
              <Text style={styles.textStyle}>
                {isLoading ? <ActivityIndicator /> : 'Simpan'}
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ModalCreateRecord;
