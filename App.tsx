import React from 'react';
import {
  SafeAreaView,
  useColorScheme,
  View,
} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faCalendar } from '@fortawesome/free-regular-svg-icons';

import {
  Colors
} from 'react-native/Libraries/NewAppScreen';
import AgendaComponent from './src/components/Agenda/AgendaComponent';
import Create from './src/screens/create/Create';
import { DataProvider } from './src/context/dataContext';

const CalendarPage = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <View style={{height: "100%"}}>
        <AgendaComponent/>
      </View>
    </SafeAreaView>
  )
}

const App = () => {
  const Tab = createBottomTabNavigator();

  return (
    <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name="Calendar" component={CalendarPage} options={
            {
              tabBarIcon: () => <FontAwesomeIcon icon={faCalendar} style={{width: 20, height: 20}} />
            }}/>
          <Tab.Screen name="Create" component={Create} options={
            {
              tabBarIcon: () => <FontAwesomeIcon icon={faPlus} style={{width: 20, height: 20}} />
            }}/>
        </Tab.Navigator>
    </NavigationContainer>
  );
};

const AppWrapper = () => {
  return (
    <DataProvider>
      <App/>
    </DataProvider>
  )
}

export default AppWrapper;
