import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { COLOR } from '../../constants';
import { STYLES } from '../../constants/Style';

interface HeaderProps {
  iconLeft: boolean;
  iconRight: boolean;
  imageLeft: any;
  imageRight: any;
  title?: string;
  styleLeft: any;
  styleRight: any;
  onPressLeft: Function;
  onPressRight: Function;
}

const Header = (props: HeaderProps) => {
  const {
    iconLeft,
    iconRight,
    imageLeft,
    imageRight,
    title,
    styleRight,
    styleLeft,
    onPressLeft,
    onPressRight,
  } = props;
  return (
    <View style={[styles.container, { paddingTop: StatusBar.currentHeight }]}>
      <View style={{ width: '20%', justifyContent: 'center' }}>
        {iconLeft && (
          <TouchableOpacity
            onPress={() => {
              onPressLeft && onPressLeft();
            }}
            style={[styles.circle, { backgroundColor: 'rgb(200, 200, 200)' }]}>
            <Image source={imageLeft} style={[STYLES.icon24, styleLeft]} />
          </TouchableOpacity>
        )}
      </View>

      <Text
        numberOfLines={1}
        style={[
          styles.title,
          {
            width: !iconLeft || !iconRight ? '80%' : '60%',
            textAlign: 'center',
          },
        ]}>
        {title}
      </Text>

      <View
        style={{
          width: '20%',
          justifyContent: 'center',
          alignItems: 'flex-end',
        }}>
        {iconRight && (
          <TouchableOpacity
            style={[
              styles.circle,
              {
                backgroundColor: imageRight ? 'rgb(200, 200, 200)' : undefined,
              },
            ]}
            onPress={() => {
              onPressRight && onPressRight();
            }}>
            <Image source={imageRight} style={[STYLES.icon16, styleRight]} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};
Header.propsDefault = {
  iconLeft: false,
  iconRight: false,
  imageLeft: {},
  imageRight: {},
};
export default Header;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 12,

    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',
    paddingHorizontal: 16,
  },
  title: {
    fontWeight: '700',
    fontSize: 18,
    lineHeight: 32,
    color: COLOR.purple,
    // width: '80%',
  },
  circle: {
    width: 44,
    height: 44,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgb(200, 200, 200)',
  },
});
