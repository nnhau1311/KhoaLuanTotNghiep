import React, { useState } from 'react';

import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import { COLOR } from '../../constants';
import { LocaleConfig, Calendar } from 'react-native-calendars';
import Header from '../../components/header/Header';
import { IMAGE } from '../../constants/Image';
import { MainNavigationProp } from '../../routes/type';
import { STYLES } from '../../constants/Style';
import Icon from 'react-native-vector-icons/FontAwesome5';
import PopupDetail from './PopupDetail';
interface HaibitDetailProps {}
LocaleConfig.locales['fr'] = {
  monthNames: [
    'Tháng 1',
    'Tháng 2',
    'Tháng 3',
    'Tháng 4',
    'Tháng 5',
    'Tháng 6',
    'Tháng 7',
    'Tháng 8',
    'Tháng 9',
    'Tháng 10',
    'Tháng 11',
    'Tháng 12',
  ],
  monthNamesShort: [
    'Janv.',
    'Févr.',
    'Mars',
    'Avril',
    'Mai',
    'Juin',
    'Juil.',
    'Août',
    'Sept.',
    'Oct.',
    'Nov.',
    'Déc.',
  ],
  dayNames: [
    'Dimanche',
    'Lundi',
    'Mardi',
    'Mercredi',
    'Jeudi',
    'Vendredi',
    'Samedi',
  ],
  dayNamesShort: ['Mon', 'Tue', 'Web', 'Thu', 'Fri', 'Sat', 'Sun'],
  today: "Aujourd'hui",
};
LocaleConfig.defaultLocale = 'fr';
interface ItemDataProps {
  data: string;
  title: string;
  source: any;
  style: any;
}
const ItemData = ({ data, style, title, source }: ItemDataProps) => {
  return (
    <View
      style={[
        {
          paddingVertical: 16,
          backgroundColor: 'white',
          flexDirection: 'row',
          width: '50%',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingHorizontal: 16,
        },
        style,
      ]}>
      <View>
        <Text
          style={{
            fontWeight: '700',
            fontSize: 18,
            lineHeight: 24,
            color: COLOR.purple,
          }}>
          {data}
        </Text>
        <Text
          style={{
            fontWeight: '500',
            fontSize: 12,
            lineHeight: 16,
            color: COLOR.purple,
            opacity: 0.5,
          }}>
          {title}
        </Text>
      </View>

      <Image
        source={source}
        style={{ width: 38, height: 38, resizeMode: 'contain' }}
      />
    </View>
  );
};
const HaibitDetail = (
  { navigation }: MainNavigationProp,
  props: HaibitDetailProps,
) => {
  const [isPopup, setPopup] = useState(false);
  return (
    <View style={styles.container}>
      <Header
        iconLeft
        iconRight
        imageLeft={IMAGE.ic_back}
        imageRight={IMAGE.ic_edit}
        title="Read book"
        // styleLeft={{ width: 44, height: 44 }}
        // styleRight={{ width: 44, height: 44 }}
        onPressLeft={() => {
          navigation.goBack();
        }}
        onPressRight={() => {}}
        styleLeft={{}}
        styleRight={{}}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            borderRadius: 12,
            backgroundColor: 'white',
            marginVertical: 12,
            marginHorizontal: 16,
            flexDirection: 'row',
            alignItems: 'center',
            paddingVertical: 16,
            paddingHorizontal: 16,
          }}>
          <View
            style={{
              width: 75,
              height: 75,
              borderRadius: 12,
              backgroundColor: 'rgba(253, 167, 88, 0.1)',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              source={IMAGE.ic_leu}
              style={{ width: 60, height: 60, resizeMode: 'contain' }}
            />
          </View>
          <View style={{ marginLeft: 16 }}>
            <Text
              style={{
                fontWeight: '700',
                fontSize: 16,
                color: COLOR.purple,
                lineHeight: 32,
              }}>
              {'Read book'}
            </Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Image source={IMAGE.ic_noti} style={STYLES.icon16} />
              <Text style={styles.txtNote}>Repeat everyday</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Image source={IMAGE.ic_repeat} style={STYLES.icon16} />
              <Text style={styles.txtNote}>Reminders: 5:00 am</Text>
            </View>
          </View>
        </View>
        <View style={{ marginHorizontal: 16 }}>
          <Calendar
            markingType="custom"
            style={[styles.calendar]}
            onMonthChange={month => {
              // console.log('month changed', month);
            }}
            onDayPress={day => {
              console.log('selected day', day);
            }}
            renderArrow={direction => (
              <View style={styles.btnArrow}>
                <Icon
                  name={'chevron-' + direction}
                  size={16}
                  color={COLOR.purple}
                />
              </View>
            )}
            theme={{
              textSectionTitleColor: 'rgba(87, 51, 83, 0.5)',
              textDayHeaderFontWeight: 'bold',

              textMonthFontWeight: 'bold',
              monthTextColor: COLOR.purple,

              textMonthFontSize: 16,
              textDayFontSize: 14,
              dayTextColor: COLOR.purple,
              calendarBackground: 'white',
              textDayFontWeight: 'bold',
              todayTextColor: 'white',
            }}
            dayComponent={({ date, state }) => {
              // console.log('state', state);
              // console.log('date', date);
              return (
                <TouchableOpacity
                  style={{
                    width: 48,
                    height: 72,
                    borderRadius: 12,
                    backgroundColor: 'rgba(255, 243, 233, 1)',
                    opacity: state === 'disabled' ? 0.5 : 1,
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingVertical: 4,
                  }}>
                  <Text
                    style={{
                      textAlign: 'center',
                      color: state === 'disabled' ? 'gray' : 'black',
                    }}>
                    {date?.day}
                  </Text>
                  <View
                    style={{
                      width: 38,
                      height: 38,
                      borderRadius: 12,
                      backgroundColor: 'orange',
                      opacity: 0.2,
                    }}></View>
                  <View style={styles.triangleCorner} />
                  {/* <View
        style={{
          width: 40,
          height: 40,
          borderRadius: 12,
          backgroundColor: 'orange',
         bottom:4,
          position:'absolute'
        }}></View> */}
                </TouchableOpacity>
              );
            }}
          />
        </View>
        <View
          style={{
            paddingVertical: 24,
            backgroundColor: 'rgba(255, 243, 233, 1)',
          }}>
          <Text
            style={{
              fontWeight: '500',
              color: 'rgba(87, 51, 83, 0.5)',
              fontSize: 16,
              textAlign: 'center',
              lineHeight: 32,
            }}>
            Analytics
          </Text>
          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              paddingHorizontal: 16,
              marginTop: 24,
            }}>
            <ItemData
              title="Longest Streak"
              data="20 DAYS"
              source={IMAGE.ic_longday}
              style={{
                borderRightWidth: 1,
                borderColor: COLOR.bg,
                borderBottomWidth: 1,
                borderTopLeftRadius: 12,
              }}
            />
            <ItemData
              title="Current Streak"
              data="0 DAYS"
              source={IMAGE.ic_light}
              style={{
                borderLeftWidth: 1,
                borderColor: COLOR.bg,
                borderBottomWidth: 1,
                borderTopRightRadius: 12,
              }}
            />
          </View>
          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              paddingHorizontal: 16,
            }}>
            <ItemData
              title="Completion Rate"
              data="98 %"
              source={IMAGE.ic_completion}
              style={{
                borderRightWidth: 1,
                borderColor: COLOR.bg,
                borderTopWidth: 1,
                borderBottomLeftRadius: 12,
              }}
            />
            <ItemData
              title={'Average Easiness\nScore'}
              data="7"
              source={IMAGE.ic_score}
              style={{
                borderLeftWidth: 1,
                borderColor: COLOR.bg,
                borderTopWidth: 1,
                borderBottomRightRadius: 12,
              }}
            />
          </View>
          <TouchableOpacity
            onPress={() => {
              {
                setPopup(true);
              }
            }}
            style={[
              styles.btnMark,
              { backgroundColor: COLOR.orange, marginTop: 24 },
            ]}>
            <Text style={styles.txtMark}>Mark Habit as Complete</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.btnMark,
              { backgroundColor: 'white', marginTop: 16 },
            ]}>
            <Text style={styles.txtMark}>Mark Habit as Missed</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      {isPopup && (
        <PopupDetail
          onClose={() => {
            setPopup(false);
          }}
        />
      )}
    </View>
  );
};

export default HaibitDetail;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLOR.bg },
  calendar: {
    width: '100%',
    borderRadius: 12,
  },
  triangleCorner: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderRightWidth: 38,
    borderTopWidth: 38,
    borderRightColor: 'transparent',
    borderTopColor: 'orange',
    transform: [{ rotate: '270deg' }],
    borderRadius: 12,
    position: 'absolute',
    bottom: 4,
  },
  btnArrow: {
    padding: 4,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#E0E2E7',
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtNote: {
    fontWeight: '500',
    fontSize: 12,
    color: COLOR.purple,
    lineHeight: 14,
    marginLeft: 8,
    opacity: 0.5,
  },
  btnMark: {
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 16,
    paddingVertical: 16,
  },
  txtMark: {
    color: COLOR.purple,
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 16,
  },
});
