import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import WebView from 'react-native-webview';
import { MainRoutes } from '../../routes/routes';
import { MainNavigationProp } from '../../routes/type';

interface WebViewDocProps {}

const WebViewDoc = (
  { route, navigation }: MainNavigationProp<MainRoutes.WebView>,
  props: WebViewDocProps,
) => {
  return (
    <View style={styles.container}>
      <WebView source={{ uri: route.params?.url }} />
    </View>
  );
};

export default WebViewDoc;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white' },
});
