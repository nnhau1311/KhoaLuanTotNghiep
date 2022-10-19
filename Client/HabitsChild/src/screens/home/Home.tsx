import React, { useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  ImageBackground,
  FlatList,
} from 'react-native';
import Header from '../../components/header/Header';
import TabHorizontal from '../../components/tab/TabHorizontal';
import { COLOR } from '../../constants';
import { IMAGE } from '../../constants/Image';
import { STYLES } from '../../constants/Style';
import { MainRoutes } from '../../routes/routes';
import { MainNavigationProp } from '../../routes/type';

interface HomeProps {}
const BOTTOMBAR = [
  {
    id: 1,
    image: IMAGE.ic_home,
    image_default: IMAGE.ic_home_default,
    select: true,
  },
  {
    id: 2,
    image: IMAGE.ic_course,
    image_default: IMAGE.ic_course_default,
    select: false,
  },
  {
    id: 3,
    image: undefined,
    image_default: undefined,
    select: false,
  },
  {
    id: 4,
    image: IMAGE.ic_people,
    image_default: IMAGE.ic_people_default,
    select: false,
  },
  {
    id: 5,
    image: IMAGE.ic_setting,
    image_default: IMAGE.ic_setting_default,
    select: false,
  },
];
const HABITS = [
  {
    id: 1,
    title: 'Read book',
  },
  {
    id: 2,
    title: 'Learn English',
  },
  {
    id: 3,
    title: 'Play Football',
  },
];
const Home = ({ navigation }: MainNavigationProp, props: HomeProps) => {
  const [data, setData] = useState(BOTTOMBAR);
  return (
    <View style={styles.container}>
      <Header
        iconLeft
        iconRight
        imageLeft={IMAGE.ic_menu}
        imageRight={IMAGE.ic_avt}
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
              <TabHorizontal data={[]} />
              <View>
                <FlatList
                  showsVerticalScrollIndicator={false}
                  data={HABITS}
                  keyExtractor={item => {
                    item.id.toString();
                  }}
                  renderItem={({ item }) => {
                    return (
                      <TouchableOpacity
                        onPress={() => {
                          navigation.navigate(MainRoutes.HaibitDetail);
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
                            {item.title}
                          </Text>
                        </View>
                        <TouchableOpacity
                          style={{ width: '20%', alignItems: 'flex-end' }}>
                          <Image
                            source={IMAGE.ic_more}
                            style={[STYLES.icon24]}
                          />
                        </TouchableOpacity>
                      </TouchableOpacity>
                    );
                  }}
                />
              </View>
            </View>
          </ImageBackground>
        </View>
      </View>
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
});
