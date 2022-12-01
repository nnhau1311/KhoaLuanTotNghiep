import React, { useEffect } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import CircularProgress from 'react-native-circular-progress-indicator';
import BackgroundApp from '../../components/background/BackgroundApp';
import Header from '../../components/header/Header';
import { userData } from '../../configs';
import { COLOR } from '../../constants';
import { IMAGE } from '../../constants/Image';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { Status } from '../../models';
import { getInforAction } from '../../redux/reducer/userReducer';
import { MainRoutes } from '../../routes/routes';
import { MainNavigationProp } from '../../routes/type';
import { useIsFocused } from '@react-navigation/native';

interface ProfileProps {}
interface ItemDataProps {
  data: string;
  title: string;
  image: any;
  style: any;
}
const ItemData = ({ data, title, image, style }: ItemDataProps) => {
  return (
    <View
      style={[
        styles.viewRow,
        {
          width: '50%',
          borderTopWidth: 1,
          borderBottomWidth: 1,
          borderColor: 'rgba(255, 243, 233, 1)',
          paddingVertical: 16,
          backgroundColor: 'white',
          paddingHorizontal: 16,
        },
        style,
      ]}>
      <View>
        <Text
          style={{
            fontWeight: '400',
            fontSize: 12,
            lineHeight: 18,
            color: COLOR.purple,
          }}>
          {title}
        </Text>
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: 24,
            lineHeight: 24,
            color: COLOR.purple,
            marginTop: 12,
          }}>
          {data}
        </Text>
      </View>
      <Image
        source={image}
        style={{
          width: 40,
          height: 40,
          resizeMode: 'contain',
        }}
      />
    </View>
  );
};
const Profile = ({ navigation }: MainNavigationProp, props: ProfileProps) => {
  const dispatch = useAppDispatch();
  const isFocused = useIsFocused();
  const messageInfor = useAppSelector(
    state => state.userReducer.messageInforUser,
  );
  const statusInfor = useAppSelector(
    state => state.userReducer.statusInforUser,
  );
  const dataInfor = useAppSelector(state => state.userReducer.InforUserData);
  useEffect(() => {
    console.log('isFocused', isFocused);
    dispatch(getInforAction());
  }, []);
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      dispatch(getInforAction());
    });

    return unsubscribe;
  }, [navigation]);
  useEffect(() => {
    if (statusInfor === Status.success && dataInfor?.StatusCode === '200') {
      userData.userId = dataInfor.Data.id;
      console.log('daataaInfor', dataInfor.Data);
    } else if (
      statusInfor === Status.success &&
      dataInfor?.StatusCode !== '200'
    ) {
      Alert.alert('Notification', 'Get Information User Error');
    }
    if (statusInfor === Status.error && messageInfor) {
      Alert.alert('Notification', messageInfor);
    }
  }, [statusInfor]);
  return (
    <BackgroundApp>
      <Header
        iconLeft
        iconRight
        imageLeft={IMAGE.ic_back}
        imageRight={IMAGE.ic_edit}
        title="Profile"
        // styleLeft={{ width: 44, height: 44 }}
        // styleRight={{ width: 44, height: 44 }}
        onPressLeft={() => {
          navigation.goBack();
        }}
        onPressRight={() => {
          navigation.navigate(MainRoutes.ViewProfile, {
            dataProfile: dataInfor?.Data,
          });
        }}
        styleLeft={{}}
        styleRight={{}}
      />
      <View style={{ flex: 1, paddingHorizontal: 16 }}>
        <View
          style={{
            borderRadius: 12,
            backgroundColor: COLOR.white,
            paddingVertical: 16,

            marginTop: 48,
          }}>
          <View style={[styles.viewRow, { paddingHorizontal: 16 }]}>
            <View style={[styles.viewRow, { justifyContent: 'flex-start' }]}>
              <Image
                source={IMAGE.img_avt}
                style={{
                  width: 60,
                  height: 60,
                  resizeMode: 'contain',
                }}
              />
              <View style={{ marginLeft: 12 }}>
                <Text
                  style={{
                    fontWeight: '700',
                    fontSize: 16,
                    lineHeight: 22,
                    color: COLOR.purple,
                  }}>
                  {dataInfor?.Data.userFullName}
                </Text>
                <Text
                  style={{
                    fontWeight: '400',
                    fontSize: 14,
                    lineHeight: 18,
                    color: COLOR.purple,
                  }}>
                  {dataInfor?.Data.username}
                </Text>
              </View>
            </View>
            {/* <TouchableOpacity
              style={[
                styles.viewRow,
                {
                  borderRadius: 16,
                  borderWidth: 1,
                  borderColor: COLOR.gray,
                  paddingVertical: 10,
                  paddingHorizontal: 10,
                  justifyContent: 'space-between',
                },
              ]}>
              <Text
                style={{
                  fontWeight: '400',
                  fontSize: 14,
                  color: 'rgba(87, 51, 83, 0.8)',
                  lineHeight: 14,
                }}>
                This week
              </Text>
              <Image
                source={IMAGE.ic_arrow_bottom}
                style={{
                  width: 12,
                  height: 12,
                  resizeMode: 'contain',
                  marginLeft: 8,
                }}
              />
            </TouchableOpacity> */}
          </View>
          <View style={[styles.viewRow, { marginTop: 12 }]}>
            <ItemData
              style={{ borderRightWidth: 1 }}
              title="Total Work Hours"
              data="18"
              image={IMAGE.ic_clock}
            />
            <ItemData
              style={{ borderLeftWidth: 1 }}
              title="Task Completed"
              data="2"
              image={IMAGE.ic_flag}
            />
          </View>
          {/* <View
            style={[
              styles.viewRow,
              { paddingHorizontal: 16, paddingVertical: 16 },
            ]}>
            <CircularProgress
              value={9}
              radius={30}
              activeStrokeWidth={6}
              inActiveStrokeWidth={8}
              duration={1000}
              activeStrokeColor={'#f39c12'}
              progressValueColor={'#f39c12'}
              inActiveStrokeColor={'#FDA758'}
              inActiveStrokeOpacity={0.2}
              maxValue={10}
              onAnimationComplete={() => {
                Alert.alert('callback');
              }}
            />
            <CircularProgress
              value={20}
              radius={30}
              activeStrokeWidth={6}
              inActiveStrokeWidth={8}
              duration={1000}
              activeStrokeColor={'#573353'}
              activeStrokeSecondaryColor={'#C25AFF'}
              progressValueColor={'#573353'}
              inActiveStrokeColor={'rgba(87, 51, 83, 0.5)'}
              inActiveStrokeOpacity={0.2}
              maxValue={20}
            />
            <CircularProgress
              value={10}
              radius={30}
              activeStrokeWidth={6}
              inActiveStrokeWidth={8}
              duration={1000}
              activeStrokeColor={'#F65B4E'}
              progressValueColor={'#F65B4E'}
              inActiveStrokeColor={'rgba(246, 91, 78, 0.5)'}
              inActiveStrokeOpacity={0.2}
              maxValue={20}
            />
          </View> */}
        </View>
        <View
          style={[
            styles.viewRow,
            {
              borderRadius: 12,
              backgroundColor: COLOR.white,
              paddingVertical: 12,
              paddingHorizontal: 12,
              marginTop: 6,
            },
          ]}>
          <View style={styles.viewRow}>
            <Image
              source={IMAGE.ic_chart}
              style={{
                width: 40,
                height: 40,
                resizeMode: 'contain',
              }}
            />
            <Text
              style={{
                fontWeight: '400',
                fontSize: 16,
                lineHeight: 18,
                color: COLOR.purple,
                marginLeft: 12,
              }}>
              Longest Streak
            </Text>
          </View>
          <View style={styles.viewRow}>
            <Text
              style={{
                fontWeight: '700',
                fontSize: 16,
                lineHeight: 18,
                color: COLOR.purple,
                marginLeft: 12,
              }}>
              4 Days
            </Text>
            <Image
              source={IMAGE.ic_arrow_right}
              style={{
                width: 14,
                height: 14,
                resizeMode: 'contain',
              }}
            />
          </View>
        </View>
      </View>
    </BackgroundApp>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLOR.bg },
  viewRow: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
});
