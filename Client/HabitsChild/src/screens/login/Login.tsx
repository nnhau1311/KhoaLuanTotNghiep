import React, { useState, useEffect, useRef } from 'react';
import {
  Alert,
  Linking,
  NativeModules,
  Platform,
  StyleSheet,
  View,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
  Image,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Keyboard,
} from 'react-native';
import { NormalButton } from '../../components/button';
import { COLOR, SIZE, STRING, stringIsEmpty } from '../../constants';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { Status } from '../../models';
import { loginAction } from '../../redux/reducer/userReducer';
import { MainRoutes } from '../../routes/routes';
import { MainNavigationProp } from '../../routes/type';

import TouchID from 'react-native-touch-id';
import WebView from 'react-native-webview';
import CircularProgress from 'react-native-circular-progress-indicator';
import { IMAGE } from '../../constants/Image';
import ButtonLogin from '../../components/button/ButtonLogin';
import { STYLES } from '../../constants/Style';
import TextField from '../../components/textInput/TextField';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { userData } from '../../configs';
import Loading from '../../components/loading/Loading';
const optionalConfigObject = {
  unifiedErrors: false,
  passcodeFallback: false, // if true is passed, itwill allow isSupported to return an error if the device is not enrolled in touch id/face id etc. Otherwise, it will just tell you what method is supported, even if the user is not enrolled.  (default false)
};
const fingerConig = {
  title: 'Xác thực vân tay',
  imageColor: 'purple',
  imageErrorColor: 'red',
  sensorDescription: 'Chạm vào cảm biến',
  sensorErrorDescription: 'Vân tay không đúng',
  cancelText: 'Hủy bỏ',
};
const Login = ({ navigation, route }: MainNavigationProp) => {
  const dispatch = useAppDispatch();
  const status = useAppSelector(state => state.userReducer.status);
  const message = useAppSelector(state => state.userReducer.message);
  const result = useAppSelector(state => state.userReducer.loginData);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [iconBio, setIconBio] = useState('');
  const [isCheck, setIsCheck] = useState(false);
  const [loading, setLoading] = useState(false);
  const [keyboardStatus, setKeyboardStatus] = useState(false);
  const user = useRef<any>();
  const pass = useRef<any>();
  const onRememberLogin = () => {
    setIsCheck(!isCheck);
  };
  const onPressLogin = () => {
    if (username === '') {
      user.current.showError('Tên đăng nhập không được để trống');
    }
    if (password === '') {
      pass.current.showError('Mật khẩu không được để trống');
    }
    if (username && password) {
      setLoading(true);
      const input = {
        username: username,
        password: password,
      };
      dispatch(loginAction(input));

      // navigation.navigate(MainRoutes.Home);
    }
  };
  const openSettings = () => {
    if (Platform.OS !== 'ios') {
      NativeModules.OpenSettings.openNetworkSettings(() => {});
    } else {
      Linking.openURL('App-Prefs:PASSCODE');
    }
  };
  const checkBioSupport = async () => {
    return TouchID.isSupported(optionalConfigObject)
      .then(biometryType => {
        // Success code
        // userData.BIOMETRICS = biometryType;
        if (biometryType === 'FaceID') {
          console.log('FaceID is supported.');
          return true;
        } else if (biometryType === 'TouchID') {
          console.log('TouchID is supported.');
          return true;
        } else if (biometryType === true) {
          // Touch ID is supported on Android
          console.log('TouchID is supportedaaaaa.');

          return true;
        }
      })
      .catch(error => {
        // userData.BIOMETRICS = '';
        console.log('erorrrrrrrrrr', error.code);
        if (Platform.OS == 'android') {
          if (error.code == 'NOT_ENROLLED') {
            Alert.alert(
              'Thông báo',
              'Điện thoại của bạn chưa kích hoạt xác thực vân tay/ khuôn mặt',
              [
                {
                  text: 'Đóng',
                  onPress: () => {},
                  style: 'cancel',
                },
                {
                  text: 'Cài đặt',
                  onPress: () => {
                    openSettings();
                  },
                },
              ],
            );
          } else {
            Alert.alert(
              'Thông báo',
              'Điện thoại của bạn chưa kích hoạt xác thực vân tay/ khuôn mặt',
              [
                {
                  text: 'Đóng',
                  onPress: () => {},
                  style: 'cancel',
                },
                {
                  text: 'Cài đặt',
                  onPress: () => {
                    openSettings();
                  },
                },
              ],
            );
          }
        } else {
          if (error.name == 'LAErrorTouchIDNotEnrolled') {
            Alert.alert(
              'Thông báo',
              'Điện thoại của bạn chưa kích hoạt xác thực vân tay/ khuôn mặt',
              [
                {
                  text: 'Đóng',
                  onPress: () => {},
                  style: 'cancel',
                },
                {
                  text: 'Cài đặt',
                  onPress: () => {
                    openSettings();
                  },
                },
              ],
            );
          } else {
            Alert.alert(
              'Thông báo',
              'Điện thoại của bạn không hỗ trợ xác thực vân tay/ khuôn mặt',
            );
          }
        }
        return false;
      });
  };
  const onPressBioLogin = async () => {
    try {
      let resultBio = await checkBioSupport();
      console.log('resulttBioooooo', resultBio);
      if (resultBio) {
        TouchID.authenticate('', fingerConig)
          .then(async (_success: any) => {
            const dataUser = {
              username: await AsyncStorage.getItem('Bio_username'),
              password: await AsyncStorage.getItem('Bio_password'),
            };
            setUsername(dataUser?.username);
            setPassword(dataUser?.password);
            if (
              !stringIsEmpty(JSON.stringify(dataUser?.username)) &&
              !stringIsEmpty(JSON.stringify(dataUser?.password))
            ) {
              setLoading(true);
              dispatch(loginAction(dataUser));
            }
          })
          .catch((_error: any) => {});
      } else {
        return false;
      }
    } catch (error) {
      Alert.alert('Thông báo', 'Nhận diện sinh trắc học thất bại', [{}]);
    }
  };
  const storeData = async () => {
    try {
      const data = {
        username: username,
        password: password,
        isCheck: isCheck,
      };
      const jsonData = JSON.stringify(data);

      await AsyncStorage.setItem('login', jsonData);
    } catch (e) {
      console.log('store_Data_Login_Error', e);
    }
  };
  const getData = async () => {
    try {
      const jsonData = await AsyncStorage.getItem('login');
      const data = JSON.parse(jsonData + '');

      if (data.username && data.password && data?.isCheck) {
        setUsername(data.username);
        setPassword(data.password);
        setIsCheck(data?.isCheck);
        setLoading(true);
        setUsername(data?.username);
        setPassword(data?.password);

        console.log('---------2');
        dispatch(loginAction(data));
      }
    } catch (e) {
      console.log('getDataLoginError: ', e);
    }
  };
  useEffect(() => {
    if (status === Status.success && result?.StatusCode == '200') {
      console.log('resutttttttttttttttt', result);
      if (isCheck) {
        storeData();
      }
      userData.token = result?.Data?.accessToken;
      userData.username = username;
      userData.password = password;
      navigation.navigate(MainRoutes.TabNavigation);

      (async () => {
        try {
          await AsyncStorage.setItem('username', username);
          await AsyncStorage.setItem('password', password);
        } catch (error) {
          console.log('errorerrorerrorerror', error);
        }
      })();
      setLoading(false);
    } else if (status === Status.success && result?.StatusCode !== '200') {
      setLoading(false);
      Alert.alert('Notification', result?.message);
    }

    if (status === Status.error && message !== '') {
      setLoading(false);
      Alert.alert('Notification', message);
    }
  }, [status, message, result]);
  async function getBio() {
    const Bio = await AsyncStorage.getItem('BIO');
    console.log('Bio', Bio);
    setIconBio(Bio);
  }
  useEffect(() => {
    getBio();

    // getData();
  }, []);
  useEffect(() => {
    console.log('!stringIsEmpty(iconBio)', !stringIsEmpty(iconBio));
    console.log('iconBio', iconBio);
    if (iconBio) {
      if (
        !stringIsEmpty(iconBio) &&
        iconBio !== 'false' &&
        route?.params?.logout !== 'logout'
      ) {
        console.log('bioooooooo==========>');
        onPressBioLogin();
      } else {
        getData();
      }
    }
  }, [iconBio]);
  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardStatus(true);
    });
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardStatus(false);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);
  return (
    <View style={styles.container}>
      {loading && <Loading />}
      <ImageBackground
        // source={require('../../assets/images/img_bg_login.png')}
        source={IMAGE.img_bg_login}
        style={{
          flex: 1,
          width: Dimensions.get('screen').width,
          height: Dimensions.get('screen').height,
        }}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View
            style={{
              justifyContent: 'flex-end',
              paddingHorizontal: 16,
              // backgroundColor: 'red',
              height: Dimensions.get('window').height * 0.4,
            }}>
            <Text
              style={{
                fontSize: 24,
                fontWeight: '700',
                textAlign: 'center',
                lineHeight: 32,
                color: COLOR.purple,
              }}>
              {'WELCOME TO\n Monumental habits'.toUpperCase()}
            </Text>
            <ButtonLogin
              source={IMAGE.ic_gg}
              title={'Continue with  Google'}
              style={{ marginTop: 48 }}
            />
            <ButtonLogin
              source={IMAGE.ic_fb}
              title={'Continue with  Google'}
              style={{ marginTop: 8 }}
            />
          </View>

          <View
            style={{
              backgroundColor: COLOR.white,
              borderTopRightRadius: 20,
              borderTopLeftRadius: 20,
              marginTop: 24,
              paddingVertical: 16,
              alignItems: 'center',
              paddingHorizontal: 16,
              height: !keyboardStatus
                ? Dimensions.get('window').height * 0.6
                : Dimensions.get('window').height,
            }}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: '400',
                color: COLOR.purple,
                lineHeight: 16,
                marginLeft: 8,
              }}>
              Login With Account
            </Text>
            <KeyboardAvoidingView style={{ width: '100%', marginTop: 24 }}>
              <TextField
                ref={user}
                isIcon={true}
                isPassword={false}
                disabled={false}
                label={STRING.username}
                isRequired={false}
                imageLeft={IMAGE.ic_mail}
                value={username}
                onChangeText={(text: string) => {
                  setUsername(text);
                }}
                style={{ backgroundColor: '#FFF6ED' }}
                inputStyle={{ color: 'orange' }}
              />
              <TextField
                ref={pass}
                isIcon={true}
                isPassword={true}
                disabled={false}
                label={STRING.password}
                isRequired={false}
                imageLeft={IMAGE.ic_lock}
                value={password}
                onChangeText={(text: string) => {
                  setPassword(text);
                }}
                style={{ backgroundColor: '#FFF6ED', marginTop: SIZE.h24 }}
              />
            </KeyboardAvoidingView>

            <View
              style={[
                styles.viewRow,
                {
                  marginVertical: 16,
                  width: '100%',
                  justifyContent: 'space-between',
                },
              ]}>
              <View style={styles.viewRow}>
                <TouchableOpacity onPress={onRememberLogin}>
                  <Image
                    source={
                      !isCheck
                        ? IMAGE.ic_checkSquare_empty
                        : IMAGE.ic_checkbox_fill
                    }
                    style={[
                      styles.icon20,
                      { tintColor: !isCheck ? COLOR.orange : COLOR.orange },
                    ]}
                  />
                </TouchableOpacity>
                <Text style={styles.textRemember}>{'Remember login'}</Text>
              </View>
              {!stringIsEmpty(iconBio) && iconBio !== 'false' && (
                <TouchableOpacity
                  style={[styles.viewRow, { alignItems: 'center' }]}
                  onPress={onPressBioLogin}>
                  <Image
                    source={IMAGE.ic_bioMetrics}
                    style={[
                      styles.icon20,
                      {
                        tintColor: !isCheck ? COLOR.orange : COLOR.orange,
                        width: 16,
                        height: 16,
                      },
                    ]}
                  />
                  <Text style={styles.textRemember}>{'Biometric login'}</Text>
                </TouchableOpacity>
              )}
            </View>

            <NormalButton
              label="Login"
              style={{
                backgroundColor: '#FDA758',
                paddingVertical: 8,
                borderRadius: 12,
              }}
              labelStyle={{
                fontWeight: '700',
                color: COLOR.purple,
                fontSize: 16,
              }}
              onPress={() => {
                // navigation.navigate(MainRoutes.TabNavigation);
                onPressLogin();
              }}
            />
            <TouchableOpacity
              onPress={() => {
                navigation.navigate(MainRoutes.ForgotPass);
              }}
              style={{ alignItems: 'center', marginTop: 16 }}>
              <Text
                style={{
                  fontWeight: '400',
                  color: COLOR.purple,
                  fontSize: 14,
                  lineHeight: 14,
                }}>
                Forgot Password?
              </Text>
            </TouchableOpacity>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 6,
              }}>
              <Text
                style={{
                  fontWeight: '400',
                  color: COLOR.purple,
                  fontSize: 14,
                  lineHeight: 14,
                }}>
                {'Don’t have an account? '}
              </Text>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate(MainRoutes.SignUp);
                }}>
                <Text
                  style={{
                    fontWeight: '700',
                    color: COLOR.purple,
                    fontSize: 14,
                    lineHeight: 14,
                  }}>
                  Sign up
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </ImageBackground>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.bg,
    // paddingHorizontal: SIZE.s30,
  },
  pacman: {
    width: 0,
    height: 0,
    borderTopWidth: 60,
    borderTopColor: 'red',
    borderLeftColor: 'red',
    borderLeftWidth: 60,
    borderRightColor: 'transparent',
    borderRightWidth: 60,
    borderBottomColor: 'red',
    borderBottomWidth: 60,
    borderTopLeftRadius: 60,
    borderTopRightRadius: 60,
    borderBottomRightRadius: 60,
    borderBottomLeftRadius: 60,
  },
  leftHeart: {
    borderTopRightRadius: 16,
    // transform: [{ rotate: "-45deg" }],
  },
  rightHeart: {
    borderTopLeftRadius: 16,
  },
  viewRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  icon20: {
    height: SIZE.h40,
    width: SIZE.h40,
    resizeMode: 'contain',
  },
  textRemember: {
    fontWeight: '400',
    fontSize: 14,
    color: COLOR.orange,
    //fontFamily: FONT.regular,
    marginLeft: 6,
  },
});
