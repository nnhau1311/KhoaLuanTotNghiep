import { BottomSheet, SIZE } from '@ddc-fis-hcm/react-native-sdk';
import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  ImageBackground,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import WebView from 'react-native-webview';
import Header from '../../components/header/Header';
import { COLOR } from '../../constants';
import { IMAGE } from '../../constants/Image';
import { MainRoutes } from '../../routes/routes';
import { MainNavigationProp } from '../../routes/type';

interface CourseProps {}
const DATACOURSE = [
  {
    id: 1,
    img: IMAGE.img_child3,
    title: '30 Day Journal Challenge - Establish\na Habit of Daily Journaling',
    listVideo: [
      {
        id: '1',
        url: '2bo3mmhseYI',
        title: '13 LỜI KHUYÊN HỮU ÍCH GIÚP PHÁT TRIỂN BẢN THÂN MỖI NGÀY ',
      },
      {
        id: '2',
        url: 'e9HVwh3aE-s',
        title: 'Biến Tiêu Cực Thành Tích Cực (chủ nghĩa khắc kỷ)',
      },
      {
        id: '3',
        url: 'yu3Y3wv3nZk',
        title: 'Hãy Thu Hút, Đừng Theo Đuổi',
      },
    ],
  },
  {
    id: 2,
    img: IMAGE.img_child4,
    title: 'Self Help Series: How to Create and Maintain Good Habits',
    listVideo: [
      {
        id: '1',
        url: '2bo3mmhseYI',
        title: '13 LỜI KHUYÊN HỮU ÍCH GIÚP PHÁT TRIỂN BẢN THÂN MỖI NGÀY ',
      },
      {
        id: '2',
        url: 'e9HVwh3aE-s',
        title: 'Biến Tiêu Cực Thành Tích Cực (chủ nghĩa khắc kỷ)',
      },
      {
        id: '3',
        url: 'yu3Y3wv3nZk',
        title: 'Hãy Thu Hút, Đừng Theo Đuổi',
      },
    ],
  },
];
const Course = ({ navigation }: MainNavigationProp, props: CourseProps) => {
  const [video, setVideo] = React.useState(false);
  const [value, setValue] = React.useState('Video');
  const bottomSheet = React.useRef<any>();
  return (
    <View style={styles.container}>
      {!video && (
        <Header
          iconLeft
          iconRight
          imageLeft={IMAGE.ic_back}
          // imageRight={IMAGE.ic_glass}
          title="Courses"
          // styleLeft={{ width: 44, height: 44 }}
          styleRight={{ width: 44, height: 44 }}
          onPressLeft={() => {
            navigation.goBack();
          }}
        />
      )}

      {video ? (
        <View style={{ flex: 1, width: '100%' }}>
          <TouchableOpacity
            onPress={() => {
              setVideo(false);
            }}
            style={{
              width: 40,
              height: 40,
              backgroundColor: COLOR.orange,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 50,
              position: 'absolute',
              zIndex: 999,
              bottom: 24,
              left: 16,
            }}>
            <Image
              source={IMAGE.ic_back}
              style={{ width: 24, height: 24, resizeMode: 'contain' }}
            />
          </TouchableOpacity>
          <WebView
            source={{
              uri: 'https://www.sachhayonline.com/tua-sach/chuyen-ke-cho-be',
            }}
          />
        </View>
      ) : (
        <View style={{ flex: 1, width: '100%' }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingRight: 16,
              paddingBottom: 16,
              justifyContent: 'flex-end',
            }}>
            <Text
              style={{
                fontWeight: '500',
                fontSize: 16,
                lineHeight: 24,
                color: COLOR.purple,
              }}>
              Filter:
            </Text>
            <TouchableOpacity
              onPress={() => {
                bottomSheet.current.open();
              }}
              style={{
                marginLeft: 4,
                flexDirection: 'row',
                paddingVertical: 8,
                paddingHorizontal: 12,
                borderRadius: 12,
                justifyContent: 'flex-end',
                alignItems: 'center',
                backgroundColor: 'white',
              }}>
              <Text
                style={{
                  fontWeight: '400',
                  fontSize: 16,
                  lineHeight: 24,
                  color: COLOR.purple,
                  marginRight: 8,
                }}>
                {value}
              </Text>
              <Image
                source={IMAGE.ic_arrow_bottom}
                style={{
                  width: 12,
                  height: 12,
                  resizeMode: 'contain',
                  tintColor: COLOR.orange,
                }}
              />
            </TouchableOpacity>
          </View>
          <View
            style={{
              height: Dimensions.get('screen').height * 0.2,
              width: Dimensions.get('screen').width,
              paddingHorizontal: 16,
            }}>
            <ImageBackground
              style={{ width: '100%', height: '100%' }}
              imageStyle={{ borderRadius: 12 }}
              source={IMAGE.img_child2}>
              <Text
                style={{
                  fontSize: 24,
                  fontWeight: '700',
                  // textAlign: 'center',
                  marginLeft: 24,
                  marginTop: 24,
                  lineHeight: 32,
                  color: COLOR.purple,
                }}>
                {'Habit\ncourses'.toUpperCase()}
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: '400',
                  // textAlign: 'center',
                  marginLeft: 24,
                  marginTop: 4,
                  lineHeight: 18,
                  color: COLOR.purple,
                }}>
                {
                  'Find what fascinates you as you\nexplore these habit courses.'
                }
              </Text>
            </ImageBackground>
          </View>
          <View style={{ flex: 1 }}>
            <ImageBackground
              source={IMAGE.img_bg}
              style={{ width: '100%', height: '100%' }}>
              <View style={{ paddingHorizontal: 16, marginTop: 16 }}>
                <FlatList
                  showsVerticalScrollIndicator={false}
                  data={DATACOURSE}
                  keyExtractor={item => item.id.toString()}
                  renderItem={({ item, index }) => {
                    return (
                      <TouchableOpacity
                        onPress={() => {
                          navigation.navigate(MainRoutes.ViewCourse, {
                            data: item,
                          });
                        }}
                        style={{
                          borderRadius: 12,
                          backgroundColor: 'white',
                          marginTop: 16,
                          marginBottom:
                            index === DATACOURSE.length - 1 ? 16 : 0,
                        }}>
                        <View
                          style={{
                            width: '100%',
                            height: Dimensions.get('screen').height * 0.2,
                          }}>
                          <ImageBackground
                            source={item.img}
                            style={{ width: '100%', height: '100%' }}
                            imageStyle={{
                              borderTopLeftRadius: 12,
                              borderTopRightRadius: 12,
                            }}
                          />
                        </View>
                        <Text
                          style={{
                            fontWeight: '700',
                            fontSize: 18,
                            lineHeight: 24,
                            color: COLOR.purple,
                            paddingVertical: 16,
                            marginLeft: 12,
                          }}>
                          {item.title}
                        </Text>
                        <Text
                          style={{
                            fontWeight: '500',
                            fontSize: 12,
                            lineHeight: 14,
                            color: COLOR.purple,
                            marginLeft: 12,
                            paddingBottom: 12,
                          }}>
                          {item.listVideo.length + ' Lessons'}
                        </Text>
                      </TouchableOpacity>
                    );
                  }}
                />
              </View>
            </ImageBackground>
          </View>
        </View>
      )}
      <BottomSheet
        ref={bottomSheet}
        isShowHeaderRight={false}
        styleLabel={styles.label}
        label={'Select'}
        onClose={() => {}}>
        <View>
          <TouchableOpacity
            style={[
              styles.btn,
              { backgroundColor: 'rgba(253, 167, 88, 0.15)' },
            ]}
            disabled
            onPress={() => {}}>
            <Image source={IMAGE.ic_video} style={styles.img} />
            <Text style={styles.txt}>{'Video'}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => {
              setVideo(true);
              bottomSheet.current?.close();
            }}>
            <Image source={IMAGE.ic_book} style={styles.img} />
            <Text style={styles.txt}>{'Fairy Tales'}</Text>
          </TouchableOpacity>
        </View>
      </BottomSheet>
    </View>
  );
};

export default Course;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLOR.bg },
  btn: {
    flexDirection: 'row',
    paddingVertical: 16,
    paddingHorizontal: 16,
    alignItems: 'center',
    borderWidth: 1,

    borderColor: COLOR.lightblue,
  },
  label: {
    fontSize: SIZE[16],
    fontWeight: '700',
    color: COLOR.purple,
    lineHeight: SIZE[22],
  },
  txt: {
    fontWeight: '400',
    fontSize: 18,
    color: COLOR.purple,
    lineHeight: 24,
    marginLeft: 12,
  },
  img: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
    tintColor: COLOR.orange,
  },
});
