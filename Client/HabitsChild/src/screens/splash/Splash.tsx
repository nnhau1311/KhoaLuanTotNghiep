import React, { useRef, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  StyleSheet,
  View,
  ImageBackground,
  Animated,
  useWindowDimensions,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { MainRoutes } from '../../routes/routes';
import { MainNavigationProp } from '../../routes/type';

const images = [
  {
    text: 'WELCOME TO Monumental habits',
    uri: 'https://i.imgur.com/WrQDLWO.png',
  },
  { text: 'CREATE NEW HABIT EASILY', uri: 'https://i.imgur.com/IxWXQct.png' },
  {
    text: 'KEEP TRACK OF YOUR PROGRESS',
    uri: 'https://i.imgur.com/87VBgEf.png',
  },
  {
    text: 'JOIN A SUPPORTIVE COMMUNITY',
    uri: 'https://i.imgur.com/ffsQAGh.png',
  },
];

const Splash = ({ navigation }: MainNavigationProp) => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const scroll = useRef();
  const { width: windowWidth } = useWindowDimensions();
  const [scrollToIndex, setScrollToIndex] = useState(0);
  const [isStarted, setIsStarted] = useState(false);
  const [dataSourceCords, setDataSourceCords] = useState<any>([]);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.scrollContainer}>
        <ScrollView
          ref={scroll}
          horizontal={true}
          scrollEnabled={false}
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={Animated.event([
            {
              nativeEvent: {
                contentOffset: {
                  x: scrollX,
                },
              },
            },
          ])}
          scrollEventThrottle={1}>
          {images.map((image: any, imageIndex: number) => {
            return (
              <View
                onLayout={event => {
                  const layout = event.nativeEvent.layout;
                  dataSourceCords[imageIndex] = layout.x;
                  setDataSourceCords(dataSourceCords);
                  console.log(`height:${imageIndex}`, layout.height);
                  console.log(`width:${imageIndex}`, layout.width);
                  console.log(`x:${imageIndex}`, layout.x);
                  console.log(`y:${imageIndex}`, layout.y);
                }}
                style={{
                  width: Dimensions.get('screen').width,
                  // height: Dimensions.get('screen').height,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                key={imageIndex}>
                <Text
                  style={{
                    fontWeight: '700',
                    fontSize: 32,
                    color: 'rgba(87, 51, 83, 1)',
                    lineHeight: 32,
                    textAlign: 'center',
                  }}>
                  {image.text.toUpperCase()}
                </Text>
                <View
                  style={{
                    width: windowWidth,
                    height: Dimensions.get('screen').height * 0.5,
                  }}>
                  <ImageBackground
                    source={{ uri: image.uri }}
                    style={styles.card}
                    imageStyle={{ resizeMode: 'contain' }}>
                    {/* <View style={styles.textContainer}>
                    <Text style={styles.infoText}>
                      {'Image - ' + imageIndex}
                    </Text>
                  </View> */}
                  </ImageBackground>
                </View>
              </View>
            );
          })}
        </ScrollView>
        <View
          style={{
            paddingHorizontal: 32,
            alignItems: 'center',
            paddingVertical: 24,
          }}>
          <Text
            style={{
              fontWeight: '700',
              fontSize: 16,
              color: 'rgba(87, 51, 83, 1)',
              lineHeight: 24,
              textAlign: 'center',
            }}>
            {'We can '.toUpperCase()}
            <Text
              style={{
                fontWeight: '700',
                fontSize: 16,
                color: 'orange',
                lineHeight: 24,
                textAlign: 'center',
              }}>
              {'help you '.toUpperCase()}
            </Text>
            {'to be a better version of'.toUpperCase()}
            <Text
              style={{
                fontWeight: '700',
                fontSize: 16,
                color: 'orange',
                lineHeight: 24,
                textAlign: 'center',
              }}>
              {'yourself.'.toUpperCase()}
            </Text>
          </Text>
        </View>
      </View>
      {!isStarted ? (
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'space-between',

            paddingHorizontal: 16,
          }}>
          <TouchableOpacity
            onPress={() => {
              if (scrollToIndex !== 0) {
                scroll.current.scrollTo({
                  x: dataSourceCords[scrollToIndex - 1],
                  y: 0,
                  animated: true,
                });
                setScrollToIndex(scrollToIndex - 1);
              } else {
                console.log('minnnnnnnnnnnnn');
              }
            }}
            style={{ padding: 8 }}>
            <Text style={{ color: 'black' }}>Skip</Text>
          </TouchableOpacity>
          <View style={styles.indicatorContainer}>
            {images.map((image, imageIndex) => {
              const backgroundColor = scrollX.interpolate({
                inputRange: [
                  windowWidth * (imageIndex - 1),
                  windowWidth * imageIndex,
                  windowWidth * (imageIndex + 1),
                ],
                outputRange: ['orange', '#573353', 'orange'],
                extrapolate: 'clamp',
              });
              return (
                <Animated.View
                  key={imageIndex}
                  style={[styles.normalDot, { backgroundColor }]}
                />
              );
            })}
          </View>
          <TouchableOpacity
            style={{ padding: 8 }}
            onPress={() => {
              console.log('scrollToIndex:', scrollToIndex);
              if (scrollToIndex !== images.length - 2) {
                scroll.current.scrollTo({
                  x: dataSourceCords[scrollToIndex + 1],
                  y: 0,
                  animated: true,
                });
                setScrollToIndex(scrollToIndex + 1);
              } else {
                scroll.current.scrollTo({
                  x: dataSourceCords[scrollToIndex + 1],
                  y: 0,
                  animated: true,
                });
                setIsStarted(true);
                console.log('maxxxxxxxxxxxxxxx');
              }
            }}>
            <Text style={{ color: 'black' }}>Next</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={{ width: '100%', paddingHorizontal: 16 }}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate(MainRoutes.Login);
            }}
            style={{
              borderRadius: 8,
              width: '100%',
              paddingVertical: 16,
              backgroundColor: 'orange',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text
              style={{
                fontWeight: '700',
                fontSize: 16,
                color: 'rgba(87, 51, 83, 1)',
              }}>
              Get Started
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    paddingVertical: 48,
  },
  scrollContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    width: '100%',
    height: '100%',
  },
  textContainer: {
    backgroundColor: 'rgba(0,0,0, 0.7)',
    paddingHorizontal: 24,
    paddingVertical: 8,
    borderRadius: 5,
  },
  infoText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  normalDot: {
    height: 12,
    width: 12,
    borderRadius: 100,
    marginHorizontal: 4,
  },
  indicatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Splash;
