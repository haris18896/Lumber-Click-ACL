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
  JobButtonContainer,
  JobsButtonWrapper,
} from '../../styles/screens/Jobs';
import {TextItem} from '../../styles/typography';
import {BarHeader, ChatCard} from '../../components';
import {LayoutModel} from '../../@core/layout/LayoutModel';
import {Empty, HeadingDetails} from '../../@core/components';

// ** Store && Actions
import {useDispatch} from 'react-redux';

// ** Dummy
import {chatsArray} from '../../utils/dummy';

const ChatHub = () => {
  // ** navigation
  const navigation = useNavigation();

  // ** Store
  const dispatch = useDispatch();

  // ** States
  const [unread, setUnread] = useState('All');
  const [isLoading, setIsLoading] = useState('');
  const [chats, setChats] = useState(chatsArray);

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
              heading={`Chat`}
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
                    setChats(chatsArray);
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
                    const _chats = chats.filter(item => item?.read === false);
                    setChats(_chats);
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
              data={chats}
              style={styles.flatList}
              keyExtractor={item => item.id}
              showsVerticalScrollIndicator={false}
              refreshing={isLoading === 'refreshing'}
              onRefresh={() => console.log('refreshing...')}
              contentContainerStyle={styles.flatListContainer(chats?.length)}
              ListEmptyComponent={
                <Empty height={35} title={'No Notifications are Available'} />
              }
              renderItem={({item}) => (
                <ChatCard
                  read={item?.read}
                  image={item?.image}
                  name={item?.userName}
                  time={item?.time}
                  recent={item?.recentMessage}
                  onPress={() => navigation.navigate('Chat')}
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

export {ChatHub};
