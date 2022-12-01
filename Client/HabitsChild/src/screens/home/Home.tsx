import { BottomSheet, SIZE } from '@ddc-fis-hcm/react-native-sdk';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';
import React, { createRef, useEffect, useRef, useState } from 'react';
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
  ActivityIndicator,
} from 'react-native';
import Header from '../../components/header/Header';
import Loading from '../../components/loading/Loading';
import TabHorizontal from '../../components/tab/TabHorizontal';
import { COLOR } from '../../constants';
import { IMAGE } from '../../constants/Image';
import { STYLES } from '../../constants/Style';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { HabitData, ItemHabit, Status } from '../../models';
import {
  deleteHabitAction,
  getListHabitsAction,
  resetStateDeleteHabit,
} from '../../redux/reducer/habitsReducer';
import { MainRoutes } from '../../routes/routes';
import { MainNavigationProp } from '../../routes/type';

interface HomeProps {}

const Home = ({ navigation }: MainNavigationProp, props: HomeProps) => {
  const isFocused = useIsFocused();
  const [image, setImage] = useState(IMAGE.ic_avt);
  const [itemHabit, setItemHabit] = useState<HabitData>();
  useEffect(() => {
    if (isFocused) {
      getAvt();
    }
  }, [isFocused]);

  const getAvt = async () => {
    try {
      const jsonData = await AsyncStorage.getItem('image');
      const data = JSON.parse(jsonData);
      setImage(data.img);
    } catch (e) {
      console.log('getDataError: ', e);
    }
  };
  const [dataHabits, setDataHabits] = useState([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [isEnd, setIsEnd] = useState(false);
  const [isLoadMore, setIsLoadmore] = useState(false);
  const dispatch = useAppDispatch();
  const status = useAppSelector(state => state.habitsReducer.statusListHabits);
  const message = useAppSelector(
    state => state.habitsReducer.messageListHabits,
  );
  const result = useAppSelector(state => state.habitsReducer.listHabitsData);
  const statusDeleteHabit = useAppSelector(
    state => state.habitsReducer.statusDeleteHabits,
  );
  const messageDeleteHabit = useAppSelector(
    state => state.habitsReducer.messageDeleteHabits,
  );
  const resultDeleteHabit = useAppSelector(
    state => state.habitsReducer.deleteHabitData,
  );
  useEffect(() => {
    dispatch(getListHabitsAction({ pageNumber: page }));
  }, []);
  useEffect(() => {
    if (status === Status.success && result?.StatusCode === '200') {
      console.log('aaaaaaaaaaaâ', result.Data.content.length);
      if (
        result.Data.content.length > 0 &&
        result.Data.content.length % 10 == 0
      ) {
        setIsLoadmore(true);
      } else {
        setIsLoadmore(false);
      }
      if (page === 0) {
        setDataHabits(result.Data.content);
      } else {
        setDataHabits(dataHabits?.concat(result.Data.content));
      }
      setIsEnd(false);
    } else if (status === Status.success && result?.StatusCode !== '200') {
      Alert.alert('Notification', 'Get list habits error');
      setIsEnd(false);
    }
    if (status === Status.error && message) {
      setIsEnd(false);
      Alert.alert('Notification', message);
    }
  }, [status]);
  const bottomSheet = useRef<any>();
  useEffect(() => {
    if (
      statusDeleteHabit === Status.success &&
      resultDeleteHabit?.StatusCode === '200'
    ) {
      setLoading(false);
      dispatch(resetStateDeleteHabit());
      dispatch(getListHabitsAction({ pageNumber: page }));
      Alert.alert('Notification', 'Delete Habit success');
    } else if (
      statusDeleteHabit === Status.success &&
      resultDeleteHabit?.StatusCode !== '200'
    ) {
      setLoading(false);
      dispatch(resetStateDeleteHabit());
      Alert.alert('Notification', 'Delete Habit error');
    }
    if (statusDeleteHabit === Status.error && messageDeleteHabit) {
      setLoading(false);
      dispatch(resetStateDeleteHabit());
      Alert.alert('Notification', message);
    }
  }, [statusDeleteHabit]);
  const onEndReached = () => {
    if (isLoadMore) {
      setPage(page + 1);
      setIsEnd(true);
    }
  };
  useEffect(() => {
    dispatch(getListHabitsAction({ pageNumber: page }));
  }, [page]);
  const refTab = useRef<any>();
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      console.log('home');
      refTab.current?.resetData();
      dispatch(getListHabitsAction({ pageNumber: 0 }));
    });

    return unsubscribe;
  }, [navigation]);
  return (
    <View style={styles.container}>
      {loading && <Loading />}
      <Header
        onPressLeft={() => {
          bottomSheet.current.open();
        }}
        onPressRight={() => {
          navigation.navigate(MainRoutes.Information);
        }}
        iconLeft
        iconRight
        imageLeft={IMAGE.ic_menu}
        imageRight={image}
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
                ref={refTab}
                dataDocument={[]}
                data={[]}
                onChangeTab={(item: any) => {
                  if (item.status === '') {
                    setDataHabits(result?.Data.content);
                  } else {
                    let tmp = result?.Data.content.filter(_item => {
                      return _item.status === item.status;
                    });
                    setDataHabits(tmp);
                  }
                }}
              />
            </View>
            <View style={{ flex: 1, paddingHorizontal: 16 }}>
              <FlatList
                showsVerticalScrollIndicator={false}
                data={dataHabits}
                keyExtractor={item => {
                  item?.id.toString();
                }}
                onEndReached={onEndReached}
                ListFooterComponent={
                  isEnd ? (
                    <ActivityIndicator size="small" color={COLOR.orange} />
                  ) : null
                }
                ListEmptyComponent={
                  dataHabits.length === 0 ? (
                    <View
                      style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <Image
                        source={IMAGE.img_nodata}
                        style={{ height: 200, width: 200 }}
                      />
                      <Text style={{ color: '#00000090' }}>
                        Không có dữ liệu!
                      </Text>
                    </View>
                  ) : null
                }
                renderItem={({ item, index }) => {
                  console.log('INDEXHOME', index);
                  return (
                    <TouchableOpacity
                      key={index + ''}
                      onPress={() => {
                        console.log('idddddddddddd', item.id);
                        navigation.navigate(MainRoutes.HaibitDetail, {
                          userHabitsId: item?.id,
                        });
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
                          {item?.habitsName}
                        </Text>
                      </View>
                      <TouchableOpacity
                        onPress={() => {
                          setItemHabit(item);
                          bottomSheet.current?.open();
                        }}
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
      <BottomSheet
        ref={bottomSheet}
        isShowHeaderRight={false}
        styleLabel={styles.label}
        label={'Thao tác'}
        onClose={() => {}}>
        <View>
          {/* <TouchableOpacity style={styles.btn} onPress={() => {}}>
            <Image source={IMAGE.ic_edit_home} style={styles.img} />
            <Text style={styles.txt}>Edit</Text>
          </TouchableOpacity> */}
          <TouchableOpacity
            style={styles.btn}
            onPress={() => {
              console.log('idddddddd', itemHabit?.id);
              setLoading(true);
              bottomSheet.current?.close();
              dispatch(deleteHabitAction({ userHabitsId: itemHabit?.id }));
            }}>
            <Image source={IMAGE.ic_delete_home} style={styles.img} />
            <Text style={styles.txt}>Setting</Text>
          </TouchableOpacity>
        </View>
      </BottomSheet>
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
  btn: {
    flexDirection: 'row',
    paddingVertical: 16,
    paddingHorizontal: 16,
    alignItems: 'center',
    borderWidth: 1,

    borderColor: COLOR.lightblue,
  },
  img: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
  txt: {
    fontWeight: '400',
    fontSize: 18,
    color: COLOR.black,
    lineHeight: 24,
    marginLeft: 12,
  },
  label: {
    fontSize: SIZE[16],
    fontWeight: '700',
    color: COLOR.purple,
    lineHeight: SIZE[22],
  },
});
