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
} from 'react-native';
import Header from '../../components/header/Header';
import { COLOR } from '../../constants';
import { IMAGE } from '../../constants/Image';
import { MainNavigationProp } from '../../routes/type';
import YoutubePlayer, { YoutubeIframeRef } from 'react-native-youtube-iframe';
import { STYLES } from '../../constants/Style';

interface ViewCourseProps {}

const ViewCourse = (
  { route, navigation }: MainNavigationProp,
  props: ViewCourseProps,
) => {
  const [idVideo, setIdVideo] = useState(route.params?.data.listVideo[0].url);
  const [data, setData] = useState(route.params?.data.listVideo);
  const [playing, setPlaying] = useState(false);
  const [loading, setLoading] = useState(true);
  const onStateChange = useCallback(state => {
    console.log('stateeeeeeee', state);
    if (state === 'ended') {
      setPlaying(false);
      Alert.alert('video has finished playing!');
    }
  }, []);
  useEffect(() => {
    console.log('dataaaaa', route.params?.data);
  }, []);
  return (
    <View style={styles.container}>
      <Header
        iconLeft
        imageLeft={IMAGE.ic_back}
        title={route.params?.data.title}
        // styleLeft={{ width: 44, height: 44 }}
        styleRight={{ width: 44, height: 44 }}
        onPressLeft={() => {
          navigation.goBack();
        }}
      />
      <View style={{ flex: 1 }}>
        <StatusBar barStyle={'dark-content'} hidden={false} />
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
        <View
          style={{
            borderRadius: 12,
            backgroundColor: 'white',
            paddingVertical: 16,
            paddingHorizontal: 16,
            marginHorizontal: 16,
          }}>
          <Text
            style={{
              color: COLOR.purple,
              fontSize: 18,
              lineHeight: 24,
              fontWeight: '500',
              paddingBottom: 16,
            }}>
            {route.params.data.title}
          </Text>
          <FlatList
            data={data}
            keyExtractor={item => {
              item.id;
            }}
            renderItem={({ item, index }) => {
              return (
                <TouchableOpacity
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
                    setIdVideo(item.url);
                    setPlaying(true);
                  }}>
                  <Image source={IMAGE.ic_play} style={STYLES.icon38} />

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
                    {index + 1 + '. ' + item.title}
                  </Text>
                </TouchableOpacity>
              );
            }}
          />
        </View>
      </View>
    </View>
  );
};

export default ViewCourse;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLOR.bg },
});
