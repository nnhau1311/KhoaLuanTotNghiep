/* eslint-disable prettier/prettier */
import {
  ImageBackgroundProps,
  ImageProps,
  ImageSourcePropType,
} from 'react-native';
// import {
//   BUNDLE_DOMAIN,
//   ASSET_IMAGE_PATH,
//   IS_MINI_APP,
// } from './../configs/appConfig';

interface IMAGEProps {
  [key: string]: {
    path: ImageBackgroundProps | ImageProps | ImageSourcePropType;
    name: String;
  };
}

let IMAGE: IMAGEProps = {
  img_bg_login: {
    path: require('../assets/images/img_bg_login.png'),
    name: '/img_bg_login.png',
  },
  ic_home: {
    path: require('../assets/images/ic_home.png'),
    name: '/ic_home.png',
  },
  ic_avt: {
    path: require('../assets/images/ic_avt.png'),
    name: '/ic_avt.png',
  },
  ic_avt1: {
    path: require('../assets/images/ic_avt1.png'),
    name: '/ic_avt1.png',
  },
  ic_repass: {
    path: require('../assets/images/ic_repass.png'),
    name: '/ic_repass.png',
  },
  ic_delete_home: {
    path: require('../assets/images/ic_delete_home.png'),
    name: '/ic_delete_home.png',
  },
  ic_edit_home: {
    path: require('../assets/images/ic_edit_home.png'),
    name: '/ic_edit_home.png',
  },
  ic_enter: {
    path: require('../assets/images/ic_enter.png'),
    name: '/ic_enter.png',
  },
  ic_avt2: {
    path: require('../assets/images/ic_avt2.png'),
    name: '/ic_avt2.png',
  },
  ic_avt3: {
    path: require('../assets/images/ic_avt3.png'),
    name: '/ic_avt3.png',
  },
  ic_avt4: {
    path: require('../assets/images/ic_avt4.png'),
    name: '/ic_avt4.png',
  },
  ic_avt5: {
    path: require('../assets/images/ic_avt5.png'),
    name: '/ic_avt5.png',
  },
  ic_course: {
    path: require('../assets/images/ic_course.png'),
    name: '/ic_course.png',
  },
  ic_people: {
    path: require('../assets/images/ic_people.png'),
    name: '/ic_people.png',
  },
  ic_setting: {
    path: require('../assets/images/ic_setting.png'),
    name: '/ic_setting.png',
  },
  ic_home_default: {
    path: require('../assets/images/ic_home_default.png'),
    name: '/ic_home_default.png',
  },
  ic_course_default: {
    path: require('../assets/images/ic_course_default.png'),
    name: '/ic_course_default.png',
  },
  ic_people_default: {
    path: require('../assets/images/ic_people_default.png'),
    name: '/ic_people_default.png',
  },
  ic_setting_default: {
    path: require('../assets/images/ic_setting_default.png'),
    name: '/ic_setting_default.png',
  },
  ic_plus: {
    path: require('../assets/images/ic_plus.png'),
    name: '/ic_plus.png',
  },
  ic_fb: {
    path: require('../assets/images/ic_fb.png'),
    name: '/ic_fb.png',
  },
  ic_gg: {
    path: require('../assets/images/ic_gg.png'),
    name: '/ic_gg.png',
  },
  ic_mail: {
    path: require('../assets/images/ic_mail.png'),
    name: '/ic_mail.png',
  },
  ic_lock: {
    path: require('../assets/images/ic_lock.png'),
    name: '/ic_lock.png',
  },
  ic_locked: {
    path: require('../assets/images/ic_locked.png'),
    name: '/ic_locked.png',
  },
  ic_closeCircle: {
    path: require('../assets/images/ic_closeCircle.png'),
    name: '/ic_closeCircle.png',
  },
  ic_eye: {
    path: require('../assets/images/ic_eye.png'),
    name: '/ic_eye.png',
  },
  ic_hide_eye: {
    path: require('../assets/images/ic_hide_eye.png'),
    name: '/ic_hide_eye.png',
  },
  img_signup: {
    path: require('../assets/images/img_signup.png'),
    name: '/img_signup.png',
  },
  ic_user: {
    path: require('../assets/images/ic_user.png'),
    name: '/ic_user.png',
  },
  img_forgotpass: {
    path: require('../assets/images/img_forgotpass.png'),
    name: '/img_forgotpass.png',
  },
  img_child: {
    path: require('../assets/images/img_child.png'),
    name: '/img_child.png',
  },
  img_bg: {
    path: require('../assets/images/img_bg.png'),
    name: '/img_bg.png',
  },
  ic_menu: {
    path: require('../assets/images/ic_menu.png'),
    name: '/ic_menu.png',
  },

  ic_back: {
    path: require('../assets/images/ic_back.png'),
    name: '/ic_back.png',
  },
  ic_glass: {
    path: require('../assets/images/ic_glass.png'),
    name: '/ic_glass.png',
  },
  img_child2: {
    path: require('../assets/images/img_child2.png'),
    name: '/img_child2.png',
  },
  img_child3: {
    path: require('../assets/images/img_child3.png'),
    name: '/img_child3.png',
  },
  ic_play: {
    path: require('../assets/images/ic_play.png'),
    name: '/ic_play.png',
  },
  ic_book: {
    path: require('../assets/images/ic_book.png'),
    name: '/ic_book.png',
  },
  ic_more: {
    path: require('../assets/images/ic_more.png'),
    name: '/ic_more.png',
  },
  ic_edit: {
    path: require('../assets/images/ic_edit.png'),
    name: '/ic_edit.png',
  },
  ic_leu: {
    path: require('../assets/images/ic_leu.png'),
    name: '/ic_leu.png',
  },
  ic_noti: {
    path: require('../assets/images/ic_noti.png'),
    name: '/ic_noti.png',
  },
  ic_repeat: {
    path: require('../assets/images/ic_repeat.png'),
    name: '/ic_repeat.png',
  },
  ic_check: {
    path: require('../assets/images/ic_check.png'),
    name: '/ic_check.png',
  },
  ic_longday: {
    path: require('../assets/images/ic_longday.png'),
    name: '/ic_longday.png',
  },
  ic_light: {
    path: require('../assets/images/ic_light.png'),
    name: '/ic_light.png',
  },
  ic_completion: {
    path: require('../assets/images/ic_completion.png'),
    name: '/ic_completion.png',
  },
  ic_score: {
    path: require('../assets/images/ic_score.png'),
    name: '/ic_score.png',
  },
  ic_close: {
    path: require('../assets/images/ic_close.png'),
    name: '/ic_close.png',
  },
  ic_selectHabit: {
    path: require('../assets/images/ic_selectHabit.png'),
    name: '/ic_selectHabit.png',
  },
  ic_add: {
    path: require('../assets/images/ic_add.png'),
    name: '/ic_add.png',
  },
  img_avt: {
    path: require('../assets/images/img_avt.png'),
    name: '/img_avt.png',
  },
  ic_arrow_down: {
    path: require('../assets/images/ic_arrow_down.png'),
    name: '/ic_arrow_down.png',
  },
  ic_arrow_down1: {
    path: require('../assets/images/ic_arrow_down1.png'),
    name: '/ic_arrow_down1.png',
  },
  ic_arrow_bottom: {
    path: require('../assets/images/ic_arrow_bottom.png'),
    name: '/ic_arrow_bottom.png',
  },
  ic_play_down: {
    path: require('../assets/images/ic_play_down.png'),
    name: '/ic_play_down.png',
  },
  ic_clock: {
    path: require('../assets/images/ic_clock.png'),
    name: '/ic_clock.png',
  },
  ic_flag: {
    path: require('../assets/images/ic_flag.png'),
    name: '/ic_flag.png',
  },
  ic_chart: {
    path: require('../assets/images/ic_chart.png'),
    name: '/ic_chart.png',
  },
  ic_arrow_right: {
    path: require('../assets/images/ic_arrow_right.png'),
    name: '/ic_arrow_right.png',
  },
  ic_arrow_right1: {
    path: require('../assets/images/ic_arrow_right1.png'),
    name: '/ic_arrow_right1.png',
  },
  ic_about: {
    path: require('../assets/images/ic_about.png'),
    name: '/ic_about.png',
  },
  ic_contact: {
    path: require('../assets/images/ic_contact.png'),
    name: '/ic_contact.png',
  },
  ic_face: {
    path: require('../assets/images/ic_face.png'),
    name: '/ic_face.png',
  },
  ic_logout: {
    path: require('../assets/images/ic_logout.png'),
    name: '/ic_logout.png',
  },
  ic_checkbox_fill: {
    path: require('../assets/images/ic_checkSquare_fill.png'),
    name: '/ic_Checkbox_fill.png',
  },
  ic_checkSquare_empty: {
    path: require('../assets/images/ic_checkSquare_empty.png'),
    name: '/ic_checkSquare_empty.png',
  },
  ic_bioMetrics: {
    path: require('../assets/images/ic_bioMetrics.png'),
    name: '/ic_bioMetrics.png',
  },
  ic_fullname: {
    path: require('../assets/images/ic_fullname.png'),
    name: '/ic_fullname.png',
  },
  img_nodata: {
    path: require('../assets/images/img_nodata.png'),
    name: '/img_nodata.png',
  },
  img_child4: {
    path: require('../assets/images/img_child4.png'),
    name: '/img_child4.png',
  },
  ic_video: {
    path: require('../assets/images/ic_video.png'),
    name: '/ic_video.png',
  },
  icon_app: {
    path: require('../assets/images/icon_app.png'),
    name: '/icon_app.png',
  },
  splash1: {
    path: require('../assets/images/splash1.png'),
    name: '/splash1.png',
  },
  splash2: {
    path: require('../assets/images/splash2.png'),
    name: '/splash2.png',
  },
  splash3: {
    path: require('../assets/images/splash3.png'),
    name: '/splash3.png',
  },
  splash4: {
    path: require('../assets/images/splash4.png'),
    name: '/splash4.png',
  },
  ic_habit: {
    path: require('../assets/images/ic_habit.png'),
    name: '/ic_habit.png',
  },
  ic_thongke: {
    path: require('../assets/images/ic_thongke.png'),
    name: '/ic_thongke.png',
  },
};

let convertImage: Function = () => {
  let result: { [key: string]: ImageBackgroundProps | ImageProps } = {};
  for (const key in IMAGE) {
    if (Object.prototype.hasOwnProperty.call(IMAGE, key)) {
      let image = IMAGE[key];
      // if (__DEV__ || !IS_MINI_APP) {
      Object.assign(result, { [key]: image.path });
      // } else {
      //   Object.assign(result, {
      //     [key]: BUNDLE_DOMAIN + ASSET_IMAGE_PATH + image.name,
      //   });
      // }
    }
  }
  return result;
};

IMAGE = convertImage();

export { IMAGE };
