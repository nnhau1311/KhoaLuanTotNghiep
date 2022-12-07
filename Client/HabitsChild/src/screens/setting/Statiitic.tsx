import { Button } from '@ddc-fis-hcm/react-native-sdk';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Dimensions,
  Alert,
  Image,
} from 'react-native';
import CircularProgress from 'react-native-circular-progress-indicator';
import BackgroundApp from '../../components/background/BackgroundApp';
import Header from '../../components/header/Header';
import { COLOR } from '../../constants';
import { IMAGE } from '../../constants/Image';
import { MainNavigationProp } from '../../routes/type';
import PopupDetail from '../home/PopupDetail';

interface StatiticsProps {}
const DATAQUESTION = [
  {
    id: 0,
    content:
      '"Con gì chân ngắn\nMà lại có màng\nMỏ bẹt màu vàng\nHay kêu cạp cạp?”',
    listAnswer: [
      {
        id: 0,
        title: ' A. Con mèo',
        select: false,
        isAnswer: false,
        isSelect: false,
      },
      {
        id: 1,
        title: 'B. Con lợn',
        select: false,
        isAnswer: false,
        isSelect: false,
      },
      {
        id: 2,
        title: 'C. Con vịt',
        select: false,
        isAnswer: true,
        isSelect: false,
      },
      {
        id: 3,
        title: 'D. Con cá',
        select: false,
        isAnswer: false,
        isSelect: false,
      },
    ],
  },
  {
    id: 1,
    content:
      '"Cây gì không lá, không hoa\nSáng đêm sinh nhật cả nhà vây quanh?”',
    listAnswer: [
      {
        id: 0,
        title: ' A. Cây tre',
        select: false,
        isAnswer: false,
        isSelect: false,
      },
      {
        id: 1,
        title: 'B. Cây nến',
        select: false,
        isAnswer: true,
        isSelect: false,
      },
      {
        id: 2,
        title: 'C. Cây cọ',
        select: false,
        isAnswer: false,
        isSelect: false,
      },
      {
        id: 3,
        title: 'D. Cây xanh',
        select: false,
        isAnswer: false,
        isSelect: false,
      },
    ],
  },
  {
    id: 2,
    content: '"Quả gì không phải để ăn\nMà dùng để đá, để lăn để chuyền?”',
    listAnswer: [
      {
        id: 0,
        title: ' A. Quả xoài',
        select: false,
        isAnswer: false,
        isSelect: false,
      },
      {
        id: 1,
        title: 'B. Quả mận',
        select: false,
        isAnswer: false,
        isSelect: false,
      },
      {
        id: 2,
        title: 'C. Quả bóng',
        select: false,
        isAnswer: true,
        isSelect: false,
      },
      {
        id: 3,
        title: 'D. Quả chanh',
        select: false,
        isAnswer: false,
        isSelect: false,
      },
    ],
  },
  {
    id: 3,
    content:
      '"Có chân mà chẳng biết đi\nCó mặt phẳng lì cho bé ngồi lên. Là cái gì?”',
    listAnswer: [
      {
        id: 0,
        title: ' A. Cái ghế',
        select: false,
        isAnswer: true,
        isSelect: false,
      },
      {
        id: 1,
        title: 'B. Cái xô',
        select: false,
        isAnswer: false,
        isSelect: false,
      },
      {
        id: 2,
        title: 'C. Cái dĩa',
        select: false,
        isAnswer: false,
        isSelect: false,
      },
      {
        id: 3,
        title: 'D. Cái nơ',
        select: false,
        isAnswer: false,
        isSelect: false,
      },
    ],
  },
];
const Statitics = (
  { navigation }: MainNavigationProp,
  props: StatiticsProps,
) => {
  const [indexQuestion, setIndexQuestion] = useState(0);
  const [dataQuestion, setDataQuestion] = useState(DATAQUESTION[indexQuestion]);
  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('key_index');
      if (value !== null) {
        console.log('valueeeeee', value);
        setDataQuestion(DATAQUESTION[JSON.parse(value)]);
        setIndexQuestion(JSON.parse(value));
      } else {
        setDataQuestion(DATAQUESTION[0]);
        setIndexQuestion(JSON.parse(0));
      }
    } catch (e) {
      // error reading value
    }
  };
  const storeData = async (value: number) => {
    try {
      await AsyncStorage.setItem('key_index', JSON.stringify(value));
    } catch (e) {
      // saving error
    }
  };
  const removeValue = async () => {
    try {
      await AsyncStorage.removeItem('key_index');
    } catch (e) {
      // remove error
    }

    console.log('Done.');
  };
  useEffect(() => {
    getData();
  }, []);
  const [isPopup, setIsPopup] = useState(false);
  return (
    <BackgroundApp>
      <Header
        iconLeft
        iconRight
        imageLeft={IMAGE.ic_back}
        // imageRight={IMAGE.ic_glass}
        title="Smart challenge"
        // styleLeft={{ width: 44, height: 44 }}
        styleRight={{ width: 44, height: 44 }}
        onPressLeft={() => {
          navigation.goBack();
        }}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flex: 1 }}>
        <View style={[styles.container, { justifyContent: 'center' }]}>
          <View style={styles.container}>
            <View
              style={{
                padding: 16,
                backgroundColor: 'white',
                borderRadius: 12,
                justifyContent: 'center',
                alignItems: 'center',
                marginHorizontal: 32,
              }}>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: '400',
                  color: COLOR.purple,
                  textAlign: 'left',
                  position: 'absolute',
                  top: 0,
                  left: 16,
                }}>
                {'Question ' + (indexQuestion + 1) + ':'}
              </Text>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: '400',
                  color: COLOR.purple,
                  marginTop: 16,
                }}>
                {dataQuestion.content}
              </Text>
            </View>
          </View>
          <View style={{ flex: 1, paddingHorizontal: 16 }}>
            <FlatList
              data={dataQuestion.listAnswer}
              keyExtractor={item => item.id.toString()}
              renderItem={({ item, index }) => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      let tmp = dataQuestion.listAnswer.map(_item => {
                        if (item.id === _item.id) {
                          return Object.assign({}, _item, { isSelect: true });
                        } else {
                          return Object.assign({}, _item, { isSelect: false });
                        }
                      });
                      setDataQuestion({ ...dataQuestion, listAnswer: tmp });
                    }}
                    style={{
                      paddingVertical: 16,
                      borderRadius: 12,
                      marginTop: 16,
                      paddingHorizontal: 16,
                      backgroundColor: item.isSelect
                        ? 'rgba(253, 167, 88, 1)'
                        : 'white',
                    }}>
                    <Text
                      style={{
                        fontSize: 18,
                        fontWeight: '400',
                        color: COLOR.purple,
                      }}>
                      {item.title}
                    </Text>
                  </TouchableOpacity>
                );
              }}
            />
          </View>
        </View>
      </ScrollView>
      <View style={{ paddingBottom: 16, paddingHorizontal: 16 }}>
        <TouchableOpacity
          disabled={
            dataQuestion.listAnswer.filter(item => {
              return item.isSelect;
            }).length === 0
              ? true
              : false
          }
          onPress={() => {
            let tmp = dataQuestion.listAnswer.filter(item => {
              return item.isSelect;
            });
            if (tmp[0].isAnswer) {
              Alert.alert(
                'Notification',
                'The answer is correct! You are great',
                [
                  {
                    text: 'Ok',
                    onPress: async () => {
                      if (indexQuestion + 1 === DATAQUESTION.length) {
                        setIsPopup(true);
                        removeValue();
                      } else {
                        await storeData(indexQuestion + 1);
                        await setDataQuestion(DATAQUESTION[indexQuestion + 1]);
                        await setIndexQuestion(indexQuestion + 1);
                      }
                    },
                  },
                ],
              );
            } else {
              Alert.alert(
                'Notification',
                'The answer is incorrect! Please try again',
              );
            }
          }}
          style={{
            backgroundColor:
              dataQuestion.listAnswer.filter(item => {
                return item.isSelect;
              }).length === 0
                ? 'white'
                : COLOR.orange,
            paddingVertical: 12,
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 8,
          }}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: '500',
              color: COLOR.purple,
            }}>
            {'Confirm'}
          </Text>
        </TouchableOpacity>
      </View>
      {isPopup && (
        <View
          style={{
            width: Dimensions.get('screen').width,

            height: Dimensions.get('screen').height,
            backgroundColor: 'rgba(4, 9, 32, 0.2)',
            position: 'absolute',
            justifyContent: 'flex-end',
          }}>
          <View style={styles.container1}>
            <Image
              source={IMAGE.ic_leu}
              style={{ width: 312, height: 312, resizeMode: 'contain' }}
            />
            <Text
              style={{
                fontWeight: '700',
                fontSize: 18,
                lineHeight: 24,
                color: COLOR.purple,
              }}>
              {'Congratulations!'.toUpperCase()}
            </Text>
            <Text
              style={{
                fontWeight: '400',
                fontSize: 16,
                lineHeight: 22,
                color: COLOR.purple,
                opacity: 0.5,
                textAlign: 'center',
              }}>
              {'Congratulations on successfully\n completing the questionnaire'}
            </Text>
            <TouchableOpacity
              onPress={() => {
                setIsPopup(false);
                navigation.goBack();
              }}
              style={[
                styles.btnMark,
                { backgroundColor: COLOR.orange, marginTop: 24 },
              ]}>
              <Text style={styles.txtMark}>Ok</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </BackgroundApp>
  );
};

export default Statitics;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center' },
  container1: {
    borderRadius: 24,
    backgroundColor: 'white',
    // height: Dimensions.get('screen').height * 0.7,
    width: Dimensions.get('screen').width - 32,
    paddingVertical: 16,
    marginBottom: 16,
    marginHorizontal: 16,
    alignItems: 'center',
  },
  btnMark: {
    width: Dimensions.get('screen').width - 64,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 16,
    paddingVertical: 22,
  },
  txtMark: {
    color: COLOR.purple,
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 16,
  },
});
