import React, {useRef, useEffect, useState} from 'react';
import {
  View,
  Platform,
  Keyboard,
  StyleSheet,
  TouchableOpacity,
  PermissionsAndroid,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from 'react-native';

// **  Utils
import {
  showToast,
  isObjEmpty,
  formatUSAPhoneNumber,
  FormikValuesChanged,
} from '../../utils/utils';
import {CommonStyles} from '../../utils/CommonStyles';
import {theme as AppTheme} from '../../@core/infrustructure/theme';

// ** Third Party Components
import * as Yup from 'yup';
import {useFormik} from 'formik';
import {useStripe} from '@stripe/stripe-react-native';
import ImagePicker from 'react-native-image-crop-picker';
import {useNavigation, useRoute} from '@react-navigation/native';

// ** Custom Components
import {
  ProfileImage,
  AuthContainer,
  UserProfileWrapper,
  ProfileImageWrapper,
  UserActivityWrapper,
} from '../../styles/screens';
import {appImages} from '../../assets';
import {TextInput} from '../../@core/components';
import {TextItem} from '../../styles/typography';
import {ColumnStart} from '../../styles/infrustucture';
import {BarHeader, ButtonAction} from '../../components';
import {LayoutModel} from '../../@core/layout/LayoutModel';

// ** Store && Actions
import {useDispatch, useSelector} from 'react-redux';

// ** SVGs
import PencilCircle from '../../assets/svgs/pencil-circle.svg';
import {PaymentModel} from '../../components/models/PaymentModel';

const Profile = () => {
  // ** Params
  const route = useRoute();
  const biddingUserId = route?.params?.id || '';
  const biddingUserName = route?.params?.name || '';

  // && Stripe
  const stripe = useStripe();

  // ** Refs
  const email_ref = useRef(null);
  const contact_ref = useRef(null);
  const password_ref = useRef(null);
  const last_name_ref = useRef(null);
  const first_name_ref = useRef(null);
  const payment_model_ref = useRef(null);

  // ** navigation
  const navigation = useNavigation();

  // ** Store
  const dispatch = useDispatch();
  const {userMe} = useSelector(state => state?.auth);

  // ** States
  const [cardError, setCardError] = useState(null);
  const [model, setModel] = useState('');
  const [isLoading, setIsLoading] = useState('');
  const [currentUser, setCurrentUser] = useState(false);

  // ** Schema
  const schema = Yup.object().shape({
    firstName: Yup.string().required('First Name is required'),
    lastName: Yup.string().required('Last Name is required'),
    email: Yup.string().email().required('Email is a required field'),
    password: Yup.string().required('Password is a required field'),
    contact: Yup.string().required('Contact number is a required field'),
  });

  const formik = useFormik({
    initialValues: {
      firstName: 'Haris',
      lastName: 'Ahmad',
      email: 'haris@reporteq.com',
      password: 'ReporteQ',
      contact: '12567866122',
    },
    enableReinitialize: true,
    validationSchema: schema,
    onSubmit: async values => {
      if (isObjEmpty(formik.errors)) {
        console.log('Login Values...', values);
      }
    },
  });

  const isCurrentUser = () => {
    if (!biddingUserId || !biddingUserName) {
      setCurrentUser(true);
      if (Platform.OS === 'android') {
        (async () => {
          try {
            console.log('Asking for permission');
            const granted = await PermissionsAndroid.requestMultiple([
              PermissionsAndroid.PERMISSIONS.CAMERA,
              PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
            ]);

            if (
              granted['android.permission.CAMERA'] ===
                PermissionsAndroid.RESULTS.GRANTED &&
              granted['android.permission.WRITE_EXTERNAL_STORAGE'] ===
                PermissionsAndroid.RESULTS.GRANTED
            ) {
              console.log('You can use the camera');
              // Proceed with image selection or capture here
            } else {
              console.log('Camera permission denied');
            }
          } catch (error) {
            showToast({
              type: 'error',
              title: 'Permission Error',
              message: error.message,
            });
          }
        })();
      }
    } else {
      setCurrentUser(false);
    }
  };

  useEffect(() => {
    return navigation.addListener('focus', isCurrentUser);
  }, [navigation]);

  const handleSelectOrTakePhoto = async () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    })
      .then(image => {
        const file = {
          source: image?.path,
          uri: image?.sourceURL,
          type: image?.mime,
          name: image?.filename,
        };

        console.log('check image file...', file);
      })
      .catch(err => {
        showToast({
          title: 'Error in Image Uploading',
          message: err.message,
          type: 'error',
        });
      });
  };

  const handlePayment = async card => {
    setIsLoading('add_payment_method');
    try {
      const cardFormat = {
        type: 'Card',
        billingDetails: {
          email: userMe?.currentUser?.email,
        },
        cardDetails: {
          currency: 'USD',
          brand: card?.brand,
          last4: card?.last4,
          country: card?.country,
          funding: card?.funding,
          validCVC: card?.validCVC,
          complete: card?.complete,
          expiryYear: card?.expYear,
          expiryMonth: card?.expMonth,
          validNumber: card?.validNumber,
          validExpiryDate: card?.validExpiryDate,
        },
      };

      await stripe.createToken(cardFormat).then(res => {
        if (res?.error) {
          setCardError(res?.error);
          setIsLoading('');
        } else if (res?.token?.id) {
          console.log('card token...', res?.token?.id);
        } else {
          showToast({
            type: 'error',
            title: 'Error Adding Card',
            message: 'Card token is not valid!',
          });
        }
      });
    } catch (error) {
      setCardError(error);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{flex: 1}}>
        <View style={styles.MainContainer}>
          <BarHeader
            onPressBar={() => navigation.toggleDrawer()}
            user={{
              bg: AppTheme?.DefaultPalette()?.grey[100],
              marginBottom: 0,
              marginTop: 0,
              width: 11,
              height: 11,
            }}
          />
          <LayoutModel>
            <AuthContainer
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps={'handled'}
              justifyContent={'flex-start'}
              contentContainerStyle={styles.authContainer}>
              <UserProfileWrapper>
                <ProfileImageWrapper
                  marginBottom={2}
                  marginTop={2}
                  style={CommonStyles.shadow}>
                  <TouchableOpacity
                    style={styles.EditButton}
                    onPress={() => handleSelectOrTakePhoto()}>
                    <PencilCircle
                      width={AppTheme?.WP(8)}
                      height={AppTheme?.WP(8)}
                      color={AppTheme?.DefaultPalette()?.primary?.main}
                    />
                  </TouchableOpacity>
                  <ProfileImage source={appImages?.Logo} resizeMode={'cover'} />
                </ProfileImageWrapper>
                <TextItem
                  color={AppTheme?.DefaultPalette()?.text?.primary}
                  size={7}>
                  Haris Ahmad Khan
                </TextItem>
              </UserProfileWrapper>

              <TextInput
                ref={first_name_ref}
                multiline={false}
                disabled={!currentUser}
                leftIcon={'account'}
                title={'First Name'}
                variant={'outlined'}
                inputMode={'text'}
                returnKeyType={'next'}
                styleData={{
                  labelStyles: {
                    weight: 'medium',
                    color: AppTheme?.DefaultPalette()?.text?.title,
                  },
                }}
                secureTextEntry={false}
                value={formik.values.firstName}
                nextInputRef={last_name_ref}
                placeholder={'Enter your first name'}
                formikError={formik.errors?.firstName}
                formikTouched={formik.touched.firstName}
                placeholderColor={AppTheme?.DefaultPalette()?.text?.primary}
                onChangeText={text => formik.setFieldValue('firstName', text)}
                onBlur={() => formik.setFieldTouched('firstName', true)}
              />

              <TextInput
                ref={last_name_ref}
                multiline={false}
                disabled={!currentUser}
                leftIcon={'account'}
                title={'Last Name'}
                variant={'outlined'}
                inputMode={'text'}
                returnKeyType={'next'}
                styleData={{
                  labelStyles: {
                    weight: 'medium',
                    color: AppTheme?.DefaultPalette()?.text?.title,
                  },
                }}
                secureTextEntry={false}
                value={formik.values.lastName}
                nextInputRef={email_ref}
                placeholder={'Enter your last name'}
                formikError={formik.errors?.lastName}
                formikTouched={formik.touched.lastName}
                placeholderColor={AppTheme?.DefaultPalette()?.text?.primary}
                onChangeText={text => formik.setFieldValue('lastName', text)}
                onBlur={() => formik.setFieldTouched('lastName', true)}
              />

              <TextInput
                ref={email_ref}
                multiline={false}
                disabled={!currentUser}
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
                nextInputRef={contact_ref}
                placeholder={'Enter your email'}
                formikError={formik.errors?.email}
                formikTouched={formik.touched.email}
                placeholderColor={AppTheme?.DefaultPalette()?.text?.primary}
                onChangeText={text => formik.setFieldValue('email', text)}
                onBlur={() => formik.setFieldTouched('email', true)}
              />

              <TextInput
                maxLength={10}
                ref={contact_ref}
                multiline={false}
                disabled={!currentUser}
                leftIcon={'phone'}
                title={'Contact Number'}
                variant={'outlined'}
                inputMode={'decimal'}
                returnKeyType={'next'}
                styleData={{
                  labelStyles: {
                    weight: 'medium',
                    color: AppTheme?.DefaultPalette()?.text?.title,
                  },
                }}
                secureTextEntry={false}
                value={formik.values.contact}
                nextInputRef={password_ref}
                placeholder={'+1 234 867 1234'}
                formikError={formik.errors?.contact}
                formikTouched={formik.touched.contact}
                placeholderColor={AppTheme?.DefaultPalette()?.text?.primary}
                onChangeText={text => formik.setFieldValue('contact', text)}
                onBlur={() => {
                  formik.setFieldTouched('contact', true);
                  if (formik.values.contact.length >= 10) {
                    formik.setFieldValue(
                      'contact',
                      formatUSAPhoneNumber(formik.values.contact),
                    );
                  }
                }}
              />

              {currentUser && (
                <>
                  <TextInput
                    disabled={!currentUser}
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
                    onChangeText={text =>
                      formik.setFieldValue('password', text)
                    }
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
                  <ColumnStart style={styles.PaymentButton}>
                    <TextItem
                      size={3.4}
                      style={styles.PaymentButtonLabel}
                      color={AppTheme?.DefaultPalette()?.text?.title}>
                      Payment Method
                    </TextItem>
                    <ButtonAction
                      start={3}
                      radius={2}
                      title={'Add Payment Method'}
                      border={'transparent'}
                      icon={{
                        name: 'credit-card',
                        size: 6,
                        color: AppTheme?.DefaultPalette()?.success?.main,
                      }}
                      onPress={() => setModel('payment_model')}
                      color={AppTheme?.DefaultPalette()?.success?.light}
                      labelColor={AppTheme.DefaultPalette().success.main}
                      loadingColor={AppTheme.DefaultPalette().success.white}
                    />
                  </ColumnStart>
                </>
              )}
            </AuthContainer>

            {currentUser && (
              <UserActivityWrapper
                style={styles.buttonsWrapper}
                direction={'column'}
                alignItems={'flex-end'}
                justifyContent={'flex-end'}>
                <ButtonAction
                  end={true}
                  title={'Update'}
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
            )}
          </LayoutModel>
        </View>

        <PaymentModel
          ref={payment_model_ref}
          cardError={cardError}
          setCardError={setCardError}
          title={'Add Payment Method'}
          open={model === 'payment_model'}
          onClose={() => setModel('')}
          isLoading={['add_payment_method'].includes(isLoading)}
          handleSubmit={({card}) => handlePayment(card)}
        />
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    paddingTop: Platform?.OS === 'ios' ? AppTheme?.WP(14) : AppTheme?.WP(4),
    backgroundColor: AppTheme?.DefaultPalette()?.primary?.main,
  },
  authContainer: {
    paddingBottom: AppTheme?.WP(15),
  },
  EditButton: {
    zIndex: 10,
    position: 'absolute',
    borderRadius: AppTheme?.WP(10),
    width: AppTheme?.WP(8),
    height: AppTheme?.WP(8),
    bottom: 0,
    right: 0,
  },
  PaymentButton: {
    marginTop: AppTheme?.WP(2),
    marginBottom: AppTheme?.WP(1),
  },
  PaymentButtonLabel: {
    paddingBottom: AppTheme?.WP(1),
    paddingLeft: AppTheme?.WP(1),
  },
});

export {Profile};
