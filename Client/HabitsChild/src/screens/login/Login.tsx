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
const Login = ({ navigation }: MainNavigationProp) => {
  const dispatch = useAppDispatch();
  const status = useAppSelector(state => state.userReducer.status);
  const message = useAppSelector(state => state.userReducer.message);
  const result = useAppSelector(state => state.userReducer.loginData);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [iconBio, setIconBio] = useState('');
  const [isCheck, setIsCheck] = useState(false);
  const [loading, setLoading] = useState(false);
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
            setUsername(JSON.stringify(dataUser?.username));
            setPassword(JSON.stringify(dataUser?.password));
            if (
              !stringIsEmpty(JSON.stringify(dataUser?.username)) &&
              !stringIsEmpty(JSON.stringify(dataUser?.password))
            ) {
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
      console.log('data: ', data);
      if (data.username && data.password && data?.isCheck) {
        setUsername(data.username);
        setPassword(data.password);
        setIsCheck(data?.isCheck);
        setLoading(true);
        setUsername(data?.username);
        setPassword(data?.password);
        if (!stringIsEmpty(iconBio) && iconBio !== 'false') {
          onPressBioLogin();
        } else {
          dispatch(loginAction(data));
        }
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
      Alert.alert('Thông báo', message);
    }
  }, [status]);
  async function getBio() {
    const Bio = await AsyncStorage.getItem('BIO');
    setIconBio(JSON.stringify(Bio));
  }
  useEffect(() => {
    getBio();
    // if (
    //   !stringIsEmpty(iconBio) &&
    //   iconBio !== 'false'
    // ) {
    //   onPressBioLogin();
    // } else {
    //   getData();
    // }
    getData();
  }, []);
  return (
    <ScrollView style={styles.container}>
      {loading && <Loading />}
      <ImageBackground
        // source={require('../../assets/images/img_bg_login.png')}
        source={IMAGE.img_bg_login}
        style={{
          flex: 1,
          width: Dimensions.get('screen').width,
          height: Dimensions.get('screen').height,
        }}>
        <View
          style={{
            flex: 1,
            justifyContent: 'flex-end',
            paddingHorizontal: 16,
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

        {/* <View
          style={{
            flex: 1,
            // flexDirection: 'row',
            width: '100%',
            // paddingHorizontal: 16,
            alignItems: 'center',
            justifyContent: 'flex-end',
            // justifyContent: 'space-between',
          }}> */}
        {/* <TextField label={'Email'} />
          <TextField label={'Password'} containerStyle={{ marginTop: 16 }} /> */}
        {/* <CircularProgress
            value={9}
            radius={30}
            activeStrokeWidth={6}
            inActiveStrokeWidth={8}
            duration={1000}
            activeStrokeColor={'#f39c12'}
            progressValueColor={'#f39c12'}
            inActiveStrokeColor={'#FDA758'}
            inActiveStrokeOpacity={0.2}
            maxValue={10}
            onAnimationComplete={() => {
              Alert.alert('callback');
            }}
          />
          <CircularProgress
            value={20}
            radius={30}
            activeStrokeWidth={6}
            inActiveStrokeWidth={8}
            duration={1000}
            activeStrokeColor={'#573353'}
            activeStrokeSecondaryColor={'#C25AFF'}
            progressValueColor={'#573353'}
            inActiveStrokeColor={'rgba(87, 51, 83, 0.5)'}
            inActiveStrokeOpacity={0.2}
            maxValue={20}
          />
          <CircularProgress
            value={10}
            radius={30}
            activeStrokeWidth={6}
            inActiveStrokeWidth={8}
            duration={1000}
            activeStrokeColor={'#F65B4E'}
            progressValueColor={'#F65B4E'}
            inActiveStrokeColor={'rgba(246, 91, 78, 0.5)'}
            inActiveStrokeOpacity={0.2}
            maxValue={20}
          /> */}
        {/* <View
            style={{
              flexDirection: 'row',
              width: '100%',
              justifyContent: 'space-between',
              alignItems: 'center',

              // paddingHorizontal: 16,
            }}>
            {data.map(item => {
              return (
                <View
                  style={[
                    item.id === 2 && styles.leftHeart,
                    item.id === 4 && styles.rightHeart,
                    {
                      width: '20%',
                      paddingVertical: 16,
                      backgroundColor: 'white',
                      alignItems: 'center',
                      justifyContent: 'center',
                    },
                  ]}>
                  <TouchableOpacity
                    disabled={item.id === 3 ? true : false}
                    onPress={() => {
                      let temp = BOTTOMBAR.map(_item => {
                        if (_item.image === item.image) {
                          return Object.assign({}, _item, { select: true });
                        } else {
                          return Object.assign({}, _item, { select: false });
                        }
                      });
                      setData(temp);
                    }}>
                    <Image
                      source={item.select ? item.image : item.image_default}
                      style={{
                        width: 48,
                        height: 28,
                        resizeMode: 'contain',

                        // opacity: 0.5,
                      }}
                    />
                  </TouchableOpacity>
                </View>
              );
            })}
          </View> */}
        {/* <View
            style={{
              width: Dimensions.get('screen').width * 0.2 + 16,
              height: 84,
              borderRadius: 100,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#FFF3E9',
              position: 'absolute',
              bottom: 32,
            }}>
            <TouchableOpacity
              style={{
                width: 64,
                height: 64,
                borderRadius: 100,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'orange',
                // position: 'absolute',
                // bottom: 32,
                borderWidth: 6,
                borderColor: 'rgba(252, 157, 69, 0.4)',
              }}>
              <Image
                source={IMAGE.ic_plus}
                style={{ width: 18, height: 18, resizeMode: 'contain' }}
              />
            </TouchableOpacity>
          </View> */}
        {/* </View> */}
        <View
          style={{
            flex: 1,
            backgroundColor: COLOR.white,
            borderTopRightRadius: 20,
            borderTopLeftRadius: 20,
            marginTop: 24,
            paddingVertical: 16,
            alignItems: 'center',
            paddingHorizontal: 16,
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
          <View style={{ width: '100%', marginTop: 24 }}>
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
          </View>

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
      </ImageBackground>
    </ScrollView>
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
