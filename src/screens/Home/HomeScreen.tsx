import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';

import styles from './styles';
import {ArrowDown, ArrowUp, PlusCircle} from 'lucide-react-native';
import RowItem from '../components/RowItem/RowItem';
import ModalCreateRecord from '../components/ModalCreateRecord/ModalCreateRecord';
import {
  createTable,
  getDBConnection,
  getRecords,
  getRecordsByMonth,
} from '../../libs/db/db-services';
import {useRecordsStore} from '../../libs/store';

const Empty = () => (
  <Text style={{textAlign: 'center', marginTop: 24, color: 'black'}}>
    No Data
  </Text>
);

const HomeScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedId, setSelectedId] = useState();
  const {
    setNewData,
    data,
    monthlyIncome,
    monthlyExpense,
    setMonthlyExpense,
    setMonthlyIncome,
  } = useRecordsStore();

  const loadDataCallback = useCallback(async () => {
    try {
      const db = await getDBConnection();
      // deleteTable(db);
      await createTable(db);
      const storedRecords = await getRecords(db);
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

      if (storedRecords.length) {
        setNewData(storedRecords);
      } else {
        setNewData([]);
      }
    } catch (error) {
      console.error(error);
    }
  }, [setMonthlyExpense, setMonthlyIncome, setNewData]);

  useEffect(() => {
    loadDataCallback();
  }, [loadDataCallback]);

  return (
    <View style={styles.container}>
      <View style={[styles.wrapper]}>
        <View style={styles.card}>
          <View style={styles.cardContainer}>
            <ArrowUp stroke={'red'} size={20} />
            <Text style={{fontSize: 18, color: 'red'}}>Expense</Text>
          </View>
          <Text style={styles.txtAmmount}>IDR {monthlyExpense}</Text>
        </View>
        <View style={styles.card}>
          <View style={styles.cardContainer}>
            <ArrowDown stroke={'green'} size={20} />
            <Text style={{fontSize: 18, color: 'green'}}>Income</Text>
          </View>
          <Text style={[styles.txtAmmount, {color: 'green'}]}>
            IDR {monthlyIncome}
          </Text>
        </View>
      </View>

      <Text
        style={{
          fontSize: 18,
          fontWeight: 'bold',
          marginBottom: 12,
          color: 'black',
        }}>
        Transactions History
      </Text>
      <FlatList
        style={{width: '100%'}}
        contentContainerStyle={{gap: 8}}
        data={data}
        renderItem={({item}) => (
          <RowItem
            onPress={() => {
              setSelectedId(item.id);
              setTimeout(() => {
                setModalVisible(true);
              }, 300);
            }}
            {...item}
          />
        )}
        ListEmptyComponent={Empty}
      />
      <View style={styles.fabWrapper}>
        <TouchableOpacity
          activeOpacity={0.2}
          onPress={() => {
            setSelectedId(undefined);
            setTimeout(() => {
              setModalVisible(true);
            }, 500);
          }}>
          <PlusCircle size={38} color={'blue'} />
        </TouchableOpacity>
      </View>
      <ModalCreateRecord
        id={selectedId}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
    </View>
  );
};

export default HomeScreen;
