import { createNativeStackNavigator } from '@react-navigation/native-stack';

export enum MainRoutes {
  Login = 'Login',
  Splash='Splash',
  SignUp='SignUp',
  ForgotPass='ForgotPass',
  Home='Home',
  Course='Course',
  Profile='Profile',
  Setting='Setting',
  TabNavigation='TabNavigation',
  ViewCourse='ViewCourse',
  HaibitDetail='HaibitDetail',
   AddHabits='AddHabits',
}

export type MainStackParamList = {
  [MainRoutes.Login]: undefined;
  [MainRoutes.Splash]:undefined
  [MainRoutes.SignUp]:undefined
  [MainRoutes.ForgotPass]:undefined
  [MainRoutes.Home]:undefined
  [MainRoutes.Course]:undefined
  [MainRoutes.Profile]:undefined
  [MainRoutes.Setting]:undefined
  [MainRoutes.TabNavigation]:undefined
  [MainRoutes.ViewCourse]:|{
    data:any
  }|undefined;
  [MainRoutes.HaibitDetail]:undefined
   [MainRoutes.AddHabits]:undefined
};

export const MainStack = createNativeStackNavigator<MainStackParamList>();
