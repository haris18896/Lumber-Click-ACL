import React, {useState} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';

// ** Utils

import {hexToRgba} from '../../utils/utils';
import {theme as AppTheme} from '../../@core/infrustructure/theme';
import {permissions, ProtectedComponent} from '../../@core/auth/acl';

// ** Third Party Packages
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// ** Custom Components
import {
  JobCardUserWrapper,
  JobCardDetailWrapper,
  JobCardUserContainer,
} from '../../styles/components/JobCard';
import {TextItem} from '../../styles/typography';
import {ButtonAction} from '../buttons/ButtonAction';
import {ColumnStart, RowStart} from '../../styles/infrustucture';
import {JobsCardWrapper} from '../../styles/components/JobsPendingCard';

// ** SVGs
import CustomerSVG from '../../assets/svgs/customer.svg';
import SupplierSVG from '../../assets/svgs/supplier.svg';
import Chat from '../../assets/svgs/blueChat.svg';

const JobCard = props => {
  // ** Props
  const {item, role, onPressCard, isDropDownOpen, setIsDropDownOpen} = props;

  // ** Navigation
  const navigation = useNavigation();

  // ** States
  const [jobStatus, setJobStatus] = useState(item?.status.toLowerCase());

  // ** Constants
  const details = [
    {
      icon: <CustomerSVG width={AppTheme?.WP(5)} height={AppTheme?.WP(5)} />,
      title: 'Status',
      value: item?.status,
    },
    {
      icon: <SupplierSVG width={AppTheme?.WP(5)} height={AppTheme?.WP(5)} />,
      title: 'QC Rep',
      value: item?.QC,
    },
    {
      icon: <CustomerSVG width={AppTheme?.WP(5)} height={AppTheme?.WP(5)} />,
      title: 'Estimator',
      value: item?.estimator,
    },
    {
      icon: <SupplierSVG width={AppTheme?.WP(5)} height={AppTheme?.WP(5)} />,
      title: 'Payment By',
      value: item?.paymentBy,
    },
    {
      icon: <SupplierSVG width={AppTheme?.WP(5)} height={AppTheme?.WP(5)} />,
      title: 'Salesman',
      value: 'Mubeen Ajaz',
    },
  ];

  const items = [
    {label: 'Pending', value: 'pending'},
    {label: 'In-Progress', value: 'in-progress'},
    {label: 'Completed', value: 'completed'},
    {label: 'Cancelled', value: 'cancelled'},
  ];

  return (
    <JobsCardWrapper
      disabled={true}
      onPress={() => {}}
      direction={'column'}
      style={{paddingBottom: AppTheme?.WP(6)}}
      background={AppTheme?.DefaultPalette()?.card?.secondary}>
      <JobCardUserWrapper style={styles.JobCardUser}>
        {/*<JobCardIconWrapper>*/}
        <Icon
          name={'web'}
          color={AppTheme?.DefaultPalette()?.success?.main}
          size={AppTheme?.WP(6)}
        />
        <ColumnStart style={styles.JobUser}>
          <TextItem size={4.5}>{item?.company}</TextItem>
        </ColumnStart>

        <ProtectedComponent
          role={role}
          requiredPermission={permissions?.CAN_CHAT_WITH_JOB}>
          <TouchableOpacity
            style={{marginLeft: 'auto'}}
            onPress={() => navigation.navigate('Chat')}>
            <Chat width={AppTheme?.WP(5)} height={AppTheme?.WP(5)} />
          </TouchableOpacity>
        </ProtectedComponent>
      </JobCardUserWrapper>

      {/*<JobCardUserWrapper*/}
      {/*  style={[styles.jobDetails, {zIndex: 100}]}*/}
      {/*  justifyContent={'space-between'}>*/}
      {/*  <JobCardUserContainer width={'35%'}>*/}
      {/*    <TextItem size={4} color={AppTheme?.DefaultPalette()?.grey[800]}>*/}
      {/*      Status*/}
      {/*    </TextItem>*/}
      {/*  </JobCardUserContainer>*/}

      {/*  <JobCardUserContainer style={{zIndex: 10}} width={'65%'}>*/}
      {/*    <DropDown*/}
      {/*      data={items}*/}
      {/*      label={'Type'}*/}
      {/*      width={'100%'}*/}
      {/*      searchable={false}*/}
      {/*      open={isDropDownOpen === item?.id}*/}
      {/*      value={jobStatus}*/}
      {/*      setValue={setJobStatus}*/}
      {/*      placeholder={'Select Job Status...'}*/}
      {/*      setOpen={() =>*/}
      {/*        setIsDropDownOpen(prev => (prev === null ? item?.id : null))*/}
      {/*      }*/}
      {/*    />*/}
      {/*  </JobCardUserContainer>*/}
      {/*</JobCardUserWrapper>*/}

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

      <ProtectedComponent
        role={role}
        requiredPermission={permissions?.CAN_VIEW_BID_BUTTON}>
        <JobCardUserWrapper style={styles.jobDetails} justifyContent={'center'}>
          <JobCardUserContainer
            style={{marginTop: AppTheme?.WP(2)}}
            width={'65%'}>
            <ButtonAction
              end={true}
              title={'Bids'}
              titleWeight={'bold'}
              border={'transparent'}
              onPress={() => onPressCard()}
              color={hexToRgba(AppTheme?.DefaultPalette()?.primary?.main, 0.3)}
              labelColor={AppTheme.DefaultPalette().primary.main}
              loadingColor={AppTheme.DefaultPalette().primary.white}
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
  },
});
export {JobCard};
