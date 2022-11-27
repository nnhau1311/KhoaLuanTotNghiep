import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useRef, useEffect } from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  Image,
  KeyboardAvoidingView,
  Alert,
} from 'react-native';
import { NormalButton } from '../../components/button';
import ButtonLogin from '../../components/button/ButtonLogin';
import Header from '../../components/header/Header';
import Loading from '../../components/loading/Loading';
import TextField from '../../components/textInput/TextField';
import { userData } from '../../configs';
import { COLOR, STRING } from '../../constants';
import { IMAGE } from '../../constants/Image';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { Status } from '../../models';
import {
  ChangePassAction,
  resetStateChangePassAction,
} from '../../redux/reducer/userReducer';
import { MainNavigationProp } from '../../routes/type';

interface ChangePasswordProps {}

const ChangePassword = (
  { navigation }: MainNavigationProp,
  props: ChangePasswordProps,
) => {
  const [loading, setLoading] = useState(false);
  const [pass, setPass] = useState('');
  const [oldPass, setOldPass] = useState('');
  const [rePass, setRePass] = useState('');
  const refPass = useRef<any>();
  const refOld = useRef<any>();
  const refRe = useRef<any>();

  const dispatch = useAppDispatch();
  const status = useAppSelector(state => state.userReducer.statusChangePass);
  const message = useAppSelector(state => state.userReducer.messageChangePass);
  const result = useAppSelector(state => state.userReducer.changePassData);

  useEffect(() => {
    if (status === Status.success && result?.StatusCode == '200') {
      storeData();
      setLoading(false);
      Alert.alert('Notification', 'Change Password Success!', [
        {
          text: 'OK',
          onPress: () => {
            dispatch(resetStateChangePassAction());
            navigation.goBack();
          },
        },
      ]);
    } else if (status === Status.success && result?.StatusCode !== '200') {
      dispatch(resetStateChangePassAction());
      setLoading(false);
      Alert.alert('Notification', result?.message);
    }

    if (status === Status.error && message !== '') {
      dispatch(resetStateChangePassAction());
      setLoading(false);
      Alert.alert('Notification', message);
    }
  }, [status]);

  const storeData = async () => {
    try {
      const jsonDataGet = await AsyncStorage.getItem('login');
      const dataGet = JSON.parse(jsonDataGet + '');
      const data = {
        username: dataGet?.username,
        password: pass,
        isCheck: dataGet?.isCheck,
      };
      const jsonData = JSON.stringify(data);
      await AsyncStorage.setItem('Bio_password', pass);
      await AsyncStorage.setItem('login', jsonData);
    } catch (e) {
      console.log('store_Data_Login_Error', e);
    }
  };
  return (
    <View style={{ flex: 1 }}>
      {loading && <Loading />}
      <Header
        iconLeft
        iconRight
        imageLeft={IMAGE.ic_back}
        // imageRight={{}}
        title="Change password"
        // styleLeft={{ width: 44, height: 44 }}
        // styleRight={{ width: 44, height: 44 }}
        onPressLeft={() => {
          navigation.goBack();
        }}
        onPressRight={() => {}}
        styleLeft={{}}
        styleRight={{}}
      />
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <KeyboardAvoidingView
          style={{
            width: '100%',
            marginTop: 24,
            flex: 1,
            backgroundColor: 'white',
            paddingHorizontal: 16,
          }}>
          <TextField
            ref={refOld}
            isIcon={true}
            isPassword
            disabled={false}
            label={'Old Password'}
            isRequired={false}
            imageLeft={IMAGE.ic_repass}
            value={oldPass}
            onChangeText={(text: string) => {
              setOldPass(text);
            }}
            style={{ backgroundColor: '#FFF6ED' }}
            inputStyle={{ color: 'orange' }}
          />
          <TextField
            ref={refPass}
            isIcon={true}
            isPassword
            disabled={false}
            label={'New Pass'}
            isRequired={false}
            imageLeft={IMAGE.ic_lock}
            value={pass}
            onChangeText={(text: string) => {
              setPass(text);
            }}
            style={{ backgroundColor: '#FFF6ED', marginTop: 12 }}
            inputStyle={{ color: 'orange' }}
          />
          <TextField
            ref={refRe}
            isIcon={true}
            isPassword
            disabled={false}
            label={'Re-Enter the password'}
            isRequired={false}
            imageLeft={IMAGE.ic_enter}
            value={rePass}
            onChangeText={(text: string) => {
              setRePass(text);
            }}
            style={{ backgroundColor: '#FFF6ED', marginTop: 12 }}
            inputStyle={{ color: 'orange' }}
          />
        </KeyboardAvoidingView>
        <View style={{ paddingVertical: 16, paddingHorizontal: 16 }}>
          <NormalButton
            label="Change Password"
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
              //   setLoading(true);
              if (oldPass !== userData.password) {
                refOld.current.showError('Vui lòng nhập chính xác mật khẩu cũ');
              } else if (pass.length < 8) {
                refPass.current.showError('Vui lòng nhập mật khẩu từ 8 kí tự');
              } else if (rePass !== pass) {
                refPass.current.showError('Không trùng khớp');
                refRe.current.showError('Không trùng khớp');
              } else {
                setLoading(true);
                dispatch(
                  ChangePassAction({ oldPassword: oldPass, newPassword: pass }),
                );
              }
              // } else {
              //   Alert.alert('Notification', 'Please enter full information!');
              // }
            }}
          />
        </View>
      </View>
    </View>
  );
};

export default ChangePassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.bg,
    // paddingVertical: 24,
    paddingBottom: 24,
    // marginVertical: 24,
    // alignItems: 'center',
    paddingHorizontal: 16,
  },
});
