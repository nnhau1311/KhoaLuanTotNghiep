import * as React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import BackgroundApp from '../../components/background/BackgroundApp';
import Header from '../../components/header/Header';
import { COLOR } from '../../constants';
import { IMAGE } from '../../constants/Image';
import { MainNavigationProp } from '../../routes/type';

interface AboutProps {}

const About = ({ navigation }: MainNavigationProp, props: AboutProps) => {
  return (
    <BackgroundApp>
      <Header
        iconLeft
        iconRight
        imageLeft={IMAGE.ic_back}
        // imageRight={IMAGE.ic_glass}
        title="Information App"
        // styleLeft={{ width: 44, height: 44 }}
        styleRight={{ width: 44, height: 44 }}
        onPressLeft={() => {
          navigation.goBack();
        }}
      />
      <View style={{ flex: 1, paddingHorizontal: 16 }}>
        <View style={{ alignItems: 'center' }}>
          <Image
            source={IMAGE.icon_app}
            style={{
              width: 84,
              height: 84,
              resizeMode: 'contain',
              borderRadius: 16,
            }}
          />
          <Text
            style={{
              fontWeight: '700',
              fontSize: 24,
              marginTop: 16,
              color: COLOR.purple,
            }}>
            CHILDREN'S HABIT APP
          </Text>
          <Text style={{ fontWeight: '400', fontSize: 18, color: COLOR.gray }}>
            Phiên bản 1.0
          </Text>
        </View>
        <View style={{ marginTop: 24 }}>
          <Text
            style={{
              fontWeight: '700',
              fontSize: 20,

              color: COLOR.purple,
            }}>
            Contact Information
          </Text>
          <Text
            style={{
              fontWeight: '400',
              fontSize: 18,
              marginTop: 8,
              color: COLOR.purple,
            }}>
            {'Phone: (+84) 0944590453'}
          </Text>
          <Text
            style={{
              fontWeight: '400',
              fontSize: 18,
              marginTop: 8,
              color: COLOR.purple,
            }}>
            {'Email: ngochau3571@gmail.com'}
          </Text>
          <Text
            style={{
              fontWeight: '400',
              fontSize: 18,
              marginTop: 8,
              color: COLOR.purple,
            }}>
            {'Facebook: www.facebook.com.vn/haunn5'}
          </Text>
        </View>
      </View>
    </BackgroundApp>
  );
};

export default About;

const styles = StyleSheet.create({
  container: { flex: 1 },
});
