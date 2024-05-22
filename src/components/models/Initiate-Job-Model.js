import React, {useRef, useState} from 'react';
import {StyleSheet} from 'react-native';

// ** Utils
import {theme as AppTheme} from '../../@core/infrustructure/theme';

// ** Third Party
import PropTypes from 'prop-types';

// ** Custom Components
import {ModalView, TextInput, CheckBox} from '../../@core/components';
import {ColumnStart, RowEnd, RowStart} from '../../styles/infrustucture';
import {UserActivityWrapper} from '../../styles/screens';
import {TextItem} from '../../styles/typography';
import {SearchBar} from '../../styles/screens/Jobs';
import {ButtonAction} from '../buttons/ButtonAction';

const InitiateJobModel = ({title, visible, onCancel, onConfirm}) => {
  // ** States
  const [jobTitle, setJobTitle] = useState('');
  const [paymentBy, setPaymentBy] = useState('');

  // ** Refs
  const job_title_ref = useRef(null);

  return (
    <ModalView open={visible} title={title} toggleModal={onCancel}>
      <ColumnStart style={styles.jobTitle}>
        <SearchBar>
          <TextInput
            value={jobTitle}
            title={'Job Title'}
            ref={job_title_ref}
            multiline={false}
            variant={'outlined'}
            inputMode={'text'}
            rightIcon={'magnify'}
            returnKeyType={'done'}
            secureTextEntry={false}
            placeholder={'Job title here'}
            placeholderColor={AppTheme?.DefaultPalette()?.text?.primary}
            onChangeText={text => {
              setJobTitle(text);
            }}
            styleData={{
              labelStyles: {
                weight: 'medium',
                family: 'PoppinsMedium',
                color: AppTheme?.DefaultPalette()?.text?.primary,
              },
            }}
            submit={() => onConfirm({jobTitle, paymentBy})}
          />
        </SearchBar>
      </ColumnStart>

      <TextItem size={3.5} color={AppTheme?.DefaultPalette()?.text?.primary}>
        Payment By:
      </TextItem>

      <RowStart>
        <CheckBox
          disabled={false}
          state={paymentBy === 'customer' ? 'checked' : 'unchecked'}
          label={'Customer'}
          color={AppTheme?.DefaultPalette()?.primary?.main}
          onPress={() =>
            setPaymentBy(prev =>
              prev === 'customer' ? 'supplier' : 'customer',
            )
          }
          uncheckedColor={AppTheme?.DefaultPalette()?.primary?.light}
        />

        <CheckBox
          disabled={false}
          state={paymentBy === 'supplier' ? 'checked' : 'unchecked'}
          label={'Supplier'}
          color={AppTheme?.DefaultPalette()?.primary?.main}
          onPress={() =>
            setPaymentBy(prev =>
              prev === 'supplier' ? 'customer' : 'supplier',
            )
          }
          uncheckedColor={AppTheme?.DefaultPalette()?.primary?.light}
        />
      </RowStart>

      <RowEnd style={{marginTop: AppTheme?.WP(2)}}>
        <UserActivityWrapper width={'35%'}>
          <ButtonAction
            size={'small'}
            end={true}
            title={'Cancel'}
            onPress={onCancel}
            border={AppTheme.DefaultPalette().grey[500]}
            color={AppTheme.DefaultPalette().grey[500]}
            loadingColor={AppTheme.DefaultPalette().primary.contrastText}
            labelColor={AppTheme.DefaultPalette().primary.contrastText}
          />
        </UserActivityWrapper>

        <UserActivityWrapper
          width={'35%'}
          style={{marginLeft: AppTheme?.WP(2)}}>
          <ButtonAction
            end={true}
            size={'small'}
            title={'Initiate Job'}
            disabled={!paymentBy || !jobTitle}
            onPress={() => {
              onConfirm({jobTitle, paymentBy});
              setPaymentBy('');
              setJobTitle('');
            }}
            border={AppTheme.DefaultPalette().primary.main}
            color={AppTheme.DefaultPalette().primary.main}
            loadingColor={AppTheme.DefaultPalette().primary.contrastText}
            labelColor={AppTheme.DefaultPalette().primary.contrastText}
          />
        </UserActivityWrapper>
      </RowEnd>
    </ModalView>
  );
};

InitiateJobModel.propTypes = {
  visible: PropTypes.bool,
  title: PropTypes.string,
  onCancel: PropTypes.func,
  onConfirm: PropTypes.func,
};

const styles = StyleSheet.create({
  jobTitle: {
    marginTop: AppTheme?.WP(3),
  },
});

export {InitiateJobModel};
