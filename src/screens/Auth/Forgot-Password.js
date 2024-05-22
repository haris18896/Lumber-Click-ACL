import React, {useRef, useState} from 'react';
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
import {
  formatUSAPhoneNumber,
  FormikValuesChanged,
  isObjEmpty,
} from '../../utils/utils';
import {theme as AppTheme} from '../../@core/infrustructure/theme';

// ** Third Party Packages
import * as Yup from 'yup';
import {useFormik} from 'formik';
import {useNavigation} from '@react-navigation/native';

// ** Custom Components
import {LogoComponent} from '../../@core/components/logo';
import {LayoutModel} from '../../@core/layout/LayoutModel';
import {HeadingDetails, TextInput} from '../../@core/components';
import {AuthContainer, UserActivityWrapper} from '../../styles/screens';

// ** Store && Actions
import {useDispatch} from 'react-redux';
import {ButtonAction} from '../../components';
import {BackButton} from '../../components/buttons/BackButton';

const ForgotPassword = () => {
  // ** Refs
  const email_ref = useRef(null);

  // ** Navigation
  const navigation = useNavigation();

  // ** Store
  const dispatch = useDispatch();

  // ** States
  const [isLoading, setIsLoading] = useState('');

  // ** Schema
  const schema = Yup.object().shape({
    email: Yup.string().email().required('Email is a required field'),
  });

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    enableReinitialize: true,
    validationSchema: schema,
    onSubmit: async values => {
      if (isObjEmpty(formik.errors)) {
        console.log('ForgotPassword Values...', values);
        navigation.navigate('ResetPassword');
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
                heading={'Forgot Password'}
                description={
                  'Enter your email to receive a reset password email'
                }
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
                ref={email_ref}
                multiline={false}
                disabled={false}
                leftIcon={'email'}
                title={'Email'}
                variant={'outlined'}
                inputMode={'email'}
                returnKeyType={'done'}
                styleData={{
                  labelStyles: {
                    weight: 'medium',
                    color: AppTheme?.DefaultPalette()?.text?.title,
                  },
                }}
                secureTextEntry={false}
                value={formik.values.email}
                placeholder={'Enter your email'}
                formikError={formik.errors?.email}
                formikTouched={formik.touched.email}
                placeholderColor={AppTheme?.DefaultPalette()?.text?.primary}
                onChangeText={text => formik.setFieldValue('email', text)}
                onBlur={() => formik.setFieldTouched('email', true)}
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

export {ForgotPassword};
