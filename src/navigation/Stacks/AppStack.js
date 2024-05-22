import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {MyDrawer} from '../drawer/DrawerNavigation';

// ** Screens

const Stack = createNativeStackNavigator();

function AppStack() {
  return (
    <Stack.Navigator
      initialRouteName={'Drawer'}
      screenOptions={{headerShown: false}}>
      <Stack.Screen name={'Drawer'} component={MyDrawer} />
    </Stack.Navigator>
  );
}

export default AppStack;
