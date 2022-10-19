import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { IMAGE } from '../../constants/Image';
import Course from '../course/Course';
import AddHabits from '../habits/AddHabits';
import Home from '../home/Home';
import Profile from '../profile/Profile';
import Setting from '../setting/Setting';

interface TabNavigationProps {}
const Tab = createBottomTabNavigator();
const ButtonCenter = (props: TabNavigationProps) => {
  return (
    <TouchableOpacity
      {...props}
      style={{
        width: 64,
        height: 64,
        justifyContent: 'center',
        alignItems: 'center',
        bottom: 32,
        backgroundColor: 'rgba(252, 157, 69, 0.2)',
        borderRadius: 100,
      }}>
      <View
        {...props}
        style={{
          width: 52,
          height: 52,
          justifyContent: 'center',
          alignItems: 'center',

          backgroundColor: 'rgba(252, 157, 69, 1)',
          borderRadius: 100,
        }}></View>
    </TouchableOpacity>
  );
};
const TabNavigation = (props: TabNavigationProps) => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              // <View>
              <Image
                source={focused ? IMAGE.ic_home : IMAGE.ic_home_default}
                style={{
                  width: 48,
                  height: 28,
                  resizeMode: 'contain',

                  // opacity: 0.5,
                }}
              />
              //   ;
              // </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="Course"
        component={Course}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              // <View>
              <Image
                source={focused ? IMAGE.ic_course : IMAGE.ic_course_default}
                style={{
                  width: 48,
                  height: 28,
                  resizeMode: 'contain',

                  // opacity: 0.5,
                }}
              />
              //   ;
              // </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="AddHabits"
        component={AddHabits}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              // <View>
              <Image
                source={focused ? IMAGE.ic_check : IMAGE.ic_plus}
                style={{
                  width: 20,
                  height: 20,
                  resizeMode: 'contain',

                  // opacity: 0.5,
                }}
              />
              //   ;
              // </View>
            );
          },
          tabBarButton: props => {
            return <ButtonCenter {...props} />;
          },
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              // <View>
              <Image
                source={focused ? IMAGE.ic_people : IMAGE.ic_people_default}
                style={{
                  width: 48,
                  height: 28,
                  resizeMode: 'contain',

                  // opacity: 0.5,
                }}
              />
              //   ;
              // </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="Setting"
        component={Setting}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              // <View>
              <Image
                source={focused ? IMAGE.ic_setting : IMAGE.ic_setting_default}
                style={{
                  width: 48,
                  height: 28,
                  resizeMode: 'contain',

                  // opacity: 0.5,
                }}
              />
              //   ;
              // </View>
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigation;

const styles = StyleSheet.create({
  container: {},
});
