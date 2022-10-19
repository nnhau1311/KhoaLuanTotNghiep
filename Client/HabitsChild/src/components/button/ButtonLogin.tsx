import * as React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { COLOR } from '../../constants';
import { IMAGE } from '../../constants/Image';
import { STYLES } from '../../constants/Style';

interface ButtonLoginProps {
  source: any;
  title: string;
  style: any;
}

const ButtonLogin = (props: ButtonLoginProps) => {
  const { source, title, style } = props;
  return (
    <TouchableOpacity style={[styles.container, style]}>
      <Image source={source} style={STYLES.icon24} />
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
};

export default ButtonLogin;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLOR.white,
    borderRadius: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: COLOR.purple,
    lineHeight: 16,
    marginLeft: 8,
  },
});
