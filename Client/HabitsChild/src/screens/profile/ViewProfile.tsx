import {
  Alert,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  View,
} from 'react-native';
import React, { Component, useEffect, useRef, useState } from 'react';

import { NormalButton } from '../../components/button';
import { MainNavigationProp } from '../../routes/type';
import TextField from '../../components/textInput/TextField';
import { ScrollView } from 'react-native-gesture-handler';
import { useIsFocused } from '@react-navigation/native';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { Status } from '../../models';

import { userData } from '../../configs';
import { IMAGE } from '../../constants/Image';
import Header from '../../components/header/Header';
import { COLOR, STRING } from '../../constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MainRoutes } from '../../routes/routes';
import {
  resetStateUpdateInforAction,
  UpdateInforAction,
} from '../../redux/reducer/userReducer';
import { UpdateInforDTO } from '../../dto';
import Loading from '../../components/loading/Loading';

interface ViewProfileProps {}

const ViewProfile = (
  { navigation, route }: MainNavigationProp<MainRoutes.ViewProfile>,
  props: ViewProfileProps,
) => {
  const isFocused = useIsFocused();
  const dataProfile = route.params?.dataProfile;
  const [image, setImage] = useState(IMAGE.ic_avt);
  useEffect(() => {
    if (isFocused) {
      getAvt();
    }
  }, [isFocused]);

  const getAvt = async () => {
    try {
      const jsonData = await AsyncStorage.getItem('image');
      const data = JSON.parse(jsonData);
      setImage(data.img);
    } catch (e) {
      console.log('getDataError: ', e);
    }
  };
  const [keyboardStatus, setKeyboardStatus] = useState(false);
  const [name, setName] = useState(route.params?.dataProfile?.userFullName);
  const [mail, setMail] = useState(route.params?.dataProfile?.email);
  const [phone, setPhone] = useState(
    route.params?.dataProfile?.userNumberPhone || '',
  );
  const [address, setAddress] = useState(
    route.params?.dataProfile?.userAddress || '',
  );
  const [loading, setLoading] = useState(false);
  const telephone = useRef<any>();
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
  const checkPhone = (phone: string) => {
    return /(((\+|)84)|0)(3|5|7|8|9)+([0-9]{8})\b/.test(phone);
  };

  const dispatch = useAppDispatch();
  const message = useAppSelector(state => state.userReducer.messageInforUser);
  const status = useAppSelector(state => state.userReducer.statusUpdateInfor);
  const data = useAppSelector(state => state.userReducer.updateInforData);
  useEffect(() => {
    if (status === Status.success && data?.StatusCode === '200') {
      setLoading(false);
      Alert.alert('Notification', 'Update Information Success!', [
        {
          text: 'Ok',
          onPress: () => {
            dispatch(resetStateUpdateInforAction());
            navigation.goBack();
          },
        },
      ]);
    } else if (status === Status.success && data?.StatusCode !== '200') {
      setLoading(false);
      Alert.alert('Notification', 'Update Information Error!', [
        {
          text: 'Ok',
          onPress: () => {
            dispatch(resetStateUpdateInforAction());
            navigation.goBack();
          },
        },
      ]);
    }
    if (status === Status.error && message) {
      setLoading(false);
      Alert.alert('Notification', message, [
        {
          text: 'Ok',
          onPress: () => {
            dispatch(resetStateUpdateInforAction());
            navigation.goBack;
          },
        },
      ]);
    }
  }, [status]);
  return (
    <View style={styles.container}>
      {loading && <Loading />}
      <Header
        iconLeft
        iconRight
        imageLeft={IMAGE.ic_back}
        // imageRight={{}}
        title="View Profile"
        // styleLeft={{ width: 44, height: 44 }}
        // styleRight={{ width: 44, height: 44 }}
        onPressLeft={() => {
          navigation.goBack();
        }}
        onPressRight={() => {}}
        styleLeft={{}}
        styleRight={{}}
      />
      <View style={{ flex: 1, paddingVertical: 16 }}>
        {/* <View
            style={{
              alignItems: 'center',
              paddingVertical: 32,
            }}>
            <Image source={image} style={styles.img} />
            <Text style={styles.textName}>{name}</Text>
          
          </View> */}

        <KeyboardAvoidingView
          behavior="padding"
          style={{ flex: 1, paddingHorizontal: 16 }}>
          <TouchableNativeFeedback>
            <ScrollView>
              <TextField
                isIcon={false}
                isPassword={false}
                // disabled={true}
                label={'Họ và tên'}
                isRequired={false}
                value={name}
                onChangeText={(txt: string) => {
                  setName(txt);
                }}
              />
              <TextField
                isIcon={false}
                isPassword={false}
                disabled={true}
                value={mail}
                label={'Email'}
                isRequired={false}
                style={{ marginTop: 32 }}
              />
              <TextField
                isIcon={false}
                isPassword={false}
                disabled={false}
                value={address}
                label={'Address'}
                isRequired={false}
                style={{ marginTop: 32 }}
                onChangeText={(txt: string) => {
                  setAddress(txt);
                }}
              />
              <TextField
                ref={telephone}
                isIcon={false}
                isPassword={false}
                disabled={false}
                label={'Số điện thoại'}
                isRequired={false}
                style={{ marginTop: 32 }}
                keyboardType={'numeric'}
                value={phone}
                onChangeText={(text: string) => {
                  setPhone(text);
                }}
                maxLenght={10}
              />
            </ScrollView>
          </TouchableNativeFeedback>
        </KeyboardAvoidingView>
      </View>

      <View style={{ paddingHorizontal: 16 }}>
        <NormalButton
          onPress={() => {
            if (phone.length < 10 || phone.length > 10 || !checkPhone(phone)) {
              telephone.current.showError('Vui lòng nhập đúng định dạng');
            } else {
              const data: UpdateInforDTO = {
                userAddress: address,
                userFullName: name,
                userNumberPhone: phone,
              };
              setLoading(true);
              dispatch(UpdateInforAction(data));
            }
          }}
          label={'Save'}
          style={styles.btn}
          labelStyle={styles.textBtn}
        />
      </View>
    </View>
  );
};

export default ViewProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingHorizontal: 16,
    backgroundColor: 'white',
  },
  body: {
    flex: 1,
  },
  btn: {
    paddingVertical: 8,
    backgroundColor: COLOR.orange,
    borderRadius: 12,
    marginBottom: 16,
  },
  textBtn: {
    fontSize: 16,
    fontWeight: '700',
    //fontFamily: FONT.bold,
  },
  img: {
    width: 64,
    height: 64,
    resizeMode: 'contain',
  },
  textName: {
    fontWeight: '700',
    fontSize: 16,
    color: '#262626',
    //fontFamily: FONT.bold,
    marginTop: 48,
  },
  textPosition: {
    fontWeight: '400',
    fontSize: 12,
    color: '#8C8C8C',
    //fontFamily: FONT.regular,
  },
});
