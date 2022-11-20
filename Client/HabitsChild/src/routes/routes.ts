import { createNativeStackNavigator } from '@react-navigation/native-stack';

export enum MainRoutes {
  Login = 'Login',
  Splash = 'Splash',
  SignUp = 'SignUp',
  ForgotPass = 'ForgotPass',
  Home = 'Home',
  Course = 'Course',
  Profile = 'Profile',
  Setting = 'Setting',
  TabNavigation = 'TabNavigation',
  ViewCourse = 'ViewCourse',
  HaibitDetail = 'HaibitDetail',
  AddHabits = 'AddHabits',
  ChangePassword = 'ChangePassword',
  Information = 'Information',
  ViewProfile = 'ViewProfile',
  About = 'About',
}

export type MainStackParamList = {
  [MainRoutes.Login]: undefined;
  [MainRoutes.Splash]: undefined;
  [MainRoutes.SignUp]: undefined;
  [MainRoutes.ForgotPass]: undefined;
  [MainRoutes.Home]: undefined;
  [MainRoutes.Course]: undefined;
  [MainRoutes.Profile]: undefined;
  [MainRoutes.Setting]: undefined;
  [MainRoutes.TabNavigation]: undefined;
  [MainRoutes.ViewCourse]:
    | {
        data: any;
      }
    | undefined;
  [MainRoutes.HaibitDetail]: undefined | { userHabitsId: number };
  [MainRoutes.AddHabits]: undefined;
  [MainRoutes.ChangePassword]: undefined;
  [MainRoutes.Information]: undefined;
  [MainRoutes.About]: undefined;
  [MainRoutes.ViewProfile]: undefined | { dataProfile: any };
};

export const MainStack = createNativeStackNavigator<MainStackParamList>();
