import {View, Text} from 'react-native';
import React from 'react';

import styles from './styles';
import {ChevronDown, ChevronUp} from 'lucide-react-native';

export type RowProps = {
  amount: number;
  type: 'income' | 'expense';
  category: string;
  date: string;
};

const RowItem = ({amount, type, category, date}: RowProps) => {
  return (
    <View style={styles.container}>
      {type === 'expense' ? (
        <ChevronDown size={28} stroke={'red'} />
      ) : (
        <ChevronUp size={28} stroke={'green'} />
      )}
      <View style={{gap: 4}}>
        <Text style={styles.txtAmount}>IDR {amount}</Text>
        <Text style={styles.txtDate}>
          {date} - {category}
        </Text>
      </View>
    </View>
  );
};

export default RowItem;
