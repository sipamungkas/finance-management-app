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
} from '../../libs/db/db-services';
import {useRecordsStore} from '../../libs/store';

const HomeScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const {setNewData, data} = useRecordsStore();
  const loadDataCallback = useCallback(async () => {
    try {
      const db = await getDBConnection();
      // deleteTable(db);
      await createTable(db);
      const storedRecords = await getRecords(db);
      console.log({storedRecords});
      if (storedRecords.length) {
        setNewData(storedRecords);
      } else {
        setNewData([]);
      }
    } catch (error) {
      console.error(error);
    }
  }, [setNewData]);

  useEffect(() => {
    loadDataCallback();
  }, [loadDataCallback]);

  console.log({data});
  return (
    <View style={styles.container}>
      <View style={[styles.wrapper]}>
        <View style={styles.card}>
          <View style={styles.cardContainer}>
            <ArrowUp size={20} />
            <Text>Expense</Text>
          </View>
          <Text style={styles.txtAmmount}>IDR 500.000</Text>
        </View>
        <View style={styles.card}>
          <View style={styles.cardContainer}>
            <ArrowDown size={20} />
            <Text>Income</Text>
          </View>
          <Text style={styles.txtAmmount}>IDR 500.000</Text>
        </View>
      </View>

      <Text style={{fontSize: 18, fontWeight: 'bold', marginBottom: 12}}>
        Transactions History
      </Text>
      <FlatList
        style={{width: '100%'}}
        contentContainerStyle={{gap: 8}}
        data={data}
        renderItem={({item}) => <RowItem {...item} />}
      />
      <View style={styles.fabWrapper}>
        <TouchableOpacity
          activeOpacity={0.2}
          onPress={() => {
            setModalVisible(true);
          }}>
          <PlusCircle size={38} />
        </TouchableOpacity>
      </View>
      <ModalCreateRecord
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
    </View>
  );
};

export default HomeScreen;
