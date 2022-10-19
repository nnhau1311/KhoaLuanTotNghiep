import * as React from 'react';
import { Text, View, StyleSheet, ImageBackground } from 'react-native';
import { IMAGE } from '../../constants/Image';

interface BackgroundAppProps {
  children: any;
}

const BackgroundApp = ({ children }: BackgroundAppProps) => {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={IMAGE.img_bg}
        style={{ width: '100%', height: '100%' }}>
        {children}
      </ImageBackground>
    </View>
  );
};

export default BackgroundApp;

const styles = StyleSheet.create({
  container: { flex: 1 },
});
