import {View, Text, Pressable, Alert} from 'react-native';
import React from 'react';

import styles from './styles';
import {ChevronDown, ChevronUp, Trash} from 'lucide-react-native';
import {
  deleteRecords,
  getDBConnection,
  getRecords,
  getRecordsByMonth,
} from '../../../libs/db/db-services';
import {useRecordsStore} from '../../../libs/store';

export type RowProps = {
  amount: number;
  type: 'income' | 'expense';
  category: string;
  date: string;
  description?: string;
  id: number;
};

const RowItem = (props: RowProps) => {
  const {amount, type, category, date, description, id} = props;
  const {setNewData, setMonthlyExpense, setMonthlyIncome} = useRecordsStore();

  const onDeleteItem = async (_id: number) => {
    try {
      const db = await getDBConnection();
      deleteRecords(db, _id);
      Alert.alert('Delete data success');
      const newData = await getRecords(db);
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
      setNewData(newData);
    } catch (error) {
      Alert.alert('failed to delete data');
    }
  };
  const dateObj = new Date(date);
  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        {type?.toLowerCase() === 'expense' ? (
          <ChevronDown size={28} stroke={'red'} />
        ) : (
          <ChevronUp size={28} stroke={'green'} />
        )}
        <View style={{gap: 4}}>
          <Text style={styles.txtAmount}>IDR {amount}</Text>
          <Text style={styles.txtDate}>
            {dateObj.getDate()}-{dateObj.getMonth() + 1}-{dateObj.getFullYear()}{' '}
            - {category}
          </Text>
          <Text style={{fontSize: 12, color: '#9e9e9e'}}>{description}</Text>
        </View>
      </View>
      <Pressable onPress={() => onDeleteItem(id)}>
        <View style={styles.btnWrapper}>
          <Trash size={20} stroke={'red'} />
        </View>
      </Pressable>
    </View>
  );
};

export default RowItem;
