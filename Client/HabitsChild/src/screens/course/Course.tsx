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
export const DATACOURSE = [
  {
    id: 1,
    img: IMAGE.img_child3,
    title: 'Hoạt hình ca nhạc-Rèn luyện thói quen\ncho bé',
    listVideo: [
      {
        id: '1',
        url: 'nwI0GDVrPX0',
        title: 'Bé đi tắm | Bé đi khám răng',
        isView: true,
      },
      {
        id: '2',
        url: 'ZRSlSSvayfg',
        title: 'Đội Cứu Hộ Anh Hùng | Em Bé Làm Lính Cứu Hoả',
        isView: false,
      },
      {
        id: '3',
        url: 'bwtn9YTp4PY',
        title: 'Con Yêu Ngủ Thôi Nào | Hát ru',
        isView: false,
      },
      {
        id: '4',
        url: 'Y-PSKnxBmcA',
        title: 'Chơi đẹp bé ơi | Học cách ứng xử',
        isView: false,
      },
      {
        id: '5',
        url: 'brrptAtO_YM',
        title: 'Chơi đùa mỗi ngày Cần chú ý an toàn | Vui Chơi An Toàn',
        isView: false,
      },
      {
        id: '6',
        url: 'lo-QMnvuG4A',
        title: 'Bé Đi Sở Thú | Nhận Biết Con Vật',
        isView: false,
      },
      {
        id: '7',
        url: 'ZM5EKNlYKsE',
        title: 'Mình Có Thể Tự Đi Vệ Sinh | Bài Học Thói Quen Tốt Cho Bé',
        isView: false,
      },
      {
        id: '8',
        url: 'rONRf3gzVfc',
        title: 'Bé Học Màu Sắc Với Các Loại Nước Ép | Dạy Trẻ Thông Minh Sớm',
        isView: false,
      },
    ],
  },
  {
    id: 2,
    img: IMAGE.img_child4,
    title:
      'Trò chơi trẻ em, giải trí cho trẻ em, phiêu lưu và đào tạo từ Like Nastya',
    listVideo: [
      {
        id: '5',
        url: 'yx4MjT-UCEA',
        title: 'Thói quen buổi sáng của Nastya',
        isView: true,
      },
      {
        id: '1',
        url: 'EvMc4gFxmJQ',
        title: 'Viết thư gửi ông già noel và mong nhận được quà giáng sinh',
        isView: false,
      },
      {
        id: '2',
        url: 'yZh_vZhu2E8',
        title: 'Nastya và bố đang tham gia cuộc thi trang trí cây thông Noel',
        isView: false,
      },
      {
        id: '3',
        url: 'ELA-lAwJDl8',
        title: 'Bộ sưu tập của giáo dục câu chuyện với Nastya và bố',
        isView: false,
      },
      {
        id: '4',
        url: 'vmqeCtpltmM',
        title: 'Nastya và bố học Cách không đi học muộn',
        isView: false,
      },
    ],
  },
];
export const DATADOCS = [
  {
    id: 0,
    title: 'Câu chuyện Gà Tơ đi học [Truyện mầm non]',
    picture:
      'https://truyendangian.com/wp-content/uploads/2020/12/cau-chuyen-ga-to-di-hoc-300x169.jpg',
    url: 'https://truyendangian.com/ga-to-di-hoc/',
  },
  {
    id: 1,
    title: 'Truyện cây táo thần [Câu chuyện ý nghĩa cho bé]',
    picture:
      'https://truyendangian.com/wp-content/uploads/2020/12/truyen-cay-tao-than-300x169.jpg',
    url: 'https://truyendangian.com/truyen-cay-tao-than/',
  },
  {
    id: 2,
    title: 'Đeo chuông cho mèo [Truyện tranh ngụ ngôn]',
    picture:
      'https://truyendangian.com/wp-content/uploads/2020/11/deo-chuong-cho-meo-300x169.jpg',
    url: 'https://truyendangian.com/deo-chuong-cho-meo/',
  },
  {
    id: 3,
    title: 'Nữ Oa nương nương đội đá vá trời',
    picture:
      'https://truyendangian.com/wp-content/uploads/2020/11/nu-oa-doi-da-va-troi-300x169.jpg',
    url: 'https://truyendangian.com/nu-oa-nuong-nuong-doi-da-va-troi/',
  },
  {
    id: 4,
    title: 'Ba cô tiên [Truyện tranh cổ tích cho bé]',
    picture:
      'https://truyendangian.com/wp-content/uploads/2020/10/truyen-co-tich-ba-co-tien-300x169.jpg',
    url: 'https://truyendangian.com/ba-co-tien/',
  },
  {
    id: 5,
    title: 'Cây tre trăm đốt [Truyện tranh cổ tích]',
    picture:
      'https://truyendangian.com/wp-content/uploads/2020/10/cay-tre-tram-dot-300x169.jpg',
    url: 'https://truyendangian.com/cay-tre-tram-dot/',
  },
];
const Course = ({ navigation }: MainNavigationProp, props: CourseProps) => {
  const [video, setVideo] = React.useState(false);
  const [value, setValue] = React.useState('Video');
  const bottomSheet = React.useRef<any>();
  return (
    <View style={styles.container}>
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
              {'Find what fascinates you as you\nexplore these habit courses.'}
            </Text>
          </ImageBackground>
        </View>
        <View style={{ flex: 1 }}>
          <ImageBackground
            source={IMAGE.img_bg}
            style={{ width: '100%', height: '100%' }}>
            <View style={{ paddingHorizontal: 16, marginTop: 16 }}>
              {!video && (
                <FlatList
                  showsVerticalScrollIndicator={false}
                  data={DATACOURSE}
                  keyExtractor={item => item.id.toString()}
                  renderItem={({ item, index }) => {
                    return (
                      <TouchableOpacity
                        onPress={() => {
                          navigation.navigate(MainRoutes.ViewCourse, {
                            data: index,
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
              )}
              {video && (
                <FlatList
                  showsVerticalScrollIndicator={false}
                  data={DATADOCS}
                  keyExtractor={item => item.id.toString()}
                  renderItem={({ item, index }) => {
                    return (
                      <TouchableOpacity
                        onPress={() => {
                          navigation.navigate(MainRoutes.WebView, {
                            url: item.url,
                          });
                        }}
                        style={{
                          borderRadius: 12,
                          backgroundColor: 'white',
                          marginTop: 16,
                          marginBottom: index === DATADOCS.length - 1 ? 16 : 0,
                        }}>
                        <View
                          style={{
                            width: '100%',
                            height: Dimensions.get('screen').height * 0.2,
                          }}>
                          <ImageBackground
                            source={{ uri: item.picture }}
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
                        {/* <Text
                          style={{
                            fontWeight: '500',
                            fontSize: 12,
                            lineHeight: 14,
                            color: COLOR.purple,
                            marginLeft: 12,
                            paddingBottom: 12,
                          }}>
                          {item.listVideo.length + ' Lessons'}
                        </Text> */}
                      </TouchableOpacity>
                    );
                  }}
                />
              )}
            </View>
          </ImageBackground>
        </View>
      </View>
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
              {
                backgroundColor:
                  value === 'Video' ? 'rgba(253, 167, 88, 0.15)' : 'white',
              },
            ]}
            disabled={value === 'Video' ? true : false}
            onPress={() => {
              setValue('Video');
              setVideo(false);
              bottomSheet.current?.close();
            }}>
            <Image source={IMAGE.ic_video} style={styles.img} />
            <Text style={styles.txt}>{'Video'}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.btn,
              {
                backgroundColor:
                  value === 'Fairy Tales'
                    ? 'rgba(253, 167, 88, 0.15)'
                    : 'white',
              },
            ]}
            disabled={value === 'Fairy Tales' ? true : false}
            onPress={() => {
              setValue('Fairy Tales');
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
