import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import React from 'react';

import styles from './styles';
import {ArrowDown, ArrowUp, PlusCircle} from 'lucide-react-native';
import RowItem, {RowProps} from '../components/RowItem/RowItem';

const dummy: RowProps[] = [
  {
    type: 'expense',
    amount: 500000,
    date: '2023-01-01',
    category: 'Food',
  },
  {
    type: 'income',
    amount: 500000,
    date: '2023-01-01',
    category: 'Salary',
  },
];

const HomeScreen = () => {
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
        data={dummy}
        renderItem={({item}) => <RowItem {...item} />}
      />
      <View style={styles.fabWrapper}>
        <TouchableOpacity activeOpacity={0.2} onPress={() => {}}>
          <PlusCircle size={38} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HomeScreen;
