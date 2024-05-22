import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  FlatList,
} from 'react-native';

// **  Utils
import {theme as AppTheme} from '../../@core/infrustructure/theme';

// ** Third Party Components
import {useNavigation} from '@react-navigation/native';

// ** Custom Components
import {
  JobButton,
  JobsButtonWrapper,
  JobButtonContainer,
} from '../../styles/screens/Jobs';
import {TextItem} from '../../styles/typography';
import {BarHeader, NotificationCard} from '../../components';
import {Empty, HeadingDetails} from '../../@core/components';
import {LayoutModel} from '../../@core/layout/LayoutModel';

// ** Store && Actions
import {useDispatch} from 'react-redux';

// ** Dummy
import {notificationsArray} from '../../utils/dummy';

const Notifications = () => {
  // ** navigation
  const navigation = useNavigation();

  // ** Store
  const dispatch = useDispatch();

  // ** States
  const [unread, setUnread] = useState('All');
  const [isLoading, setIsLoading] = useState('');
  const [notifications, setNotifications] = useState(notificationsArray);

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
            <HeadingDetails
              justifyContent={'flex-start'}
              heading={`Notifications`}
              description={''}
              details={{
                heading: styles.headingMain,
                customStyles: {
                  heading: styles.customStyles?.heading,
                },
              }}
            />

            <JobButtonContainer
              style={styles.unReadButtons}
              justifyContent={'flex-start'}>
              <JobsButtonWrapper>
                <JobButton
                  style={{
                    borderRightWidth: 1.3,
                    borderColor: AppTheme?.DefaultPalette()?.primary?.main,
                  }}
                  active={unread === 'All'}
                  onPress={() => {
                    setUnread('All');
                    setNotifications(notificationsArray);
                  }}>
                  <TextItem
                    size={3.5}
                    color={
                      unread === 'All' &&
                      AppTheme?.DefaultPalette()?.primary?.main
                    }>
                    All
                  </TextItem>
                </JobButton>
                <JobButton
                  active={unread === 'unread'}
                  onPress={() => {
                    setUnread('unread');
                    const _notifications = notificationsArray.filter(
                      item => item?.read === false,
                    );
                    setNotifications(_notifications);
                  }}>
                  <TextItem
                    size={3.5}
                    color={
                      unread === 'unread' &&
                      AppTheme?.DefaultPalette()?.primary?.main
                    }>
                    Unread
                  </TextItem>
                </JobButton>
              </JobsButtonWrapper>
            </JobButtonContainer>

            <FlatList
              data={notifications}
              style={styles.flatList}
              keyExtractor={item => item.id}
              showsVerticalScrollIndicator={false}
              refreshing={isLoading === 'refreshing'}
              onRefresh={() => console.log('refreshing...')}
              contentContainerStyle={styles.flatListContainer(
                notifications?.length,
              )}
              ListEmptyComponent={
                <Empty height={35} title={'No Notifications are Available'} />
              }
              renderItem={({item}) => (
                <NotificationCard
                  read={item?.read}
                  icon={item?.icon}
                  title={item?.title}
                  iconColor={item?.iconColor}
                  description={item?.description}
                  onPress={() =>
                    console.log('notification card pressed...', item)
                  }
                />
              )}
            />
          </LayoutModel>
        </View>
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
  headingMain: {
    size: '6.5',
    color: AppTheme?.DefaultPalette()?.text?.title,
  },
  customStyles: {
    heading: {
      marginBottom: AppTheme?.WP(1),
      width: '100%',
      paddingHorizontal: AppTheme?.WP(2),
    },
  },
  flatList: {
    flex: 1,
    width: '100%',
    paddingBottom: AppTheme?.WP(10),
  },
  flatListContainer: length => ({
    marginTop: AppTheme?.WP(4),
    flexDirection: 'column',
    justifyContent: length === 0 ? 'center' : 'flex-start',
  }),
  unReadButtons: {
    paddingLeft: AppTheme?.WP(2),
  },
});

export {Notifications};
