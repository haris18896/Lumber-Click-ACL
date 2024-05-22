import React, {useState, useMemo, useRef, useContext} from 'react';
import {
  View,
  FlatList,
  Platform,
  Keyboard,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';

// **  Utils
import {theme as AppTheme} from '../../@core/infrustructure/theme';

// ** Third Party Components
import _ from 'lodash';
import {useNavigation} from '@react-navigation/native';

// ** Custom Components
import {
  SearchBar,
  JobButton,
  JobButtonContainer,
  JobsButtonWrapper,
} from '../../styles/screens/Jobs';
import {TextItem} from '../../styles/typography';
import {JobCard, BarHeader} from '../../components';
import {LayoutModel} from '../../@core/layout/LayoutModel';
import {Empty, HeadingDetails, TextInput} from '../../@core/components';

// ** Store && Actions
import {useDispatch} from 'react-redux';
import {AuthContext} from '../../@core/infrustructure/context/AuthContext';

// ** Dummy
import {currentJobs, pastJobs} from '../../utils/dummy';

const Jobs = () => {
  // ** navigation
  const navigation = useNavigation();

  // ** Context
  const {role} = useContext(AuthContext);

  // ** Refs
  const search_ref = useRef(null);

  // ** Store
  const dispatch = useDispatch();

  // ** States
  const [search, setSearch] = useState(null);
  const [model, setModel] = useState('');
  const [job, setJob] = useState('current');
  const [isLoading, setIsLoading] = useState('');
  const [isDropDownOpen, setIsDropDownOpen] = useState(null);

  // ** Constants
  const jobsLength = job === 'current' ? currentJobs.length : pastJobs.length;

  const handleSearch = useMemo(() => {
    return _.debounce(searchTerm => {
      setIsLoading('searching');
      console.log('call the api here...', search);
      setIsLoading('');
    }, 1000);
  }, []);

  return (
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

      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <LayoutModel>
          <View style={styles.layoutModel}>
            <HeadingDetails
              justifyContent={'flex-start'}
              heading={'Jobs'}
              description={''}
              details={{
                heading: {
                  size: 6.5,
                  color: AppTheme?.DefaultPalette()?.text?.title,
                },

                customStyles: {
                  heading: {
                    marginBottom: AppTheme?.WP(1),
                    width: '100%',
                    paddingHorizontal: AppTheme?.WP(2),
                  },
                },
              }}
            />

            <JobButtonContainer justifyContent={'flex-end'}>
              <JobsButtonWrapper>
                <JobButton
                  style={{
                    borderRightWidth: 1.3,
                    borderColor: AppTheme?.DefaultPalette()?.primary?.main,
                  }}
                  active={job === 'current'}
                  onPress={() => setJob('current')}>
                  <TextItem
                    size={3.5}
                    color={
                      job === 'current' &&
                      AppTheme?.DefaultPalette()?.primary?.main
                    }>
                    Current
                  </TextItem>
                </JobButton>
                <JobButton
                  active={job === 'past'}
                  onPress={() => setJob('past')}>
                  <TextItem
                    size={3.5}
                    color={
                      job === 'past' &&
                      AppTheme?.DefaultPalette()?.primary?.main
                    }>
                    Past
                  </TextItem>
                </JobButton>
              </JobsButtonWrapper>

              {/*<TouchableOpacity onPress={() => setModel('add_new_job')}>*/}
              {/*  <TextItem*/}
              {/*    size={3.5}*/}
              {/*    color={AppTheme?.DefaultPalette()?.primary?.main}>*/}
              {/*    Add New Job*/}
              {/*  </TextItem>*/}
              {/*</TouchableOpacity>*/}
            </JobButtonContainer>

            <SearchBar>
              <TextInput
                value={search}
                ref={search_ref}
                multiline={false}
                variant={'outlined'}
                inputMode={'text'}
                rightIcon={'magnify'}
                disabled={!!isLoading}
                returnKeyType={'done'}
                secureTextEntry={false}
                placeholderColor={AppTheme?.DefaultPalette()?.text?.primary}
                placeholder={'Search Keyword...'}
                onChangeText={text => {
                  setSearch(text);
                  handleSearch(text);
                }}
                submit={() => {}}
              />
            </SearchBar>

            <FlatList
              style={styles.flatList}
              keyExtractor={item => item.id}
              scrollEnabled={!isDropDownOpen}
              showsVerticalScrollIndicator={false}
              refreshing={isLoading === 'refreshing'}
              onRefresh={() => console.log('refreshing...')}
              data={job === 'current' ? currentJobs : pastJobs}
              contentContainerStyle={styles.flatListContainer(jobsLength)}
              ListEmptyComponent={
                <Empty height={35} title={`No ${job} jobs are available`} />
              }
              renderItem={({item}) => (
                <JobCard
                  role={role}
                  item={item}
                  isDropDownOpen={isDropDownOpen}
                  setIsDropDownOpen={setIsDropDownOpen}
                  onPressCard={() =>
                    navigation.navigate('JobBidding', {company: item?.company})
                  }
                />
              )}
            />
          </View>
        </LayoutModel>
      </TouchableWithoutFeedback>

      {/* Models */}
      {/*<InitiateJobModel*/}
      {/*  title={'Initiate Job'}*/}
      {/*  visible={['add_new_job'].includes(model)}*/}
      {/*  onCancel={() => setModel('')}*/}
      {/*  onConfirm={({jobTitle, paymentBy}) => {*/}
      {/*    console.log('confirm', jobTitle, paymentBy);*/}
      {/*    setModel('job_submission');*/}
      {/*  }}*/}
      {/*/>*/}

      {/*<JobSubmissionModal*/}
      {/*  title={'Job Name'}*/}
      {/*  visible={['job_submission'].includes(model)}*/}
      {/*  onCancel={() => setModel('')}*/}
      {/*  onConfirm={({description, attachment}) => {*/}
      {/*    console.log('confirm', description, attachment);*/}
      {/*    setModel('');*/}
      {/*  }}*/}
      {/*/>*/}
    </View>
  );
};

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    paddingTop: Platform?.OS === 'ios' ? AppTheme?.WP(14) : AppTheme?.WP(3),
    backgroundColor: AppTheme?.DefaultPalette()?.primary?.main,
  },
  layoutModel: {
    flex: 1,
    width: '100%',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    paddingHorizontal: AppTheme?.WP(4),
  },
  flatListContainer: length => ({
    flexDirection: 'column',
    justifyContent: length === 0 ? 'center' : 'flex-start',
  }),
  flatList: {
    flex: 1,
    width: '100%',
    paddingBottom: AppTheme?.WP(10),
  },
});

export {Jobs};
