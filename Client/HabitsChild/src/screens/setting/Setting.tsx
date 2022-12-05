import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  Switch,
  ViewStyle,
  Alert,
  Platform,
  NativeModules,
  Linking,
} from 'react-native';
import TouchID from 'react-native-touch-id';
import BackgroundApp from '../../components/background/BackgroundApp';
import Header from '../../components/header/Header';
import { userData } from '../../configs';
import { COLOR, stringIsEmpty } from '../../constants';
import { IMAGE } from '../../constants/Image';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { MainNavigationProp } from '../../routes/type';
import { CommonActions } from '@react-navigation/native';
import { getInforAction, logoutAction } from '../../redux/reducer/userReducer';
import { MainRoutes } from '../../routes/routes';
import { Status } from '../../models';
const optionalConfigObject = {
  unifiedErrors: false,
  passcodeFallback: false, // if true is passed, itwill allow isSupported to return an error if the device is not enrolled in touch id/face id etc. Otherwise, it will just tell you what method is supported, even if the user is not enrolled.  (default false)
};

const fingerConig = {
  title: 'Fingerprint authentication',
  imageColor: COLOR.purple,
  imageErrorColor: COLOR.red,
  sensorDescription: 'Touch the fingerprint sensor',
  sensorErrorDescription: 'Fingerprint is not correct',
  cancelText: 'Cancel',
};
interface SettingProps {}
interface ItemButtonProps {
  title: string;
  image: any;
  switcher: boolean;
  style: ViewStyle;
  arrow: boolean;
  onPress: Function;
  styleIcon?: ViewStyle;
  viewIcon?: ViewStyle;
}
const ItemButton = ({
  title,
  image,
  switcher,
  style,
  arrow,
  onPress,
  styleIcon,
  viewIcon,
}: ItemButtonProps) => {
  const [isOnBiometrics, setBiometrics] = useState<boolean>(false);
  const toggleSwitch = () => setBiometrics(!isOnBiometrics);
  const checkBioMetrics = async () => {
    let BioValue = false;

    try {
      const value = await AsyncStorage.getItem('BIO');
      const bioAccount = {
        username: await AsyncStorage.getItem('Bio_username'),
        password: await AsyncStorage.getItem('Bio_password'),
      };
      const currentAccount = {
        username: await AsyncStorage.getItem('username'),
        password: await AsyncStorage.getItem('password'),
      };
      console.log('1111111111111111', value === 'true', value);
      console.log(
        '2222222222222222',
        bioAccount.username == currentAccount.username,
        bioAccount.username,
        currentAccount.username,
      );
      console.log(
        '3333333333333333',
        bioAccount.password == currentAccount.password,
        bioAccount.password,
        currentAccount.password,
      );

      if (value !== null) {
        return (BioValue =
          value === 'true' &&
          bioAccount.username == currentAccount.username &&
          bioAccount.password == currentAccount.password
            ? true
            : false);
      }
      return BioValue;
    } catch (e) {}
    return BioValue;
  };
  useEffect(() => {
    async function checkBio(): Promise<void> {
      let check = await checkBioMetrics();

      setBiometrics(check);
    }
    checkBio();
  }, [isOnBiometrics]);
  const checkBioSupport = async () => {
    console.log('NNNNNNNNN');
    return TouchID.isSupported(optionalConfigObject)
      .then(biometryType => {
        // Success code
        userData.BIOMETRICS = biometryType;
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

        if (Platform.OS == 'android') {
          console.log('first', error.code);
          if (error.code == 'NOT_AVAILABLE') {
            Alert.alert(
              'Notification',
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
              'Notification',
              'Điện thoại của bạn không hỗ trợ xác thực vân tay/ khuôn mặt',
            );
          }
        } else {
          if (error.name == 'LAErrorTouchIDNotEnrolled') {
            Alert.alert(
              'Notification',
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
              'Notification',
              'Điện thoại của bạn không hỗ trợ xác thực vân tay/ khuôn mặt',
            );
          }
        }
        return false;
      });
  };
  const turnOnOffBio = async (
    check: boolean | ((prevState: boolean) => boolean),
  ) => {
    //NOTE: khi nào tích hợp vân tay thì mở cả đống này ra
    try {
      let result = await checkBioSupport();

      if (result) {
        TouchID.authenticate('', fingerConig)
          .then(async (success: any) => {
            if (!stringIsEmpty(userData.BIOMETRICS)) {
              await setBiometrics(check);
              console.log('isOnBiometricsisOnBiometrics', check);
              const currentAccount = {
                username: await AsyncStorage.getItem('username'),
                password: await AsyncStorage.getItem('password'),
              };
              await AsyncStorage.setItem('BIO', check.toString());
              await AsyncStorage.setItem(
                'Bio_username',
                currentAccount.username,
              );
              await AsyncStorage.setItem(
                'Bio_password',
                currentAccount.password,
              );
              setBiometrics(true);
            } else {
              await setBiometrics(false);
              await AsyncStorage.setItem('BIO', 'false');
              setBiometrics(false);
            }

            return true;
          })
          .catch((error: any) => {
            console.log('ERRRORRRR', error);
            return false;
          });
      } else {
        return false;
      }
    } catch (e) {
      console.log('ERRRORRRR', e);
      return false;
    }
  };
  const openSettings = () => {
    if (Platform.OS !== 'ios') {
      NativeModules.OpenSettings.openNetworkSettings(() => {});
    } else {
      Linking.openURL('App-Prefs:PASSCODE');
    }
  };

  return (
    <TouchableOpacity
      onPress={() => {
        onPress && onPress();
      }}
      style={[
        styles.viewRow,
        {
          borderRadius: 12,
          backgroundColor: COLOR.white,
          paddingVertical: 16,
          paddingHorizontal: 12,
          marginTop: 6,
          marginHorizontal: 16,
        },
        style,
      ]}>
      <View style={styles.viewRow}>
        <View style={viewIcon}>
          <Image
            source={image}
            style={[
              {
                width: 40,
                height: 40,
                resizeMode: 'contain',
                tintColor: 'orange',
              },
              styleIcon,
            ]}
          />
        </View>

        <Text
          style={{
            fontWeight: '500',
            fontSize: 16,
            lineHeight: 18,
            color: COLOR.purple,
            marginLeft: 12,
          }}>
          {title}
        </Text>
      </View>
      {switcher ? (
        <Switch
          trackColor={{ false: COLOR.gray1, true: 'rgba(87, 51, 83, 0.5)' }}
          thumbColor={isOnBiometrics ? COLOR.purple : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={async () => {
            toggleSwitch();

            console.log('111111111111111---->>>>', isOnBiometrics);
            await turnOnOffBio(!isOnBiometrics);
          }}
          value={isOnBiometrics}
        />
      ) : arrow ? (
        <View style={styles.viewRow}>
          {/* <Text
          style={{
            fontWeight: '700',
            fontSize: 16,
            lineHeight: 18,
            color: COLOR.purple,
            marginLeft: 12,
          }}>
          20 Days
        </Text> */}
          <Image
            source={IMAGE.ic_arrow_right}
            style={{
              width: 14,
              height: 14,
              resizeMode: 'contain',
            }}
          />
        </View>
      ) : null}
    </TouchableOpacity>
  );
};
const Setting = ({ navigation }: MainNavigationProp, props: SettingProps) => {
  const dispatch = useAppDispatch();
  const onPressLogOut = async () => {
    try {
      await AsyncStorage.setItem('login', '');
      userData.username = '';
      userData.BIOMETRICS = '';
      userData.token = '';

      dispatch(logoutAction());
      navigation.dispatch(
        CommonActions.reset({
          index: 1,
          routes: [{ name: 'Login', params: { logout: 'logout' } }],
        }),
      );
      // setLoading(false);
    } catch (error) {
      // setLoading(false);
    }
  };

  const messageInfor = useAppSelector(
    state => state.userReducer.messageInforUser,
  );
  const statusInfor = useAppSelector(
    state => state.userReducer.statusInforUser,
  );
  const dataInfor = useAppSelector(state => state.userReducer.InforUserData);
  useEffect(() => {
    dispatch(getInforAction());
  }, []);
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      console.log('first');
      dispatch(getInforAction());
    });

    return unsubscribe;
  }, [navigation]);
  useEffect(() => {
    if (statusInfor === Status.success && dataInfor?.StatusCode === '200') {
      console.log('daataaInfor', dataInfor.Data);
    } else if (
      statusInfor === Status.success &&
      dataInfor?.StatusCode !== '200'
    ) {
      Alert.alert('Notification', 'Get Information User Error');
    }
    if (statusInfor === Status.error && messageInfor) {
      Alert.alert('Notification', messageInfor);
    }
  }, [statusInfor]);
  return (
    <BackgroundApp>
      <Header
        iconLeft
        iconRight
        imageLeft={IMAGE.ic_back}
        // imageRight={IMAGE.ic_glass}
        title="Settings"
        // styleLeft={{ width: 44, height: 44 }}
        styleRight={{ width: 44, height: 44 }}
        onPressLeft={() => {
          navigation.goBack();
        }}
      />
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        <View
          style={{
            // paddingVertical: 16,
            marginHorizontal: 16,
            // paddingHorizontal: 16,
            // marginTop: 24,
            backgroundColor: 'white',
            height: Dimensions.get('screen').height * 0.2,

            borderRadius: 16,
            flexDirection: 'row',
          }}>
          <ImageBackground
            imageStyle={{ borderRadius: 12 }}
            source={IMAGE.img_child}
            style={{ width: '100%', height: '100%' }}>
            <View
              style={{
                paddingVertical: 16,

                width: '100%',
                height: '100%',
                marginLeft: 32,
                justifyContent: 'space-between',
                // backgroundColor: 'red',
              }}>
              <View>
                <Text
                  style={{
                    fontWeight: '700',
                    color: COLOR.purple,
                    fontSize: 20,
                    lineHeight: 26,
                    // marginLeft: 16,
                  }}>
                  {'Check Your Profile'}
                </Text>
                <Text
                  style={{
                    fontWeight: '400',
                    color: COLOR.purple,
                    fontSize: 14,
                    lineHeight: 26,
                    // marginLeft: 16,
                  }}>
                  {dataInfor?.Data.email}
                </Text>
              </View>
              {/* <View style={{ backgroundColor: 'red' }}> */}
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate(MainRoutes.ViewProfile, {
                    dataProfile: dataInfor?.Data,
                  });
                }}
                style={{
                  width: '25%',
                  paddingVertical: 12,
                  // paddingHorizontal: 48,
                  borderRadius: 8,
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: COLOR.orange,
                }}>
                <Text
                  style={{
                    fontWeight: '700',
                    color: COLOR.purple,
                    fontSize: 14,
                    lineHeight: 16,
                  }}>
                  {'View'}
                </Text>
              </TouchableOpacity>
            </View>
            {/* </View> */}
          </ImageBackground>
        </View>
        <Text
          style={{
            fontWeight: '400',
            color: COLOR.purple,
            fontSize: 18,
            lineHeight: 24,
            marginLeft: 16,
            marginTop: 16,
            marginBottom: 16,
          }}>
          General
        </Text>
        <ItemButton
          onPress={() => {
            navigation.navigate(MainRoutes.Statitics);
          }}
          image={IMAGE.ic_thongke}
          title={'Thống kê'}
          switcher={false}
          styleIcon={{ width: 18, height: 18 }}
          style={{}}
          arrow
          viewIcon={{
            backgroundColor: 'rgba(253, 167, 88, 0.2)',
            width: 40,
            height: 40,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 8,
          }}
        />
        <ItemButton
          onPress={() => {}}
          image={IMAGE.ic_face}
          title={'Login with biometrics'}
          switcher
          style={{}}
          arrow={false}
        />
        <ItemButton
          image={IMAGE.ic_locked}
          title={'Change password'}
          switcher={false}
          style={{}}
          arrow
          onPress={() => {
            navigation.navigate(MainRoutes.ChangePassword);
          }}
        />
        <ItemButton
          image={IMAGE.ic_logout}
          title={'Log out'}
          switcher={false}
          style={{}}
          arrow={false}
          onPress={() => {
            onPressLogOut();
          }}
        />
        <Text
          style={{
            fontWeight: '400',
            color: COLOR.purple,
            fontSize: 18,
            lineHeight: 24,
            marginLeft: 16,
            marginTop: 16,
            marginBottom: 16,
          }}>
          Support
        </Text>
        <ItemButton
          image={IMAGE.ic_about}
          title={'Contact'}
          switcher={false}
          style={{}}
          arrow
          onPress={() => {
            Linking.openURL(`tel:${'0944590453'}`);
          }}
        />
        <ItemButton
          image={IMAGE.ic_contact}
          title={'About'}
          switcher={false}
          style={{ marginBottom: 16 }}
          arrow
          onPress={() => {
            navigation.navigate(MainRoutes.About);
          }}
        />
      </ScrollView>
    </BackgroundApp>
  );
};

export default Setting;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLOR.bg },
  viewRow: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
});
