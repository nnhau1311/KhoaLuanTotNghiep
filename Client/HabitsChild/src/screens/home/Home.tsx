import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  ImageBackground,
  FlatList,
  Alert,
} from 'react-native';
import Header from '../../components/header/Header';
import TabHorizontal from '../../components/tab/TabHorizontal';
import { COLOR } from '../../constants';
import { IMAGE } from '../../constants/Image';
import { STYLES } from '../../constants/Style';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { ItemHabit, Status } from '../../models';
import { getListHabitsAction } from '../../redux/reducer/habitsReducer';
import { MainRoutes } from '../../routes/routes';
import { MainNavigationProp } from '../../routes/type';

interface HomeProps {}

const Home = ({ navigation }: MainNavigationProp, props: HomeProps) => {
  const [dataHabits, setDataHabits] = useState([]);
  const dispatch = useAppDispatch();
  const status = useAppSelector(state => state.habitsReducer.statusListHabits);
  const message = useAppSelector(
    state => state.habitsReducer.messageListHabits,
  );
  const result = useAppSelector(state => state.habitsReducer.listHabitsData);
  useEffect(() => {
    dispatch(getListHabitsAction());
  }, []);
  useEffect(() => {
    if (status === Status.success && result?.StatusCode === '200') {
      setDataHabits(result.Data.content);
    } else if (status === Status.success && result?.StatusCode !== '200') {
      Alert.alert('Notification', 'Get list habits error');
    }
    if (status === Status.error && message) {
      Alert.alert('Notification', message);
    }
  }, [status]);
  return (
    <View style={styles.container}>
      <Header
        onPressLeft={() => {}}
        onPressRight={() => {}}
        iconLeft
        iconRight
        imageLeft={IMAGE.ic_menu}
        imageRight={IMAGE.ic_avt}
        title="Homepage"
        styleLeft={{ width: 44, height: 44 }}
        styleRight={{ width: 44, height: 44 }}
      />
      <View onLayout={e => {}} style={{ flex: 1, width: '100%' }}>
        <View
          style={{
            // paddingVertical: 16,
            marginHorizontal: 16,
            // paddingHorizontal: 16,
            backgroundColor: 'white',
            height: Dimensions.get('screen').height * 0.2,

            borderRadius: 16,
            flexDirection: 'row',
          }}>
          <ImageBackground
            imageStyle={{ borderRadius: 12 }}
            source={IMAGE.img_child}
            style={{ width: '100%', height: '100%', justifyContent: 'center' }}>
            <Text
              style={{
                fontWeight: '700',
                color: COLOR.purple,
                fontSize: 18,
                lineHeight: 22,
                marginLeft: 16,
              }}>
              {'We first make our habits,\nand then our habits\nmakes us.'}
            </Text>
          </ImageBackground>
        </View>
        <View style={{ flex: 1 }}>
          <ImageBackground
            source={IMAGE.img_bg}
            style={{ width: '100%', height: '100%' }}>
            <View style={{ paddingHorizontal: 16 }}>
              <TabHorizontal
                data={[]}
                onChangeTab={() => {
                  console.log('tabbbbbbbbbbb', dataHabits);
                }}
              />

              <FlatList
                showsVerticalScrollIndicator={false}
                data={dataHabits}
                keyExtractor={item => {
                  item.id.toString();
                }}
                renderItem={({ item }) => {
                  return (
                    <TouchableOpacity
                      onPress={() => {
                        navigation.navigate(MainRoutes.HaibitDetail);
                      }}
                      style={{
                        width: '100%',
                        paddingVertical: 16,
                        paddingHorizontal: 16,
                        flexDirection: 'row',
                        //   justifyContent: 'space-between',
                        alignItems: 'center',
                        borderRadius: 8,
                        backgroundColor: 'white',
                        marginTop: 6,
                      }}>
                      <View
                        style={{
                          width: '80%',
                          flexDirection: 'row',
                          alignItems: 'center',
                        }}>
                        <View
                          style={{
                            width: 40,
                            height: 40,
                            borderRadius: 100,
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: COLOR.bg,
                          }}>
                          <Image
                            source={IMAGE.ic_book}
                            style={[STYLES.icon24, { tintColor: 'orange' }]}
                          />
                        </View>
                        <Text
                          style={{
                            color: COLOR.purple,
                            fontWeight: '700',
                            fontSize: 16,
                            lineHeight: 24,
                            marginLeft: 12,
                          }}>
                          {item?.habitsId}
                        </Text>
                      </View>
                      <TouchableOpacity
                        style={{ width: '20%', alignItems: 'flex-end' }}>
                        <Image source={IMAGE.ic_more} style={[STYLES.icon24]} />
                      </TouchableOpacity>
                    </TouchableOpacity>
                  );
                }}
              />
            </View>
          </ImageBackground>
        </View>
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: COLOR.bg,
  },
  leftHeart: {
    borderTopRightRadius: 16,
    // transform: [{ rotate: "-45deg" }],
  },
  rightHeart: {
    borderTopLeftRadius: 16,
  },
});
