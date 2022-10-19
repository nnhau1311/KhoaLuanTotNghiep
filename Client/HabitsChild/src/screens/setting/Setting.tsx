import React, { useState } from 'react';
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
} from 'react-native';
import BackgroundApp from '../../components/background/BackgroundApp';
import Header from '../../components/header/Header';
import { COLOR } from '../../constants';
import { IMAGE } from '../../constants/Image';
import { MainNavigationProp } from '../../routes/type';

interface SettingProps {}
interface ItemButtonProps {
  title: string;
  image: any;
  switcher: boolean;
  style: ViewStyle;
  arrow: boolean;
}
const ItemButton = ({
  title,
  image,
  switcher,
  style,
  arrow,
}: ItemButtonProps) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(!isEnabled);
  return (
    <TouchableOpacity
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
        <Image
          source={image}
          style={{
            width: 40,
            height: 40,
            resizeMode: 'contain',
          }}
        />
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
          thumbColor={isEnabled ? COLOR.purple : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
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
                  {'thaianhhao@gmail.com'}
                </Text>
              </View>
              {/* <View style={{ backgroundColor: 'red' }}> */}
              <TouchableOpacity
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
        />
        <ItemButton
          image={IMAGE.ic_logout}
          title={'Log out'}
          switcher={false}
          style={{}}
          arrow={false}
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
        />
        <ItemButton
          image={IMAGE.ic_contact}
          title={'About'}
          switcher={false}
          style={{ marginBottom: 16 }}
          arrow
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
