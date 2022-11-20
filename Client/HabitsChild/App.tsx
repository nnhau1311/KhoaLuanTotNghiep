import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { StatusBar } from 'react-native';
import { MainRoutes, MainStack } from './src/routes/routes';
import Login from './src/screens/login/Login';
import Splash from './src/screens/splash/Splash';
import SignUp from './src/screens/login/SignUp';
import ForgotPass from './src/screens/login/ForgotPass';
import TabNavigation from './src/screens/navigation/TabNavigation';
import ViewCourse from './src/screens/course/ViewCourse';
import HaibitDetail from './src/screens/home/HabitDetail';
import { COLOR } from './src/constants';
import ChangePassword from './src/screens/setting/ChangePassword';
import Information from './src/screens/setting/Information';
import ViewProfile from './src/screens/profile/ViewProfile';
import { NetworkInfo } from 'react-native-network-info';
import About from './src/screens/setting/About';
const App = () => {
  const getIPAddress = () => {
    NetworkInfo.getIPV4Address().then(ip => {
      console.log('ipppppppppppp', ip);
    });
  };
  useEffect(() => {
    getIPAddress();
  }, []);
  return (
    // <AuthContext.Provider>
    <NavigationContainer>
      <StatusBar animated={true} backgroundColor={COLOR.bg} hidden={true} />
      <MainStack.Navigator initialRouteName={MainRoutes.Login}>
        <>
          <MainStack.Screen
            name={MainRoutes.Splash}
            component={Splash}
            options={{
              headerShown: false,
              animation: 'slide_from_right',
            }}
          />
          <MainStack.Screen
            name={MainRoutes.SignUp}
            component={SignUp}
            options={{
              headerShown: false,
              animation: 'slide_from_right',
            }}
          />
          <MainStack.Screen
            name={MainRoutes.ForgotPass}
            component={ForgotPass}
            options={{
              headerShown: false,
              animation: 'slide_from_right',
            }}
          />
          <MainStack.Screen
            name={MainRoutes.About}
            component={About}
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
          <MainStack.Screen
            name={MainRoutes.TabNavigation}
            component={TabNavigation}
            options={{
              headerShown: false,
              animation: 'slide_from_right',
            }}
          />

          <MainStack.Screen
            name={MainRoutes.ViewCourse}
            component={ViewCourse}
            options={{
              headerShown: false,
              animation: 'slide_from_right',
            }}
          />
          <MainStack.Screen
            name={MainRoutes.HaibitDetail}
            component={HaibitDetail}
            options={{
              headerShown: false,
              animation: 'slide_from_right',
            }}
          />
          <MainStack.Screen
            name={MainRoutes.ChangePassword}
            component={ChangePassword}
            options={{
              headerShown: false,
              animation: 'slide_from_right',
            }}
          />
          <MainStack.Screen
            name={MainRoutes.Information}
            component={Information}
            options={{
              headerShown: false,
              animation: 'slide_from_right',
            }}
          />
          <MainStack.Screen
            name={MainRoutes.ViewProfile}
            component={ViewProfile}
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
