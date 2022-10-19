import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { NormalButton } from '../../components/button';
import ButtonLogin from '../../components/button/ButtonLogin';
import TextField from '../../components/textInput/TextField';
import { COLOR, SIZE, STRING } from '../../constants';
import { IMAGE } from '../../constants/Image';
import { MainNavigationProp } from '../../routes/type';

interface SingUpProps {}

const SignUp = ({ navigation }: MainNavigationProp, props: SingUpProps) => {
  return (
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
          // ref={user}
          isIcon={true}
          isPassword={false}
          disabled={false}
          label={'Full name'}
          isRequired={false}
          imageLeft={IMAGE.ic_user}
          value={''}
          onChangeText={(text: string) => {
            // setUsername(text);
          }}
          style={{ backgroundColor: '#FFF6ED' }}
          inputStyle={{ color: 'orange' }}
        />
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
        <TextField
          // ref={pass}
          isIcon={true}
          isPassword={true}
          disabled={false}
          label={STRING.password}
          isRequired={false}
          imageLeft={IMAGE.ic_lock}
          value={''}
          onChangeText={(text: string) => {
            // setPassword(text);
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
          onPress={() => {}}
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
