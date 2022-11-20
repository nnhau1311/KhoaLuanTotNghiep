import React, { useRef, useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { COLOR, SIZE } from '../../constants';

let tabDefault = [
  {
    id: 1,
    label: 'Tất cả',
    value: 'all',
    isSelected: true,
    status: '',
  },
  {
    id: 2,
    label: 'Đang thực hiện',
    value: 'inprocess',
    isSelected: false,
    status: 0,
  },
  {
    id: 3,
    label: 'Đã hoàn thành',
    value: 'success',
    isSelected: false,
    status: 1,
  },

  {
    id: 4,
    label: 'Đã bỏ lỡ',
    value: 'reject',
    isSelected: false,
    status: 2,
  },
  // {
  //   id: 5,
  //   label: 'Có chứng từ khác',
  //   value: 'part_recognized',
  //   isSelected: false,
  //   status: 4
  // },
];
interface TabHorizontalProps {
  id: Number;
  label: string;
  value: string;
  isSelected: boolean;
  total: string;
}

interface TabProps {
  data: Array<TabHorizontalProps>;
  onChangeTab?: Function;
  dataDocument: any;
}
const TabHorizontal = (props: TabProps) => {
  const { data, onChangeTab, dataDocument } = props;
  const scrollRef = useRef<any>();
  const [listTab, setListTab] = useState(data.length > 0 ? data : tabDefault);
  const [_index, setIndex] = useState(0);
  const [tabSelected, setTabSelected] = useState();

  const onChangeStatusEvent = (value?: any) => {
    let list = listTab.map(item => {
      if (item?.id == value?.id) {
        onChangeTab && onChangeTab(item);
        return Object.assign({}, item, { isSelected: true });
      } else {
        return Object.assign({}, item, { isSelected: false });
      }
    });
    setListTab(list);
  };
  const getTotal = (value: string) => {
    switch (value) {
      case 'all':
        return dataDocument?.number_file_all_status | 0;
      case 'inprocess':
        return dataDocument?.number_file_not_recognized | 0;
      case 'success':
        return dataDocument?.number_file_recognized | 0;
      case 'reject':
        return dataDocument?.number_file_cant_recognized | 0;
      case 'part_recognized':
        return dataDocument?.number_file_part_recognized | 0;
    }
  };

  return (
    <View style={{ marginTop: 28, marginBottom: SIZE.h24 }}>
      <FlatList
        horizontal
        ref={scrollRef}
        showsHorizontalScrollIndicator={false}
        data={listTab}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item, index }) => {
          return (
            <TouchableOpacity
              disabled={index == _index}
              key={index + ''}
              style={{
                backgroundColor: item?.isSelected ? 'orange' : undefined,
                paddingHorizontal: SIZE.h24,
                paddingVertical: SIZE.h10,
                borderRadius: SIZE.h65,
              }}
              onPress={() => {
                setIndex(index);
                if (_index > index && index == 1) {
                  scrollRef.current?.scrollToIndex({ index: 0 });
                } else {
                  scrollRef.current?.scrollToIndex({ index: index });
                }
                onChangeStatusEvent(item);
              }}>
              <Text
                style={[
                  styles.textBold,
                  {
                    fontSize: SIZE.h28,
                    color: item.isSelected ? COLOR.purple : 'gray',
                  },
                ]}>
                {item?.label} ({getTotal(item.value)})
              </Text>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

export default TabHorizontal;

const styles = StyleSheet.create({
  container: {},
  textBold: {
    fontWeight: '700',
    fontSize: SIZE.h40,
    lineHeight: 28,
  },
});
