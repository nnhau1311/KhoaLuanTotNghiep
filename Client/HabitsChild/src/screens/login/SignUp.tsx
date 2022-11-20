import React, { useEffect, useRef, useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { NormalButton } from '../../components/button';
import ButtonLogin from '../../components/button/ButtonLogin';
import Loading from '../../components/loading/Loading';
import TextField from '../../components/textInput/TextField';
import {
  COLOR,
  SIZE,
  STRING,
  validateEmail,
  validateFullName,
} from '../../constants';
import { IMAGE } from '../../constants/Image';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { Status } from '../../models';
import {
  resetStateSignUpAction,
  signupAction,
} from '../../redux/reducer/userReducer';
import { MainNavigationProp } from '../../routes/type';
import { RegexEmail } from './ForgotPass';

interface SingUpProps {}

const SignUp = ({ navigation }: MainNavigationProp, props: SingUpProps) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const refName = useRef<any>();
  const refMail = useRef<any>();
  const refUser = useRef<any>();
  const refPass = useRef<any>();
  const dispatch = useAppDispatch();
  const status = useAppSelector(state => state.userReducer.statusSignUp);
  const message = useAppSelector(state => state.userReducer.messageSignUp);
  const result = useAppSelector(state => state.userReducer.signUpdata);
  useEffect(() => {
    if (status === Status.success && result?.StatusCode == '200') {
      Alert.alert(
        'Notification',
        'Create Account Success! Please access your email and follow the instructions to be able to log in.',
        [
          {
            text: 'OK',
            onPress: () => {
              dispatch(resetStateSignUpAction());
              navigation.goBack();
            },
          },
        ],
      );
    } else if (status === Status.success && result?.StatusCode !== '200') {
      dispatch(resetStateSignUpAction());
      setLoading(false);
      Alert.alert('Notification', result?.message);
    }

    if (status === Status.error && message !== '') {
      dispatch(resetStateSignUpAction());
      setLoading(false);
      Alert.alert('Notification', message);
    }
  }, [status]);

  const RegexInfo = (
    fullName: string,
    mail: string,
    user: string,
    pass: string,
  ) => {
    if (!validateFullName(fullName)) {
      refName.current.showError('Vui lòng nhập đúng thông tin');
      return false;
    } else if (!validateEmail(mail)) {
      refMail.current.showError('Vui lòng nhập đúng định dạng');
      return false;
    } else if (user.length < 6) {
      refUser.current.showError('Vui lòng nhập tối thiểu 6 kí tự');
      return false;
    }
    if (pass.length < 8) {
      refPass.current.showError('Vui lòng nhập tối thiểu 8 kí tự');
      return false;
    } else {
      return true;
    }
  };
  return (
    <View style={{ flex: 1 }}>
      {loading && <Loading />}
      <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
        <View style={{ width: '100%', alignItems: 'center' }}>
          <Image
            source={IMAGE.img_signup}
            style={{ width: 200, height: 200, resizeMode: 'contain' }}
          />
        </View>
        <Text
          style={{
            fontSize: 24,
            fontWeight: '700',
            textAlign: 'center',
            lineHeight: 32,
            color: COLOR.purple,
            marginTop: 24,
          }}>
          {'Create your account'.toUpperCase()}
        </Text>
        <View style={{ width: '100%', marginTop: 24 }}>
          <TextField
            ref={refName}
            isIcon={true}
            isPassword={false}
            disabled={false}
            label={'Full name'}
            isRequired={false}
            imageLeft={IMAGE.ic_fullname}
            value={fullName}
            onChangeText={(text: string) => {
              setFullName(text);
            }}
            style={{ backgroundColor: '#FFF6ED' }}
            inputStyle={{ color: 'orange' }}
          />
          <TextField
            // ref={user}
            ref={refMail}
            isIcon={true}
            isPassword={false}
            disabled={false}
            label={'Email'}
            isRequired={false}
            imageLeft={IMAGE.ic_mail}
            value={email}
            onChangeText={(text: string) => {
              setEmail(text);
            }}
            style={{ backgroundColor: '#FFF6ED' }}
            inputStyle={{ color: 'orange' }}
          />
          <TextField
            ref={refUser}
            isIcon={true}
            isPassword={false}
            disabled={false}
            label={STRING.username}
            isRequired={false}
            imageLeft={IMAGE.ic_user}
            value={username}
            onChangeText={(text: string) => {
              setUserName(text);
            }}
            style={{ backgroundColor: '#FFF6ED', marginTop: 12 }}
            inputStyle={{ color: 'orange' }}
          />
          <TextField
            ref={refPass}
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
          <NormalButton
            label="Create Account"
            style={{
              backgroundColor: '#FDA758',
              paddingVertical: 8,
              borderRadius: 12,
              marginTop: 16,
            }}
            labelStyle={{
              fontWeight: '700',
              color: COLOR.purple,
              fontSize: 16,
            }}
            onPress={() => {
              if (fullName && email && username && password) {
                if (RegexInfo(fullName, email, username, password)) {
                  const data = {
                    userFullName: fullName,
                    email: email,
                    userName: username,
                    userPassword: password,
                    role: 'staff',
                  };
                  console.log('dataaaa', data);
                  setLoading(true);
                  dispatch(signupAction(data));
                }
              } else {
                Alert.alert('Notification', 'Please enter full information!');
              }
            }}
          />
        </View>
        <Text
          style={{
            fontWeight: '400',
            color: COLOR.purple,
            fontSize: 14,
            lineHeight: 14,
            opacity: 0.5,
            marginTop: 16,
            textAlign: 'center',
          }}>
          {'Or sign in with'}
        </Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
            paddingTop: 20,
            // backgroundColor: 'blue',
          }}>
          <ButtonLogin
            source={IMAGE.ic_gg}
            title={'Google'}
            style={{ width: '48%' }}
          />
          <ButtonLogin
            source={IMAGE.ic_fb}
            title={'Facebook'}
            style={{ width: '48%' }}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 6,
            paddingVertical: 24,
          }}>
          <Text
            style={{
              fontWeight: '400',
              color: COLOR.purple,
              fontSize: 14,
              lineHeight: 14,
            }}>
            {'Already have an account? '}
          </Text>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}>
            <Text
              style={{
                fontWeight: '700',
                color: COLOR.purple,
                fontSize: 14,
                lineHeight: 14,
              }}>
              Sign In
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default SignUp;

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
