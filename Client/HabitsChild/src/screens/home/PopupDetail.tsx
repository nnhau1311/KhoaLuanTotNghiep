import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
} from 'react-native';
import { COLOR } from '../../constants';
import { IMAGE } from '../../constants/Image';

interface PopupDetailProps {
  onClose: Function;
}

const PopupDetail = ({ onClose }: PopupDetailProps) => {
  return (
    <View
      style={{
        width: Dimensions.get('screen').width,

        height: Dimensions.get('window').height,
        backgroundColor: 'rgba(4, 9, 32, 0.2)',
        position: 'absolute',
        justifyContent: 'flex-end',
      }}>
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => {
            onClose && onClose();
          }}
          style={{ position: 'absolute', right: 16, top: 16 }}>
          <Image
            source={IMAGE.ic_close}
            style={{ width: 32, height: 32, resizeMode: 'contain' }}
          />
        </TouchableOpacity>
        <Image
          source={IMAGE.ic_leu}
          style={{ width: 312, height: 312, resizeMode: 'contain' }}
        />
        <Text
          style={{
            fontWeight: '700',
            fontSize: 18,
            lineHeight: 24,
            color: COLOR.purple,
          }}>
          {'Congratulations!'.toUpperCase()}
        </Text>
        <Text
          style={{
            fontWeight: '400',
            fontSize: 16,
            lineHeight: 22,
            color: COLOR.purple,
            opacity: 0.5,
            textAlign: 'center',
          }}>
          {
            'Ut enim ad minim veniam, quis nostrud\nexercitation ullamco laboris'
          }
        </Text>
        <TouchableOpacity
          style={[
            styles.btnMark,
            { backgroundColor: COLOR.orange, marginTop: 24 },
          ]}>
          <Text style={styles.txtMark}>Create New Habit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.btnMark,
            { backgroundColor: 'rgba(255, 243, 233, 1)', marginTop: 16 },
          ]}>
          <Text style={styles.txtMark}>Continue</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PopupDetail;

const styles = StyleSheet.create({
  container: {
    borderRadius: 24,
    backgroundColor: 'white',
    // height: Dimensions.get('screen').height * 0.7,
    width: Dimensions.get('screen').width - 32,
    paddingVertical: 16,
    marginBottom: 16,
    marginHorizontal: 16,
    alignItems: 'center',
  },
  btnMark: {
    width: Dimensions.get('screen').width - 64,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 16,
    paddingVertical: 22,
  },
  txtMark: {
    color: COLOR.purple,
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 16,
  },
});
