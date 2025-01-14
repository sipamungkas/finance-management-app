import {NavigationContainer} from '@react-navigation/native';
import React from 'react';

import StackNavigator from './src/routers/stack';
import {SafeAreaView} from 'react-native-safe-area-context';

function App(): JSX.Element {
  return (
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>
  );
}

export default App;
