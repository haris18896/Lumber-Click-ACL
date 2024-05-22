import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';

// ** Utils
import {theme as AppTheme} from '../../@core/infrustructure/theme';

// ** Third Party Packages
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// ** Custom Components
import {
  JobCardDetailWrapper,
  JobCardUserContainer,
  JobCardUserWrapper,
} from '../../styles/components/JobCard';
import {Avatar} from '../Avatar/Avatar';
import {TextItem} from '../../styles/typography';
import {ButtonAction} from '../buttons/ButtonAction';
import {ColumnStart, RowStart} from '../../styles/infrustucture';
import {JobsCardWrapper} from '../../styles/components/JobsPendingCard';
import {permissions, ProtectedComponent} from '../../@core/auth/acl';

const JobBiddingCard = props => {
  // ** props
  const {item, role, onPress} = props;

  // ** navigation
  const navigation = useNavigation();

  const details = [
    {
      id: 1,
      title: 'Bid',
      value: item?.bid ? `$${item?.bid}` : '',
    },
    {
      id: 2,
      title: 'Customer',
      value: item?.customer,
    },
  ];

  return (
    <JobsCardWrapper
      disabled={true}
      onPress={() => {}}
      direction={'column'}
      style={{paddingBottom: AppTheme?.WP(6)}}
      background={AppTheme?.DefaultPalette()?.card?.secondary}>
      <JobCardUserWrapper style={styles.JobCardUser}>
        <Avatar size={6.2} avatarSize={12} image={null} name={item?.name} />
        <ColumnStart style={styles.JobUser}>
          <TextItem size={4.5}>{item?.name}</TextItem>
          <RowStart>
            {[...Array(5)].map((_, index) => (
              <Icon
                key={index}
                name={index < item.rate ? 'star' : 'star-outline'}
                size={AppTheme?.WP(5)}
                color={index < item.rate ? 'gold' : 'gray'}
              />
            ))}
            <TouchableOpacity
              style={styles.viewProfileButton}
              onPress={() =>
                navigation.navigate('Profile', {
                  id: item?.id,
                  name: item?.name,
                })
              }>
              <TextItem size={3}>View Profile</TextItem>
            </TouchableOpacity>
          </RowStart>
        </ColumnStart>
      </JobCardUserWrapper>

      {details.map((data, index) => (
        <JobCardUserWrapper
          style={styles.jobDetails}
          key={index}
          justifyContent={'space-between'}>
          <JobCardUserContainer width={'45%'}>
            <RowStart>
              {data?.icon}
              <TextItem
                style={{marginHorizontal: AppTheme?.WP(2)}}
                size={4}
                color={AppTheme?.DefaultPalette()?.grey[800]}>
                {data?.title}
              </TextItem>
            </RowStart>
          </JobCardUserContainer>

          <JobCardUserContainer width={'55%'}>
            {data?.value && (
              <JobCardDetailWrapper>
                <TextItem
                  size={4}
                  style={styles.jobDetailValue}
                  color={AppTheme?.DefaultPalette()?.grey[800]}>
                  {data?.value}
                </TextItem>
              </JobCardDetailWrapper>
            )}
          </JobCardUserContainer>
        </JobCardUserWrapper>
      ))}

      <ProtectedComponent role={role} requiredPermission={permissions?.CAN_BID}>
        <JobCardUserWrapper style={styles.jobDetails} justifyContent={'center'}>
          <JobCardUserContainer
            style={{marginTop: AppTheme?.WP(2)}}
            width={'55%'}>
            <ButtonAction
              end={true}
              title={'Select'}
              border={'transparent'}
              onPress={() => onPress()}
              color={AppTheme?.DefaultPalette()?.success?.light}
              labelColor={AppTheme.DefaultPalette().success.main}
              loadingColor={AppTheme.DefaultPalette().success.white}
            />
          </JobCardUserContainer>
        </JobCardUserWrapper>
      </ProtectedComponent>
    </JobsCardWrapper>
  );
};

const styles = StyleSheet.create({
  JobUser: {
    marginLeft: AppTheme?.WP(2),
  },
  JobCardUser: {
    paddingBottom: AppTheme?.WP(1),
  },
  jobDetails: {
    paddingHorizontal: AppTheme?.WP(3),
    paddingTop: AppTheme?.WP(1.5),
  },
  jobDetailValue: {
    marginLeft: AppTheme?.WP(2),
    textAlign: 'left',
    width: '100%',
  },
  viewProfileButton: {
    paddingLeft: AppTheme?.WP(2),
  },
});
export {JobBiddingCard};
