import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { BottomBar } from './src/components/bottomBar';
import { MainRoutes, MainStack } from './src/routes/routes';
import Login from './src/screens/login/Login';
import Module1 from './src/screens/module1/Module1';
import Module2 from './src/screens/module2/Module2';

const App = () => {
  return (
    // <AuthContext.Provider>
    <NavigationContainer>
      <MainStack.Navigator initialRouteName={MainRoutes.Login}>
        <>
          <MainStack.Screen
            name={MainRoutes.BottomBar}
            component={BottomBar}
            options={{
              headerShown: false,
              animation: 'slide_from_right',
            }}
          />
          <MainStack.Screen
            name={MainRoutes.Module1}
            component={Module1}
            options={{
              headerShown: false,
              animation: 'slide_from_right',
            }}
          />
          <MainStack.Screen
            name={MainRoutes.Module2}
            component={Module2}
            options={{
              headerShown: false,
              animation: 'slide_from_right',
            }}
          />
          <MainStack.Screen
            name={MainRoutes.Login}
            component={Login}
            options={{
              headerShown: false,
              animation: 'slide_from_right',
            }}
          />
        </>
      </MainStack.Navigator>
    </NavigationContainer>
    // </AuthContext.Provider>
  );
};

export default App;
