import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import BackgroundApp from '../../components/background/BackgroundApp';
import Header from '../../components/header/Header';
import { IMAGE } from '../../constants/Image';
import { MainNavigationProp } from '../../routes/type';

interface StatiticsProps {}

const Statitics = (
  { navigation }: MainNavigationProp,
  props: StatiticsProps,
) => {
  return (
    <BackgroundApp>
      <Header
        iconLeft
        iconRight
        imageLeft={IMAGE.ic_back}
        // imageRight={IMAGE.ic_glass}
        title="Statitics"
        // styleLeft={{ width: 44, height: 44 }}
        styleRight={{ width: 44, height: 44 }}
        onPressLeft={() => {
          navigation.goBack();
        }}
      />
    </BackgroundApp>
  );
};

export default Statitics;

const styles = StyleSheet.create({
  container: {},
});
