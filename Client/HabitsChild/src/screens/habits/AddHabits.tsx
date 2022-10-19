import React, { useRef } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Dimensions,
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

interface AddHabitsProps {}
const dataHabits = [
  {
    id: '1',
    value: 'Read Book',
  },
  {
    id: '2',
    value: 'Learn English',
  },
  {
    id: '3',
    value: 'Play Sport',
  },
  {
    id: '4',
    value: 'Play Game',
  },
];
const AddHabits = (
  { navigation }: MainNavigationProp,
  props: AddHabitsProps,
) => {
  const bottomSheet = useRef<any>();
  return (
    <BackgroundApp>
      <Header
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
          <TextField
            label={'Enter habit name'}
            containerStyle={[styles.margin, { width: '80%' }]}
          />
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
            label={'Start day'}
            containerStyle={[styles.margin, { width: '48%' }]}
            onDateChange={(value: any) => {
              // setFromDate(value?.value);
            }}
          />

          <DateTimePicker
            // dateValue={dayjs(new Date())}
            dateValue={''}
            label={'Start time'}
            containerStyle={[styles.margin, { width: '48%' }]}
            onDateChange={(value: any) => {
              // setFromDate(value?.value);
            }}
            mode="time"
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            // alignItems: 'center',
          }}>
          <DateTimePicker
            // dateValue={dayjs(new Date())}
            dateValue={''}
            label={'Last day'}
            containerStyle={[styles.margin, { width: '48%' }]}
            onDateChange={(value: any) => {
              // setFromDate(value?.value);
            }}
          />
          <DateTimePicker
            // dateValue={dayjs(new Date())}
            dateValue={''}
            label={'Last time'}
            containerStyle={[styles.margin, { width: '48%' }]}
            onDateChange={(value: any) => {
              // setFromDate(value?.value);
            }}
            mode="time"
          />
        </View>
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
          {dataHabits.map(item => {
            return (
              <TouchableOpacity
                disabled={false}
                onPress={() => {
                  bottomSheet?.current?.close();
                }}
                style={[
                  styles.item,
                  {
                    marginTop: item.id !== '1' ? SIZE[6] : 0,
                  },
                ]}>
                <Text
                  style={[
                    styles.txtHabit,
                    { fontWeight: '600' },
                  ]}>{`Habit ${item.id}: `}</Text>
                <Text style={styles.txtHabit}>{`${item.value}`}</Text>
              </TouchableOpacity>
            );
          })}
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
  },
  txtHabit: {
    color: COLOR.black1,
    fontWeight: '400',
    lineHeight: SIZE[22],
    fontSize: SIZE[16],
  },
});
