import React, {Fragment, useState} from 'react';
import {View, StyleSheet, FlatList, Platform} from 'react-native';

// **  Utils
import {theme as AppTheme} from '../../@core/infrustructure/theme';

// ** Third Party Components
import {useNavigation} from '@react-navigation/native';

// ** Custom Components
import {LayoutModel} from '../../@core/layout/LayoutModel';
import {Empty, HeadingDetails} from '../../@core/components';
import {BarHeader, JobOverViewCard, JobPendingCard} from '../../components';

// ** Store && Actions
import {useDispatch} from 'react-redux';

// ** Dummy
import {jobs} from '../../utils/dummy';

const Dashboard = () => {
  // ** navigation
  const navigation = useNavigation();

  // ** Store
  const dispatch = useDispatch();

  // ** States
  const [isLoading, setIsLoading] = useState('');

  // ** Constants
  const jobsLength = jobs.length || 0;

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
      <LayoutModel>
        <View style={styles.layoutModel}>
          <FlatList
            data={jobs}
            style={styles.flatList}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false}
            refreshing={isLoading === 'refreshing'}
            onRefresh={() => console.log('refreshing...')}
            contentContainerStyle={styles.flatListContainer(jobs.length)}
            ListEmptyComponent={
              <Empty height={35} title={'No JobCards Available'} />
            }
            ListHeaderComponent={
              <Fragment key={0}>
                <HeadingDetails
                  justifyContent={'flex-start'}
                  heading={'JobCards Pending Info'}
                  description={''}
                  details={{
                    heading: {
                      size: '6.5',
                      color: AppTheme?.DefaultPalette()?.text?.title,
                    },

                    customStyles: {
                      heading: {
                        marginBottom: AppTheme?.WP(2),
                        width: '100%',
                        paddingHorizontal: AppTheme?.WP(2),
                      },
                    },
                  }}
                />
                <JobOverViewCard
                  completed={367}
                  inProgress={18}
                  jobPercentage={83}
                  title={'Job Overview'}
                />
              </Fragment>
            }
            renderItem={({item}) => (
              <JobPendingCard
                item={item}
                onPressCard={() => console.log(item)}
              />
            )}
          />
        </View>
      </LayoutModel>
    </View>
  );
};

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    paddingTop: Platform?.OS === 'ios' ? AppTheme?.WP(14) : AppTheme?.WP(4),
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

export {Dashboard};
