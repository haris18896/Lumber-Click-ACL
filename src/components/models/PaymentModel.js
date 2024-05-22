import React, {forwardRef, useState} from 'react';
import {StyleSheet} from 'react-native';

// ** Utils
import {getErrorText} from '../../utils/utils';
import {theme as AppTheme} from '../../@core/infrustructure/theme';

// ** Third Party packages
import PropTypes from 'prop-types';
import {CardField} from '@stripe/stripe-react-native';

// ** Custom Components
import {ErrorText} from '../../styles/infrustucture';
import {BottomSheet} from '../../@core/components';

// ** Store && Actions
import {useDispatch} from 'react-redux';

const PaymentModel = forwardRef((props, ref) => {
  const {
    open,
    title,
    onClose,
    isLoading,
    cardError,
    handleSubmit,
    setCardError,
    height = 70,
  } = props;

  // ** Store
  const dispatch = useDispatch();

  // ** STATES
  const [card, setCard] = useState({});
  const [refreshing, setRefreshing] = useState('');

  const disabled =
    refreshing === 'update_payment_method' ||
    refreshing === 'Delete_card_loading';

  const DeletePaymentMethodAPICall = async () => {
    // setRefreshing('Delete_card_loading');
    console.log('delete card Payment...');
  };

  const UpdatePaymentMethodAPICall = async () => {
    // setRefreshing('update_payment_method');
    console.log('update Payment Method');
  };

  return (
    <BottomSheet
      ref={ref}
      title={title}
      visible={open}
      strictOpen={true}
      disabled={disabled}
      isLoading={isLoading || refreshing === 'update_payment_method'}
      height={AppTheme.WP(height)}
      submitText={'Add Payment Method'}
      onClose={() => {
        onClose();
      }}
      onSubmit={async () => {
        await handleSubmit({
          card,
        });
      }}>
      <CardField
        postalCodeEnabled={false}
        style={styles.cardField(cardError)}
        cardStyle={styles.cardStyle(cardError)}
        placeholders={{
          number: 'xxxx xxxx xxxx xxxx',
        }}
        onFocus={() => {
          setCardError(null);
        }}
        onCardChange={cardDetails => {
          const invalidKey = Object.keys(cardDetails).find(
            key => cardDetails[key] === 'Invalid',
          );
          if (invalidKey) {
            setCardError(invalidKey);
          } else {
            setCardError(null);
            setCard(cardDetails);
          }
        }}
      />

      {cardError && (
        <ErrorText size={3} style={styles.cardErrorText}>
          {getErrorText(cardError)}
        </ErrorText>
      )}
    </BottomSheet>
  );
});

PaymentModel.propTypes = {
  title: PropTypes.string,
  isLoading: PropTypes.bool,
  height: PropTypes.number,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  cardStyle: cardError => ({
    backgroundColor: '#FFFFFF',
    textColor: cardError
      ? AppTheme?.DefaultPalette()?.error?.main
      : AppTheme?.DefaultPalette()?.text?.primary,
  }),
  cardField: cardError => ({
    width: '100%',
    borderWidth: 1,
    height: AppTheme?.WP(5),
    marginVertical: AppTheme?.WP(3),
    borderRadius: AppTheme?.WP(2),
    paddingVertical: AppTheme?.WP(5),

    borderColor: cardError
      ? AppTheme?.DefaultPalette()?.error?.main
      : AppTheme?.DefaultPalette().borders.inputBorder,
  }),
  cardErrorText: {
    marginLeft: AppTheme?.WP(2),
    marginBottom: AppTheme?.WP(3),
  },
});

export {PaymentModel};
