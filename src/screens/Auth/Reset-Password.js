import React, {useRef, useState} from 'react';
import {
  View,
  Keyboard,
  Platform,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from 'react-native';

// ** Utils
import {FormikValuesChanged, isObjEmpty} from '../../utils/utils';
import {theme as AppTheme} from '../../@core/infrustructure/theme';

// ** Third Party Packages
import * as Yup from 'yup';
import {useFormik} from 'formik';
import validator from 'validator';
import {useNavigation} from '@react-navigation/native';

// ** Custom Components
import {LayoutModel} from '../../@core/layout/LayoutModel';
import {LogoComponent} from '../../@core/components/logo';
import {HeadingDetails, TextInput} from '../../@core/components';
import {AuthContainer, UserActivityWrapper} from '../../styles/screens';

// ** Store && Actions
import {useDispatch} from 'react-redux';
import {ButtonAction} from '../../components';
import {BackButton} from '../../components/buttons/BackButton';

const ResetPassword = () => {
  // ** Refs
  const password_ref = useRef(null);
  const confirm_password_ref = useRef(null);
  // const password_sheet_ref = useRef(null);

  // ** Navigation
  const navigation = useNavigation();

  // ** Store
  const dispatch = useDispatch();

  // ** States
  const [isLoading, setIsLoading] = useState('');

  // ** Schema
  const schema = Yup.object().shape({
    password: Yup.string()
      .required('Password is required')
      .test(
        'is-strong',
        'Password must be at least 8 characters long, include 1 uppercase letter, 1 symbol, and 1 number',
        value => {
          if (value) {
            return validator.isStrongPassword(value, {
              minLength: 8,
              minLowercase: 0,
              minUppercase: 1,
              minNumbers: 1,
              minSymbols: 1,
              returnScore: false,
            });
          }
        },
      ),
    confirmPassword: Yup.string()
      .required('Confirm Password is required')
      .oneOf([Yup.ref('password'), null], 'Passwords must match'),
  });

  const formik = useFormik({
    initialValues: {
      password: '',
      confirmPassword: '',
    },
    validationSchema: schema,
    enableReinitialize: true,
    onSubmit: async values => {
      if (isObjEmpty(formik.errors)) {
        console.log('reset password....', values);
        navigation.navigate('Login');
      }
    },
  });

  return (
    <View style={styles.MainContainer}>
      <BackButton
        size={6}
        onPress={() => navigation.goBack()}
        icon={'arrow-left'}
        iconColor={'white'}
        bg={'transparent'}
        customStyles={{
          marginLeft: AppTheme?.WP(4),
        }}
      />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{flex: 1}}>
          <LogoComponent height={22} width={22} margin={{top: 2, bottom: 2}} />
          <LayoutModel MT={7}>
            <AuthContainer
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps={'handled'}>
              <HeadingDetails
                customStyles={{marginBottom: AppTheme?.WP(5)}}
                justifyContent={'center'}
                heading={'Reset Password'}
                description={'Enter your new password to reset'}
                details={{
                  heading: {
                    size: '8',
                    weight: 'medium',
                    family: 'PoppinsMedium',
                  },
                  description: {
                    size: '5',
                    weight: 'regular',
                    family: 'PoppinsRegular',
                  },
                  customStyles: {
                    heading: {
                      marginBottom: AppTheme?.WP(2),
                    },
                    description: {
                      marginBottom: AppTheme?.WP(2),
                      textAlign: 'center',
                    },
                  },
                }}
              />

              <TextInput
                ref={password_ref}
                multiline={false}
                disabled={false}
                leftIcon={'lock'}
                title={'Password'}
                variant={'outlined'}
                inputMode={'text'}
                returnKeyType={'next'}
                nextInputRef={confirm_password_ref}
                styleData={{
                  labelStyles: {
                    weight: 'medium',
                    color: AppTheme?.DefaultPalette()?.text?.title,
                  },
                }}
                secureTextEntry={true}
                value={formik.values.password}
                formikError={formik.errors?.password}
                placeholder={'Enter your password'}
                formikTouched={formik.touched.password}
                placeholderColor={AppTheme?.DefaultPalette()?.text?.primary}
                onChangeText={text => formik.setFieldValue('password', text)}
                onBlur={() => formik.setFieldTouched('password', true)}
                onBlurChange={() => formik.setFieldTouched('password', true)}
              />
              <TextInput
                ref={confirm_password_ref}
                multiline={false}
                disabled={false}
                title={'Confirm Password'}
                variant={'outlined'}
                leftIcon={'lock'}
                inputMode={'text'}
                returnKeyType={'done'}
                styleData={{
                  labelStyles: {
                    weight: 'medium',
                    color: AppTheme?.DefaultPalette()?.text?.title,
                  },
                }}
                secureTextEntry={true}
                value={formik.values.confirmPassword}
                formikError={formik.errors?.confirmPassword}
                placeholder={'Confirm your password'}
                formikTouched={formik.touched.confirmPassword}
                placeholderColor={AppTheme?.DefaultPalette()?.text?.primary}
                onChangeText={text =>
                  formik.setFieldValue('confirmPassword', text)
                }
                onBlur={() => formik.setFieldTouched('confirmPassword', true)}
                onBlurChange={() =>
                  formik.setFieldTouched('confirmPassword', true)
                }
                submit={() => {
                  if (isObjEmpty(formik.errors)) {
                    formik.handleSubmit();
                  }
                }}
              />
            </AuthContainer>

            <UserActivityWrapper
              style={styles.buttonsWrapper}
              direction={'column'}
              alignItems={'flex-end'}
              justifyContent={'flex-end'}>
              <ButtonAction
                end={true}
                title={'Next'}
                titleWeight={'bold'}
                loading={isLoading === 'login_pending'}
                onPress={() => formik.handleSubmit()}
                border={AppTheme?.DefaultPalette()?.buttons?.primary}
                color={AppTheme?.DefaultPalette()?.buttons?.primary}
                labelColor={AppTheme.DefaultPalette().common.white}
                loadingColor={AppTheme.DefaultPalette().common.white}
                disabled={
                  FormikValuesChanged(formik.initialValues, formik.values) ||
                  !isObjEmpty(formik.errors)
                }
              />
            </UserActivityWrapper>
          </LayoutModel>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    paddingTop: AppTheme?.WP(14),
    backgroundColor: AppTheme?.DefaultPalette()?.primary?.main,
  },
  title: {
    paddingHorizontal: AppTheme?.WP(4),
    marginBottom: AppTheme?.WP(2),
  },
});

export {ResetPassword};
