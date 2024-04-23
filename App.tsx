import {View, Text} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import DrawerNavigation from './src/Navigation/DrawerNavigation';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {AppProvider} from './src/Context/AppContext';

function App(): React.JSX.Element {
  return (
    <AppProvider>
      <GestureHandlerRootView style={{flex: 1}}>
        <NavigationContainer>
          <DrawerNavigation />
        </NavigationContainer>
      </GestureHandlerRootView>
    </AppProvider>
  );
}

export default App;
