import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { NormalButton } from '../../components/button';
import TextField from '../../components/textInput/TextField';
import { COLOR, STRING } from '../../constants';
import { IMAGE } from '../../constants/Image';
import { MainNavigationProp } from '../../routes/type';

interface ForgotPassProps {}

const ForgotPass = (
  { navigation }: MainNavigationProp,
  props: ForgotPassProps,
) => {
  return (
    <View style={styles.container}>
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
              label={STRING.username}
              isRequired={false}
              imageLeft={IMAGE.ic_mail}
              value={''}
              onChangeText={(text: string) => {
                // setUsername(text);
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
            onPress={() => {}}
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
