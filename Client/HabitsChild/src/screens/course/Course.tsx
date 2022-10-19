import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  ImageBackground,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import Header from '../../components/header/Header';
import { COLOR } from '../../constants';
import { IMAGE } from '../../constants/Image';
import { MainRoutes } from '../../routes/routes';
import { MainNavigationProp } from '../../routes/type';

interface CourseProps {}
const DATACOURSE = [
  {
    id: 1,
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
  return (
    <View style={styles.container}>
      <Header
        iconLeft
        iconRight
        imageLeft={IMAGE.ic_back}
        imageRight={IMAGE.ic_glass}
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
                        marginBottom: index === DATACOURSE.length - 1 ? 16 : 0,
                      }}>
                      <View
                        style={{
                          width: '100%',
                          height: Dimensions.get('screen').height * 0.2,
                        }}>
                        <ImageBackground
                          source={IMAGE.img_child3}
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
    </View>
  );
};

export default Course;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLOR.bg },
});
