import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { StatusBar } from 'react-native';
import { MainRoutes, MainStack } from './src/routes/routes';
import Login from './src/screens/login/Login';
import Splash from './src/screens/splash/Splash';
import SignUp from './src/screens/login/SignUp';
import ForgotPass from './src/screens/login/ForgotPass';
import TabNavigation from './src/screens/navigation/TabNavigation';
import ViewCourse from './src/screens/course/ViewCourse';
import HaibitDetail from './src/screens/home/HabitDetail';
import { COLOR, objectIsNull } from './src/constants';
import ChangePassword from './src/screens/setting/ChangePassword';
import Information from './src/screens/setting/Information';
import ViewProfile from './src/screens/profile/ViewProfile';
import { NetworkInfo } from 'react-native-network-info';
import About from './src/screens/setting/About';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Statitics from './src/screens/setting/Statiitic';
import WebView from './src/screens/course/WebViewDoc';
const App = () => {
  const getIPAddress = () => {
    NetworkInfo.getIPV4Address().then(ip => {
      console.log('ipppppppppppp', ip);
    });
  };
  useEffect(() => {
    getIPAddress();
  }, []);
  const [firstUsed, setFirstUsed] = useState(null);

  const [initialScreen, setInitialScreen] = useState(null);

  const getFirstUsed = async () => {
    let first = await AsyncStorage.getItem('first-use');
    if (first == null) {
      setFirstUsed(0);
    } else {
      setFirstUsed(first);
    }
  };

  useEffect(() => {
    getFirstUsed();
  }, []);
  useEffect(() => {
    if (!objectIsNull(firstUsed)) {
      setInitialScreen(setinitialRouteName());
    }
  }, [firstUsed]);

  const setinitialRouteName = () => {
    if (firstUsed != 'false') {
      return MainRoutes.Splash;
    } else {
      return MainRoutes.Login;
    }
  };

  return (
    // <AuthContext.Provider>
    <>
      {!objectIsNull(initialScreen) && (
        <NavigationContainer>
          <StatusBar
            animated={true}
            backgroundColor={'transparent'}
            hidden={false}
          />
          <MainStack.Navigator initialRouteName={setinitialRouteName()}>
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
                name={MainRoutes.WebView}
                component={WebView}
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
                name={MainRoutes.Statitics}
                component={Statitics}
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
      )}
    </>
  );
};

export default App;
