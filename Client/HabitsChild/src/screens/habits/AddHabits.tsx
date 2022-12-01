import React, { useEffect, useRef, useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Dimensions,
  Alert,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import BackgroundApp from '../../components/background/BackgroundApp';
import Header from '../../components/header/Header';
import { IMAGE } from '../../constants/Image';
import { MainNavigationProp } from '../../routes/type';
import {
  TextField,
  DateTimePicker,
  BottomSheet,
} from '@ddc-fis-hcm/react-native-sdk';
import { SIZE } from '@ddc-fis-hcm/react-native-sdk/react-native-sdk-source/styles/size';
import { COLOR } from '../../constants';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { HabitData, HabitDataManager, Status } from '../../models';
import {
  addHabitsAction,
  getListHabitsManagerAction,
  resetStateAddHabits,
} from '../../redux/reducer/habitsReducer';
import moment from 'moment';
import Loading from '../../components/loading/Loading';

interface AddHabitsProps {}

const AddHabits = (
  { navigation }: MainNavigationProp,
  props: AddHabitsProps,
) => {
  const [dataHabits, setDataHabits] = useState<Array<HabitDataManager>>();
  const [nameHabit, setNameHabit] = useState('');
  const [idHabits, setIdHabits] = useState('');
  const [numberFinish, setNumberFinsh] = useState(0);
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [fromTime, setFromTime] = useState('');
  const bottomSheet = useRef<any>();
  const dispatch = useAppDispatch();
  const status = useAppSelector(
    state => state.habitsReducer.statusListHabitsManager,
  );
  const message = useAppSelector(
    state => state.habitsReducer.messageListHabitsManager,
  );
  const result = useAppSelector(
    state => state.habitsReducer.listHabitsDataManager,
  );
  const statusAddHabits = useAppSelector(
    state => state.habitsReducer.statusAddHabits,
  );
  const messageAddHabits = useAppSelector(
    state => state.habitsReducer.messageAddHabits,
  );
  const resultAddHabits = useAppSelector(
    state => state.habitsReducer.addHabitsData,
  );
  useEffect(() => {
    dispatch(getListHabitsManagerAction({ pageNumber: 0, pageSize: 10 }));
  }, []);
  useEffect(() => {
    if (status === Status.success && result?.StatusCode === '200') {
      console.log('dataaaaaaaManager', result.Data.content);
      if (
        result.Data.content.length > 0 &&
        result.Data.content.length % 10 == 0
      ) {
        setIsLoadmore(true);
      } else {
        setIsLoadmore(false);
      }
      if (page === 0) {
        let tmp = result.Data.content.map(item => {
          return Object.assign({}, item, { isSelected: false });
        });
        setDataHabits(tmp);
      } else {
        let tmp = result.Data.content.map(item => {
          return Object.assign({}, item, { isSelected: false });
        });
        setDataHabits(dataHabits?.concat(tmp));
      }
      setIsEnd(false);
    } else if (status === Status.success && result?.StatusCode !== '200') {
      setIsEnd(false);
      Alert.alert('Notification', 'Get list habits error');
    }
    if (status === Status.error && message) {
      setIsEnd(false);
      Alert.alert('Notification', message);
    }
  }, [status]);
  useEffect(() => {
    if (
      statusAddHabits === Status.success &&
      resultAddHabits?.StatusCode === '200'
    ) {
      setLoading(false);
      dispatch(resetStateAddHabits());
      Alert.alert('Notification', 'Add new habit success', [
        {
          text: 'Ok',
          onPress: () => {
            navigation.goBack();
          },
        },
      ]);
    } else if (
      statusAddHabits === Status.success &&
      resultAddHabits?.StatusCode !== '200'
    ) {
      setLoading(false);
      dispatch(resetStateAddHabits());
      Alert.alert('Notification', 'Add new habit error');
    }
    if (statusAddHabits === Status.error && messageAddHabits) {
      setLoading(false);
      dispatch(resetStateAddHabits());
      Alert.alert('Notification', message);
    }
  }, [statusAddHabits]);
  useEffect(() => {
    if (fromDate) {
      var d = new Date(fromDate);
      d.setDate(d.getDate() + numberFinish);
      console.log('text', moment(d).format());
      // console.log('text2', new Date(sum));
      var _toDay = moment(d).format('DD-MM-YYYY');
      setToDate(_toDay.toString());
    }
  }, [fromDate]);
  const [isEnd, setIsEnd] = useState(false);
  const [isLoadMore, setIsLoadmore] = useState(false);
  const [page, setPage] = useState(0);
  const onEndReached = () => {
    if (isLoadMore) {
      setPage(page + 1);
      setIsEnd(true);
    }
  };
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    dispatch(getListHabitsManagerAction({ pageNumber: page, pageSize: 10 }));
  }, [page]);
  return (
    <BackgroundApp>
      {loading && <Loading />}
      <Header
        // imageRight={{}}
        onPressRight={() => {}}
        styleLeft={{}}
        iconLeft
        iconRight
        imageLeft={IMAGE.ic_back}
        // imageRight={IMAGE.ic_glass}
        title="New Habit"
        // styleLeft={{ width: 44, height: 44 }}
        styleRight={{ width: 44, height: 44 }}
        onPressLeft={() => {
          navigation.goBack();
        }}
      />
      <View style={{ flex: 1, paddingHorizontal: 16 }}>
        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            // backgroundColor: 'red',
          }}>
          {/* <TextField
            value={nameHabit}
            label={'Enter habit name'}
            containerStyle={[styles.margin, { width: '80%' }]}
            onChangeText={(text: string) => {
              setNameHabit(text);
            }}
          /> */}
          <View
            style={{
              width: '80%',
              borderRadius: 8,
              backgroundColor: 'white',
              paddingVertical: nameHabit ? 6 : 16,
              paddingHorizontal: 16,
            }}>
            {nameHabit ? (
              <Text
                style={{ fontWeight: '400', color: '#BFBFBF', lineHeight: 24 }}>
                Habits Name
              </Text>
            ) : null}
            <Text
              style={{
                fontWeight: '400',
                color: nameHabit ? COLOR.black : '#BFBFBF',
                lineHeight: 24,
                fontSize: 16,
              }}>
              {nameHabit ? nameHabit : 'Habit Name'}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              bottomSheet?.current?.open();
            }}
            style={{
              // padding: 6,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'white',
              borderRadius: 10,
              width: SIZE[16] * 3.5,
              height: SIZE[16] * 3.5,
            }}>
            <Image
              source={IMAGE.ic_selectHabit}
              style={{ width: 35, height: 35, resizeMode: 'contain' }}
            />
            <Image
              source={IMAGE.ic_add}
              style={{
                width: 20,
                height: 20,
                resizeMode: 'contain',
                position: 'absolute',
                top: -5,
                right: -5,
              }}
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',

            width: '100%',
          }}>
          <DateTimePicker
            // dateValue={dayjs(new Date())}
            dateValue={''}
            label={'Start time'}
            containerStyle={[styles.margin, { width: '48%' }]}
            onDateChange={(value: any) => {
              console.log('vlueeê', value);
              setFromTime(value?.dateString);
            }}
            mode="time"
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
          }}>
          {/* <DateTimePicker
            // dateValue={dayjs(new Date())}
            dateValue={toDate}
            label={'Last day'}
            containerStyle={[styles.margin, { width: '48%' }]}
            onDateChange={(value: any) => {
              // setFromDate(value?.value);
            }}
          /> */}
          <DateTimePicker
            // dateValue={dayjs(new Date())}

            dateValue={''}
            label={'Start day'}
            containerStyle={[styles.margin, { width: '48%' }]}
            onDateChange={(value: any) => {
              console.log('value', value.value);
              setFromDate(value?.value);
            }}
          />
          <View
            style={{
              width: '48%',
              borderRadius: 8,
              backgroundColor: 'white',
              height: 16 * 3.5,
              paddingHorizontal: 16,
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <View>
              {toDate ? (
                <Text
                  style={{
                    fontWeight: '400',
                    color: '#BFBFBF',
                    lineHeight: 24,
                  }}>
                  Last day
                </Text>
              ) : null}
              <Text
                style={{
                  fontWeight: '400',
                  color: toDate ? COLOR.black : '#BFBFBF',
                  lineHeight: 24,
                  fontSize: 16,
                }}>
                {toDate ? toDate : 'Last day'}
              </Text>
            </View>
            <Image
              source={IMAGE.ic_arrow_down1}
              style={{
                width: 10,
                height: 12,
                resizeMode: 'contain',
                tintColor: 'gray',
                opacity: 0.8,
              }}
            />
          </View>
          {/* <DateTimePicker
            // dateValue={dayjs(new Date())}
            dateValue={''}
            label={'Last time'}
            containerStyle={[styles.margin, { width: '48%' }]}
            onDateChange={(value: any) => {
              // setFromDate(value?.value);
            }}
            mode="time"
          /> */}
        </View>
        <TouchableOpacity
          onPress={() => {
            if (!nameHabit || !fromDate || !fromTime) {
              Alert.alert('Notification', 'Please enter full information');
            } else {
              if (new Date(fromDate) <= new Date()) {
                Alert.alert(
                  'Notification',
                  'Start date must be greater than current date!',
                );
              } else {
                console.log('dataNewwwwwwww', {
                  habitsId: idHabits,
                  dateStart:
                    moment(fromDate).format().toString().split('T')[0] +
                    'T' +
                    fromTime +
                    '+07:00',
                });
                setLoading(true);
                dispatch(
                  addHabitsAction({
                    habitsId: idHabits,
                    dateStart: moment(fromDate).format().toString(),
                  }),
                );
              }
            }
          }}
          style={{
            paddingVertical: 12,
            paddingHorizontal: 16,
            alignItems: 'center',
            backgroundColor: COLOR.orange,
            justifyContent: 'center',
            borderRadius: 8,
            marginTop: 16,
          }}>
          <Text style={{ color: 'white', fontWeight: '400', fontSize: 18 }}>
            Add new habit
          </Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          flex: 1,
          justifyContent: 'flex-end',
          alignItems: 'center',
          paddingHorizontal: 16,
        }}>
        <View
          style={{
            borderRadius: 12,
            backgroundColor: 'white',
            alignItems: 'center',
            width: '100%',
            paddingVertical: 16,
            justifyContent: 'space-between',
            marginBottom: 48,
          }}>
          <Image
            source={IMAGE.img_avt}
            style={{
              width: 70,
              height: 70,
              resizeMode: 'contain',
              position: 'absolute',
              top: -35,
            }}
          />
          <View style={{ alignItems: 'center', marginTop: 16 }}>
            <Text
              style={{
                fontWeight: '700',
                fontSize: 24,
                lineHeight: 32,
                color: COLOR.purple,
                marginTop: 16,
              }}>
              Start this habit
            </Text>
            <Text
              style={{
                fontWeight: '400',
                fontSize: 14,
                lineHeight: 18,
                color: COLOR.purple,
                textAlign: 'center',
              }}>
              {
                ' ullamco laboris nisi ut aliquip ex ea commodo\n consequat dolore.'
              }
            </Text>
          </View>
          <Image
            source={IMAGE.ic_arrow_down}
            style={{
              width: 24,
              height: 48,
              resizeMode: 'contain',
            }}
          />
        </View>
      </View>
      <BottomSheet
        ref={bottomSheet}
        isShowHeaderRight={false}
        styleLabel={styles.label}
        label="Select Habit"
        onClose={() => {}}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{
            height: Dimensions.get('screen').height * 0.4,
          }}>
          <FlatList
            keyExtractor={item => item?.id}
            data={dataHabits ? dataHabits : []}
            onEndReached={onEndReached}
            ListFooterComponent={
              isEnd ? (
                <ActivityIndicator size="small" color={COLOR.orange} />
              ) : null
            }
            renderItem={({ item, index }) => {
              return (
                <View>
                  <TouchableOpacity
                    disabled={false}
                    onPress={() => {
                      console.log('itemmmmm', item.habitsName);
                      setNameHabit(item.habitsName);
                      setIdHabits(item?.id);
                      setNumberFinsh(item.numberDateExecute);
                      bottomSheet?.current?.close();
                    }}
                    style={[
                      styles.item,
                      {
                        marginTop: index !== 0 ? SIZE[6] : 0,
                        justifyContent: 'space-between',
                      },
                    ]}>
                    <View>
                      <Text
                        style={[
                          styles.txtHabit,
                          { fontWeight: '600' },
                        ]}>{`Habit ${index}: `}</Text>
                      <Text
                        style={styles.txtHabit}>{`${item.habitsName}`}</Text>
                    </View>
                    <TouchableOpacity
                      onPress={() => {
                        let tmp = dataHabits.map(_item => {
                          if (item.id === _item.id) {
                            return Object.assign({}, item, {
                              isSelected: !item?.isSelected,
                            });
                          } else {
                            return _item;
                          }
                        });
                        setDataHabits(tmp);
                      }}>
                      <Image
                        style={{ width: 12, height: 12, resizeMode: 'contain' }}
                        source={
                          !item.isSelected
                            ? IMAGE.ic_arrow_right1
                            : IMAGE.ic_play_down
                        }
                      />
                    </TouchableOpacity>
                  </TouchableOpacity>
                  {item?.isSelected &&
                    item.habitsContentList.map((_item: any) => {
                      return (
                        <View
                          style={{
                            paddingHorizontal: 16,
                            paddingVertical: 16,
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginLeft: 16,
                          }}>
                          <Image
                            source={IMAGE.ic_arrow_right1}
                            style={{
                              width: 12,
                              height: 12,
                              resizeMode: 'contain',
                            }}
                          />
                          <Text style={[styles.txtHabit, { marginLeft: 6 }]}>
                            {_item.body}
                          </Text>
                        </View>
                      );
                    })}
                </View>
              );
            }}
          />
          {/* {dataHabits?.map((item, index) => {
            return (
              <View>
                <TouchableOpacity
                  disabled={false}
                  onPress={() => {
                    console.log('itemmmmm', item.habitsName);
                    setNameHabit(item.habitsName);
                    setIdHabits(item?.id);
                    setNumberFinsh(item.numberDateExecute);
                    bottomSheet?.current?.close();
                  }}
                  style={[
                    styles.item,
                    {
                      marginTop: index !== 0 ? SIZE[6] : 0,
                      justifyContent: 'space-between',
                    },
                  ]}>
                  <View>
                    <Text
                      style={[
                        styles.txtHabit,
                        { fontWeight: '600' },
                      ]}>{`Habit ${index}: `}</Text>
                    <Text style={styles.txtHabit}>{`${item.habitsName}`}</Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => {
                      let tmp = dataHabits.map(_item => {
                        if (item.id === _item.id) {
                          return Object.assign({}, item, {
                            isSelected: !item?.isSelected,
                          });
                        } else {
                          return _item;
                        }
                      });
                      setDataHabits(tmp);
                    }}>
                    <Image
                      style={{ width: 12, height: 12, resizeMode: 'contain' }}
                      source={
                        !item.isSelected
                          ? IMAGE.ic_arrow_right1
                          : IMAGE.ic_play_down
                      }
                    />
                  </TouchableOpacity>
                </TouchableOpacity>
                {item?.isSelected &&
                  item.habitsContentList.map((_item: any) => {
                    return (
                      <View
                        style={{
                          paddingHorizontal: 16,
                          paddingVertical: 16,
                          flexDirection: 'row',
                          alignItems: 'center',
                          marginLeft: 16,
                        }}>
                        <Image
                          source={IMAGE.ic_arrow_right1}
                          style={{
                            width: 12,
                            height: 12,
                            resizeMode: 'contain',
                          }}
                        />
                        <Text style={[styles.txtHabit, { marginLeft: 6 }]}>
                          {_item.body}
                        </Text>
                      </View>
                    );
                  })}
              </View>
            );
          })} */}
        </ScrollView>
      </BottomSheet>
    </BackgroundApp>
  );
};

export default AddHabits;

const styles = StyleSheet.create({
  container: {},
  margin: {
    marginTop: 16,
  },
  label: {
    fontSize: SIZE[16],
    fontWeight: '700',
    color: COLOR.purple,
    lineHeight: SIZE[22],
  },
  item: {
    paddingVertical: SIZE[16],
    paddingHorizontal: SIZE[16],
    borderWidth: 1,
    borderColor: COLOR.gray2,
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: COLOR.bg,
  },
  txtHabit: {
    color: COLOR.black1,
    fontWeight: '400',
    lineHeight: SIZE[22],
    fontSize: SIZE[16],
  },
});
