import React, { useEffect } from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import DetailIntervention from './src/screens/intervention/detailIntervention';
import { NavigationContainer } from '@react-navigation/native';
import HomeNavigator from './src/screens/home/home';
import InterventionRepository from './src/repository/intervention.repository';


const Stack = createStackNavigator();

const App = () => {

  const repo = new InterventionRepository();
  // init dataBase

  useEffect( () => {
    console.log('on va crer les tables de la base')
    repo.createInterventionTable();
    repo.createSupportingDocumentTable();
  });
  
  return (
    <NavigationContainer>
      
      <Stack.Navigator initialRouteName= "HomeNavigator">
        <Stack.Screen name="HomeNavigator" component={HomeNavigator} options={{ headerShown:false }} />
        <Stack.Screen
          name="DetailIntervention"
          component = { DetailIntervention }
          options={{ title: 'Détail de l\'intervention' }}
        />
      </Stack.Navigator>

    </NavigationContainer>
  );
};

export default App;
