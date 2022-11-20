import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { NormalButton } from '../../components/button';
import Header from '../../components/header/Header';
import { COLOR } from '../../constants';
import { IMAGE, IMAGEAVT } from '../../constants/Image';
import { MainNavigationProp } from '../../routes/type';

interface InformationProps {}
const numColumns = 3;
const data = [
  {
    id: 0,
    img: IMAGE.ic_avt,
    isSelected: true,
  },
  {
    id: 1,
    img: IMAGE.ic_avt1,
    isSelected: false,
  },
  {
    id: 2,
    img: IMAGE.ic_avt2,
    isSelected: false,
  },
  {
    id: 3,
    img: IMAGE.ic_avt3,
    isSelected: false,
  },
  {
    id: 4,
    img: IMAGE.ic_avt4,
    isSelected: false,
  },
  {
    id: 5,
    img: IMAGE.ic_avt5,
    isSelected: false,
  },
];
const Information = (
  { navigation }: MainNavigationProp,
  props: InformationProps,
) => {
  const [listTab, setListTab] = useState(data);
  const [image, setImage] = useState(IMAGE.ic_avt);
  const onChangeStatusEvent = (value?: any) => {
    let list = listTab.map(item => {
      if (item?.id == value?.id) {
        return Object.assign({}, item, { isSelected: true });
      } else {
        return Object.assign({}, item, { isSelected: false });
      }
    });
    setListTab(list);
  };
  const storeAvt = async () => {
    try {
      const IMAGE = {
        img: image,
        data: listTab || data,
      };
      const jsonData = JSON.stringify(IMAGE);
      await AsyncStorage.setItem('image', jsonData);
    } catch (e) {
      console.log('storeDataError', e);
    }
  };
  const getData = async () => {
    try {
      const jsonData = await AsyncStorage.getItem('image');

      const data = JSON.parse(jsonData);
      setListTab(data.data);
      setImage(data.img);
    } catch (e) {
      console.log('getDataError: ', e);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <View style={styles.container}>
      <Header
        iconLeft
        iconRight
        imageLeft={IMAGE.ic_back}
        // imageRight={IMAGE.ic_edit}
        title="Change Avatar"
        // styleLeft={{ width: 44, height: 44 }}
        // styleRight={{ width: 44, height: 44 }}
        onPressLeft={() => {
          navigation.goBack();
        }}
        onPressRight={() => {}}
        styleLeft={{}}
        styleRight={{}}
      />

      <View
        style={{
          flex: 1,
          alignItems: 'center',
          marginVertical: 64,
        }}>
        <Image source={image} style={styles.img} />
      </View>
      <View style={{ flex: 2, alignItems: 'center' }}>
        <FlatList
          data={listTab}
          numColumns={numColumns}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                style={styles.btnAvt}
                onPress={() => {
                  onChangeStatusEvent(item);
                  setImage(item.img);
                }}>
                <View
                  style={{
                    alignItems: 'center',
                    borderWidth: 2,
                    borderColor: item.isSelected ? COLOR.orange : 'white',
                    borderRadius: 100,
                  }}>
                  <Image source={item.img} style={styles.img} />
                </View>

                <View
                  style={[
                    styles.viewOut,
                    {
                      borderColor: item.isSelected
                        ? COLOR.orange
                        : 'rgba(232, 232, 232, 1)',
                    },
                  ]}>
                  {item.isSelected && <View style={styles.viewIn}></View>}
                </View>
              </TouchableOpacity>
            );
          }}
        />
      </View>
      <View style={{ paddingHorizontal: 16 }}>
        <NormalButton
          labelStyle={styles.textBtn}
          onPress={() => {
            storeAvt();
            navigation.goBack();
          }}
          label={'Save Avartar'}
          style={styles.btn}
        />
      </View>
    </View>
  );
};

export default Information;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white' },
  btn: {
    paddingVertical: 8,
    backgroundColor: COLOR.orange,
    borderRadius: 12,
    marginBottom: 24,
  },
  textBtn: {
    fontSize: 16,
    fontWeight: '700',
    //fontFamily: FONT.bold,
  },
  img: {
    width: 64,
    height: 64,
    resizeMode: 'contain',
  },
  btnAvt: {
    alignItems: 'center',
    width: Dimensions.get('screen').width * 0.3,
    height: Dimensions.get('screen').width * 0.3,
  },
  viewIn: {
    width: 15,
    height: 15,

    backgroundColor: COLOR.orange,
    borderRadius: 100,
  },
  viewOut: {
    width: 20,
    height: 20,
    borderWidth: 2,

    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
});
