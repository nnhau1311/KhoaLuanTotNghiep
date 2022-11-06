import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import { COLOR } from '../../constants';

interface LoadingProps {
  backgroundColor: any;
}
const height = Dimensions.get('screen').height;
const width = Dimensions.get('screen').width;
const Loading = (props: LoadingProps) => {
  const { backgroundColor } = props;
  return (
    <View style={[styles.container, { backgroundColor: backgroundColor }]}>
      <ActivityIndicator size="large" color={COLOR.orange} />
    </View>
  );
};

export default Loading;
Loading.defaultProps = {
  backgroundColor: 'rgba(0, 0, 0, 0.2)',
};
const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    height: height,
    width: width,
    zIndex: 99999,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
