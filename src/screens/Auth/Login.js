import React, {useRef, useEffect, useState} from 'react';
import {
  View,
  Keyboard,
  Platform,
  StyleSheet,
  Pressable,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from 'react-native';

// ** Utils
import {FormikValuesChanged, isObjEmpty} from '../../utils/utils';
import {theme as AppTheme} from '../../@core/infrustructure/theme';

// ** Third Party Packages
import * as Yup from 'yup';
import {useFormik} from 'formik';
import {useNavigation} from '@react-navigation/native';

// ** Custom Components
import {
  AuthActivityLabel,
  AuthActivityWrapper,
  AuthContainer,
  UserActivityWrapper,
} from '../../styles/screens';
import {CheckBox, HeadingDetails, TextInput} from '../../@core/components';
import {LayoutModel} from '../../@core/layout/LayoutModel';
import {LogoComponent} from '../../@core/components/logo';

// ** Store && Actions
import {useDispatch} from 'react-redux';
import {ButtonAction} from '../../components';
import {getData, setData} from '../../utils/constants';
import {navigateTo} from '../../navigation/utils';

const Login = () => {
  // ** Refs
  const email_ref = useRef(null);
  const password_ref = useRef(null);

  // ** Navigation
  const navigation = useNavigation();

  // ** Store
  const dispatch = useDispatch();

  // ** States
  const [isLoading, setIsLoading] = useState('');
  const [login_creds, setLoginCreds] = useState({});
  const [rememberMe, setRememberMe] = useState('checked');

  useEffect(() => {
    (async () => {
      if (rememberMe === 'checked') {
        const data = await getData('login_creds');
        setLoginCreds(JSON.parse(data));
      } else {
        setLoginCreds({});
      }
    })();
  }, [rememberMe]);

  // ** Schema
  const schema = Yup.object().shape({
    email: Yup.string().email().required('Email is a required field'),
    password: Yup.string().required('Password is a required field'),
  });

  const formik = useFormik({
    initialValues: {
      email: login_creds?.email || '',
      password: login_creds?.password || '',
    },
    enableReinitialize: true,
    validationSchema: schema,
    onSubmit: async values => {
      if (isObjEmpty(formik.errors)) {
        console.log('Login Values...', values);
        navigateTo('App');
        // navigation.navigate('Register');

        if (rememberMe === 'checked') {
          await setData('login_creds', JSON.stringify(values));
        }
      }
    },
  });

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{flex: 1}}>
        <View style={styles.MainContainer}>
          <LogoComponent height={22} width={22} margin={{top: 2, bottom: 2}} />
          <HeadingDetails
            heading={'LUMBER CLICK'}
            description={'Fill the below information to Log In'}
            details={{
              heading: {
                size: '6.5',
                weight: 'bold',
                family: 'PoppinsBold',
                color: 'white',
              },
              description: {
                size: '4',
                weight: 'medium',
                family: 'PoppinsMedium',
                color: 'white',
              },
              customStyles: {
                heading: {
                  marginBottom: AppTheme?.WP(2),
                },
                description: {
                  marginBottom: AppTheme?.WP(2),
                },
              },
            }}
          />

          <LayoutModel MT={7}>
            <AuthContainer
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps={'handled'}
              justifyContent={'flex-start'}>
              <HeadingDetails
                customStyles={{marginBottom: AppTheme?.WP(5)}}
                heading={'Welcome Back!'}
                description={"Hello, let's get started!"}
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
                      marginBottom: AppTheme?.WP(1.5),
                    },
                    description: {
                      marginBottom: AppTheme?.WP(2),
                    },
                  },
                }}
              />

              <TextInput
                ref={email_ref}
                multiline={false}
                disabled={false}
                leftIcon={'email'}
                title={'Email'}
                variant={'outlined'}
                inputMode={'email'}
                returnKeyType={'next'}
                styleData={{
                  labelStyles: {
                    weight: 'medium',
                    color: AppTheme?.DefaultPalette()?.text?.title,
                  },
                }}
                secureTextEntry={false}
                value={formik.values.email}
                nextInputRef={password_ref}
                placeholder={'Enter your email'}
                formikError={formik.errors?.email}
                formikTouched={formik.touched.email}
                placeholderColor={AppTheme?.DefaultPalette()?.text?.primary}
                onChangeText={text => formik.setFieldValue('email', text)}
                onBlur={() => formik.setFieldTouched('email', true)}
                onBlurChange={() => formik.setFieldTouched('email', true)}
              />

              <TextInput
                disabled={false}
                multiline={false}
                ref={password_ref}
                title={'Password'}
                variant={'outlined'}
                secureTextEntry={true}
                returnKeyType={'done'}
                leftIcon={'lock'}
                value={formik.values.password}
                placeholder={'**************'}
                formikError={formik.errors.password}
                formikTouched={formik.touched.password}
                placeholderColor={AppTheme?.DefaultPalette()?.text?.primary}
                onChangeText={text => formik.setFieldValue('password', text)}
                onBlur={() => formik.setFieldTouched('password', true)}
                styleData={{
                  labelStyles: {
                    weight: 'medium',
                    color: AppTheme?.DefaultPalette()?.text?.title,
                  },
                }}
                submit={() => {
                  if (isObjEmpty(formik.errors)) {
                    formik.handleSubmit();
                  }
                }}
              />

              <AuthActivityWrapper mt={2} mb={8}>
                <CheckBox
                  disabled={false}
                  state={rememberMe}
                  label={'Remember me'}
                  color={AppTheme?.DefaultPalette()?.primary?.main}
                  onPress={() =>
                    setRememberMe(prev =>
                      prev === 'checked' ? 'unchecked' : 'checked',
                    )
                  }
                  uncheckedColor={AppTheme?.DefaultPalette()?.primary?.light}
                />
                {/*<Pressable*/}
                {/*  disabled={false}*/}
                {/*  style={styles.forgotPasswordButton}*/}
                {/*  onPress={() => navigation.navigate('ForgotPassword')}>*/}
                {/*  <AuthActivityLabel>Forgot your password?</AuthActivityLabel>*/}
                {/*</Pressable>*/}
              </AuthActivityWrapper>
            </AuthContainer>

            <UserActivityWrapper
              style={styles.buttonsWrapper}
              direction={'column'}
              alignItems={'flex-end'}
              justifyContent={'flex-end'}>
              <ButtonAction
                end={true}
                title={'Login'}
                titleWeight={'bold'}
                loading={isLoading === 'login_pending'}
                onPress={() => formik.handleSubmit()}
                border={AppTheme?.DefaultPalette()?.buttons?.primary}
                color={AppTheme?.DefaultPalette()?.buttons?.primary}
                labelColor={AppTheme.DefaultPalette().common.white}
                loadingColor={AppTheme.DefaultPalette().common.white}
                disabled={!isObjEmpty(formik.errors)}
              />
            </UserActivityWrapper>
          </LayoutModel>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
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

export {Login};
