import React, { useCallback, useEffect, useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  StatusBar,
  Alert,
  Image,
  ScrollView,
} from 'react-native';
import Header from '../../components/header/Header';
import { COLOR } from '../../constants';
import { IMAGE } from '../../constants/Image';
import { MainNavigationProp } from '../../routes/type';
import YoutubePlayer, { YoutubeIframeRef } from 'react-native-youtube-iframe';
import { STYLES } from '../../constants/Style';
import { DATACOURSE } from './Course';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setIndexCourse } from '../../redux/reducer/courseReducer';

interface ViewCourseProps {}

const ViewCourse = (
  { route, navigation }: MainNavigationProp,
  props: ViewCourseProps,
) => {
  const _index = route.params?.data;
  const dispatch = useAppDispatch();
  const [idVideo, setIdVideo] = useState(DATACOURSE[_index].listVideo[0].url);
  // const [valueIndex, setValueIndex] = useState(0);
  const valueIndex = useAppSelector(state => state.courseReducer.index);
  const [data, setData] = useState(DATACOURSE[_index].listVideo);
  const [playing, setPlaying] = useState(false);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    console.log('valueIndexxxxxxx', valueIndex);
  }, [valueIndex]);
  const onStateChange = useCallback(state => {
    console.log('stateeeeeeee', state, valueIndex);
    if (state === 'ended') {
      setPlaying(false);
      const _data = data.map((item, _i) => {
        if (valueIndex + 1 === _i) {
          console.log('111111111w2222', valueIndex + 1, 'ssssssss', _i);
          return Object.assign({}, item, { isView: true });
        } else {
          return item;
        }
      });
      console.log('dataaaaaaaaaaa', _data);
      setData(_data);
      setDataCourse();
      // Alert.alert('Video has finished playing!');
    }
  }, []);
  useEffect(() => {
    getDataCourse();
  }, []);
  const setDataCourse = async () => {
    try {
      const _data = data.map((item, _i) => {
        if (valueIndex + 1 === _i) {
          console.log('111111111', valueIndex + 1, 'ssssssss', _i);
          return Object.assign({}, item, { isView: true });
        } else {
          return item;
        }
      });
      const jsonValue = JSON.stringify(_data);
      console.log('_dtaaaaaaaaa', _data);
      await AsyncStorage.setItem('course' + _index, jsonValue);
    } catch (e) {
      // saving error
    }
  };

  const getDataCourse = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('course' + _index);
      console.log('jsonnnnnnn Value', jsonValue);
      if (jsonValue) {
        setData(JSON.parse(jsonValue));
      }
    } catch (e) {
      // error reading value
      console.log(' // error reading value');
    }
  };
  return (
    <View style={styles.container}>
      <Header
        iconLeft
        imageLeft={IMAGE.ic_back}
        title={DATACOURSE[_index].title}
        // styleLeft={{ width: 44, height: 44 }}
        styleRight={{ width: 44, height: 44 }}
        onPressLeft={() => {
          navigation.goBack();
        }}
      />
      <View style={{ flex: 1 }}>
        {loading && (
          <View style={[styles.container]}>
            <ActivityIndicator size="large" color="orange" />
          </View>
        )}
        <YoutubePlayer
          // width={100}

          height={250}
          play={playing}
          videoId={idVideo}
          onChangeState={onStateChange}
          onReady={() => {
            setLoading(false);
            console.log('readyyyyyyyyyy');
          }}
        />
        <ScrollView showsVerticalScrollIndicator={false}>
          <View
            style={{
              borderRadius: 12,
              backgroundColor: 'white',
              paddingVertical: 16,
              paddingHorizontal: 16,
              marginHorizontal: 16,
              marginBottom: 48,
            }}>
            {/* <Text
            style={{
              color: COLOR.purple,
              fontSize: 18,
              lineHeight: 24,
              fontWeight: '500',
              paddingBottom: 16,
            }}>
            {route.params.data.title}
          </Text> */}
            {/* <FlatList
            data={data}
            keyExtractor={item => {
              item.id;
            }}
            renderItem={({ item, index }) => { */}
            {data.map((item: any, index: number) => {
              return (
                <TouchableOpacity
                  disabled={!item?.isView}
                  key={index + ''}
                  style={{
                    paddingVertical: 12,
                    width: '100%',
                    borderTopWidth: 1,
                    borderColor: 'rgba(255, 243, 233, 1)',
                    // marginTop: 16,
                    // backgroundColor: 'red',
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}
                  onPress={() => {
                    console.log('indexxxxxxx', index);

                    setIdVideo(item.url);
                    setPlaying(true);
                    dispatch(setIndexCourse({ index: index }));
                  }}>
                  <Image
                    source={item?.isView ? IMAGE.ic_play : IMAGE.ic_locked}
                    style={STYLES.icon38}
                  />

                  <Text
                    numberOfLines={1}
                    style={{
                      width: '80%',
                      fontWeight: '400',
                      fontSize: 16,
                      lineHeight: 24,
                      color: COLOR.purple,
                      marginLeft: 12,
                    }}>
                    {index + 1 + '. ' + item?.title}
                  </Text>
                </TouchableOpacity>
              );
            })}

            {/* /> */}
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default ViewCourse;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLOR.bg },
});
