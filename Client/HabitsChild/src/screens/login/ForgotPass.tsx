import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { NormalButton } from '../../components/button';
import Loading from '../../components/loading/Loading';
import TextField from '../../components/textInput/TextField';
import { COLOR, STRING } from '../../constants';
import { IMAGE } from '../../constants/Image';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { Status } from '../../models';
import {
  resetPassAction,
  resetStateResetPassAction,
} from '../../redux/reducer/userReducer';
import { MainNavigationProp } from '../../routes/type';

interface ForgotPassProps {}
export const RegexEmail = (email: string) => {
  let regex = new RegExp('[a-z0-9]+@[a-z]+.[a-z]{2,3}');
  return regex.test(email);
};
const ForgotPass = (
  { navigation }: MainNavigationProp,
  props: ForgotPassProps,
) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const status = useAppSelector(state => state.userReducer.statusResetPass);
  const message = useAppSelector(state => state.userReducer.messageResetPass);
  const result = useAppSelector(state => state.userReducer.resetPassData);

  useEffect(() => {
    if (status === Status.success && result?.StatusCode == '200') {
      Alert.alert(
        'Notification',
        'Reset Password Success! Please access your email and follow the instructions to be able to log in.',
        [
          {
            text: 'OK',
            onPress: () => {
              dispatch(resetStateResetPassAction());
              navigation.goBack();
            },
          },
        ],
      );
    } else if (status === Status.success && result?.StatusCode !== '200') {
      dispatch(resetStateResetPassAction());
      setLoading(false);
      Alert.alert('Notification', result?.message);
    }

    if (status === Status.error && message !== '') {
      dispatch(resetStateResetPassAction());
      setLoading(false);
      Alert.alert('Notification', message);
    }
  }, [status, message, result]);
  return (
    <View style={styles.container}>
      {loading && <Loading />}
      <View style={{ flex: 1 }}>
        <Text
          style={{
            fontSize: 24,
            fontWeight: '700',
            textAlign: 'center',
            lineHeight: 32,
            color: COLOR.purple,
            marginTop: 24,
          }}>
          {'Forgot your password?'.toUpperCase()}
        </Text>
        <View
          style={{
            width: '100%',
            alignItems: 'center',
            paddingVertical: 24,
            justifyContent: 'center',
          }}>
          <Image
            source={IMAGE.img_forgotpass}
            style={{ width: 200, height: 200, resizeMode: 'contain' }}
          />
        </View>
        <View
          style={{
            borderRadius: 12,
            backgroundColor: COLOR.white,
            paddingVertical: 16,
            paddingHorizontal: 16,
            marginHorizontal: 16,
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontWeight: '500',
              color: COLOR.purple,
              fontSize: 14,
              lineHeight: 22,
              textAlign: 'center',
            }}>
            {
              'Enter your registered email below to receive\n password reset instruction'
            }
          </Text>
          <View style={{ width: '100%' }}>
            <TextField
              // ref={user}
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
              style={{ backgroundColor: '#FFF6ED', marginTop: 12 }}
              inputStyle={{ color: 'orange' }}
            />
          </View>
          <NormalButton
            label="Send Reset Link"
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
              if (email) {
                if (!RegexEmail(email)) {
                  Alert.alert(
                    'Notification',
                    'Please enter the correct format!',
                  );
                } else {
                  setLoading(true);
                  dispatch(resetPassAction({ userInfor: email }));
                }
              } else {
                Alert.alert('Notification', 'Please enter full information!');
              }
            }}
          />
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text
          style={{
            fontWeight: '400',
            color: COLOR.purple,
            fontSize: 14,
            lineHeight: 14,
          }}>
          {'Remember password? '}
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
            Login
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ForgotPass;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#E5E5E5', paddingVertical: 24 },
});
