import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { COLOR, SIZE } from '../../constants';

interface NormalButtonProps {
  label: string;
  style: Object;
  onPress: Function;
  labelStyle: any;
}

export const NormalButton = ({
  label,
  style,
  onPress,
  labelStyle,
}: NormalButtonProps) => {
  return (
    <TouchableOpacity
      style={[styles.container, style]}
      onPress={() => onPress()}>
      <Text style={[styles.label, labelStyle]}>{label}</Text>
    </TouchableOpacity>
  );
};

NormalButton.defaultProps = {
  label: 'button',
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLOR.primary,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    color: COLOR.white,
    paddingVertical: SIZE.s20,
  },
});
