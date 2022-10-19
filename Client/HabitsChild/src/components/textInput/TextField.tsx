/* eslint-disable prettier/prettier */
import {
  Animated,
  Image,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { FONT, SIZE } from '../../constants';
import { IMAGE } from '../../constants/Image';

const BASE_SIZE = SIZE.h40; //text size and padding size
const VIEW_HEIGHT = BASE_SIZE * 3.5;

const TextField = forwardRef((props: any, ref) => {
  const textInput = useRef();
  const [isFocused, setIsFocused] = useState(false);
  const [value, setValue] = useState(props.value || '');
  const [labelHeight, setLabelHeight] = useState(0);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState('');
  const [hidePassword, setHidePassword] = useState(true);
  const _animatedIsFocused = useRef(new Animated.Value(!props.value ? 0 : 1));

  useEffect(() => {
    if (error || message !== '') {
      setError(false);
      setMessage('');
    }
    Animated.timing(_animatedIsFocused.current, {
      toValue: isFocused || value !== '' ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [isFocused, value]);

  useEffect(() => {
    if (props.value != value && props.value != undefined) {
      setValue(props.value);
    }
  }, [props.value]);

  const handleFocus = () => {
    setIsFocused(true);
    props.onFocus ? props.onFocus() : null;
  };

  const handleBlur = () => {
    setIsFocused(false);
    props.onBlur ? props.onBlur() : null;
  };

  const onClear = () => {
    setValue('');
    props.onClear ? props.onClear() : null;
    props.onChangeText ? props.onChangeText('') : null;
    // _animatedIsFocused.current.setValue(1);
  };
  const onFocus = () => {
    textInput.current?.focus();
  };
  const showError = (message = '') => {
    console.log('message', message);
    setError(true);
    setMessage(message);
  };

  useImperativeHandle(ref, () => ({
    value: value,
    setValue: (val: string) => setValue(val),
    showError: (message: string) => showError(message),
    onFocus,
  }));
  const onChangeText = (txt: string) => {
    setValue(txt);
    props.onChangeText ? props.onChangeText(txt) : null;
  };

  const textInputs = () => (
    <TextInput
      {...props}
      ref={textInput}
      maxLength={props.maxLenght}
      autoFocus={props.autoFocus}
      autoCorrect={false}
      autoCompleteType="off"
      keyboardType={props.keyboardType}
      editable={!props.disabled}
      style={[
        styles.textInput,
        {
          color: 'rgba(89, 89, 89, 1)',
          left: props.isIcon
            ? props?.isIconBig
              ? BASE_SIZE * 3.5
              : BASE_SIZE * 2.5
            : BASE_SIZE,
        },
        props.inputStyle,
      ]}
      value={value}
      onChangeText={(text: string) => {
        if (props.isFileName) {
          text = text.replace(/[<>:;,?"*|/.]/g, '');
        }
        onChangeText && onChangeText(text);
      }}
      onFocus={handleFocus}
      onBlur={handleBlur}
      blurOnSubmit
      multiline={props.multiline}
    />
  );
  const textInputPass = () => (
    <TextInput
      {...props}
      ref={textInput}
      autoCorrect={false}
      autoCompleteType="off"
      style={[
        styles.textInput,
        isFocused && { width: '85%' },
        { color: 'black', left: props.isIcon ? BASE_SIZE * 2.5 : BASE_SIZE },
        props.inputStyle,
      ]}
      value={value}
      onChangeText={onChangeText}
      onFocus={handleFocus}
      secureTextEntry={hidePassword}
      onBlur={handleBlur}
      blurOnSubmit
    />
  );

  const iconClear = () => {
    if (value !== '') {
      return (
        <TouchableOpacity
          style={{
            position: 'absolute',
            right: BASE_SIZE,
            // height: 24,
            // width: 24,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={onClear}>
          <Image style={styles.icon32} source={IMAGE.ic_closeCircle} />
        </TouchableOpacity>
      );
    }
    return null;
  };

  const passwordLength = () => (
    <Text style={styles.passwordLength}>{value.length + '/10'}</Text>
  );

  const iconEye = () => (
    <TouchableOpacity
      style={{
        position: 'absolute',
        right: BASE_SIZE,
      }}
      onPress={() => {
        setHidePassword(!hidePassword);
      }}>
      <Image
        style={{ width: 16, height: 16, resizeMode: 'contain' }}
        source={hidePassword ? IMAGE.ic_eye : IMAGE.ic_hide_eye}
      />
    </TouchableOpacity>
  );

  const iconLeft = () => {
    if (props?.isIconBig) {
      return (
        // console.log(props.imageLeft)
        // return
        <View style={{ width: '15%' }}>
          <Image
            style={[
              styles.icon32,
              { height: SIZE.h80, width: SIZE.h80, tintColor: null },
            ]}
            source={props.imageLeft}
          />
        </View>
      );
    } else {
      return (
        // console.log(props.imageLeft)
        // return
        <Image style={[styles.icon32]} source={props.imageLeft} />
      );
    }
  };

  const requireInput = () => <Text style={{ color: 'red' }}> *</Text>;

  return (
    <>
      <TouchableOpacity
        activeOpacity={1}
        disabled={props.disabled}
        onPress={() => {
          props.disabled ? null : (textInput?.current as any)?.focus();
          props.onPress && props.onPress();
        }}
        style={[
          styles.container,
          isFocused && styles.focusStyle,
          props.disabled && { backgroundColor: '#E8E8E8' },
          error ? { borderColor: 'red' } : null,
          props.style,
        ]}>
        <Animated.Text
          onLayout={event => {
            labelHeight === 0 &&
              setLabelHeight(event.nativeEvent.layout.height);
          }}
          style={[
            styles.labelStyle,
            {
              left: props.isIcon
                ? props?.isIconBig
                  ? BASE_SIZE * 3.5
                  : BASE_SIZE * 2.5
                : BASE_SIZE,
              color: props.disabled
                ? 'rgba(191, 191, 191, 1)'
                : 'rgba(191, 191, 191, 1)',
              top: _animatedIsFocused.current.interpolate({
                inputRange: [0, 1],
                outputRange: [
                  (VIEW_HEIGHT - labelHeight - 2) / 2,
                  BASE_SIZE / 2,
                ],
              }),
              fontSize: _animatedIsFocused.current.interpolate({
                inputRange: [0, 1],
                outputRange: [SIZE.h28, SIZE.h24],
              }),
              fontWeight: '400',
              //fontFamily: FONT.regular,
            },
            props.styleLabel,
          ]}>
          {props.label}
          {props.isRequired ? requireInput() : null}
        </Animated.Text>
        <>
          {props.isPassword ? (
            ///text input có icon ẩn hiện pass/////
            <>
              {iconLeft()}
              {textInputPass()}
              {value ? iconEye() : null}
            </>
          ) : props.isIcon ? (
            //text input nhập chữ bình thường////////////
            <>
              {iconLeft()}
              {textInputs()}
              {props.passwordLength ? passwordLength() : iconClear()}
            </>
          ) : (
            <>
              {textInputs()}
              {props.passwordLength
                ? passwordLength()
                : props.icClear
                ? iconClear()
                : false}
            </>
          )}
        </>
      </TouchableOpacity>
      {message ? <Text style={styles.messageError}>{message}</Text> : null}
    </>
  );
});

export default TextField;
const styles = StyleSheet.create({
  container: {
    borderColor: 'rgba(232, 232, 232, 1)',
    borderRadius: BASE_SIZE / 2,
    borderWidth: 1,
    paddingHorizontal: BASE_SIZE,
    paddingVertical: BASE_SIZE,
    height: VIEW_HEIGHT,
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  labelStyle: {
    padding: 0,
    textAlignVertical: 'top',
    position: 'absolute',
    left: BASE_SIZE * 2.5,
    //fontFamily: FONT.regular,
  },
  textInput: {
    width: '90%',
    position: 'absolute',
    left: BASE_SIZE * 2.5,
    height: VIEW_HEIGHT,
    bottom: BASE_SIZE / 2 - 20,
    paddingBottom: Platform.OS === 'ios' ? BASE_SIZE / 2 : BASE_SIZE / 2 - 5,
    fontSize: SIZE.h28,
    fontWeight: '400',
    padding: 0,
    borderWidth: 0,
    //fontFamily: FONT.regular,
  },
  messageError: {
    fontSize: BASE_SIZE * 0.7,
    color: 'red',
    marginTop: 3,

    fontWeight: '400',
  },
  focusStyle: {
    borderColor: 'rgba(232, 232, 232, 1)',
    backgroundColor: 'white',
  },
  icon16: { width: SIZE.h16, height: SIZE.h16 },
  icon24: { width: SIZE.h24, height: SIZE.h24 },
  icon32: {
    width: SIZE.h34,
    height: SIZE.h34,
    // tintColor: 'rgba(38, 38, 38, 1)',
    resizeMode: 'contain',
  },
  textHidePassword: {
    fontSize: SIZE.h28,
    color: 'rgba(191, 191, 191, 1)',
    //fontFamily: FONT.regular,
  },
  passwordLength: {
    color: 'gray',
    position: 'absolute',
    right: BASE_SIZE,
    fontSize: SIZE.h14,
    //fontFamily: FONT.regular,
  },
});
