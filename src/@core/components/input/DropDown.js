import React from 'react';
import {StyleSheet} from 'react-native';

// ** Utils
import {theme as AppTheme} from '../../infrustructure/theme';

// ** Third party packages
import PropTypes from 'prop-types';
import DropDownPicker from 'react-native-dropdown-picker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// ** Custom Components
import {InputLabel, TextInputWrapper} from '../../../styles/components';

const DropDown = props => {
  const {
    title,
    data,
    width,
    open,
    value,
    setOpen,
    setValue,
    styleData,
    placeholder,
    customStyles,
    boxTop = 11,
    theme = 'LIGHT',
    searchable = true,
    showArrowIcon = true,
  } = props;

  return (
    <TextInputWrapper width={width}>
      {title && (
        <InputLabel labelStyles={styleData?.labelStyles}>{title}</InputLabel>
      )}
      <DropDownPicker
        items={data}
        open={open}
        zIndex={1000}
        value={value}
        theme={theme}
        setOpen={setOpen}
        setValue={setValue}
        searchable={searchable}
        dropDownDirection={'AUTO'}
        bottomOffset={100}
        style={[customStyles, styles.dropdown()]}
        placeholder={placeholder}
        showArrowIcon={showArrowIcon}
        labelStyle={styles.labelStyle}
        searchPlaceholder={'Search...'}
        containerStyle={styles.containerStyle(width)}
        dropDownContainerStyle={styles.dropDownContainerStyle(boxTop)}
        searchContainerStyle={styles.searchContainerStyle}
        searchTextInputStyle={styles.searchTextInputStyle}
        placeholderStyle={styles.placeholderStyle}
        searchPlaceholderTextColor={AppTheme?.DefaultPalette()?.grey[600]}
        TickIconComponent={({styles}) => (
          <Icon
            name={'check'}
            size={AppTheme?.WP(5)}
            color={AppTheme?.DefaultPalette().success?.main}
          />
        )}
      />
    </TextInputWrapper>
  );
};

DropDown.propTypes = {
  width: PropTypes.any,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  setValue: PropTypes.func.isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  theme: PropTypes.string,
  styleData: PropTypes.object,
  showArrowIcon: PropTypes.bool,
};

const styles = StyleSheet.create({
  containerStyle: width => ({
    borderColor: AppTheme?.DefaultPalette().borders?.inputBorder,
  }),
  dropdown: () => ({
    borderColor: AppTheme?.DefaultPalette().borders?.inputBorder,
    width: '100%',
    minHeight: AppTheme?.WP(8),
  }),
  labelStyle: {
    fontFamily: AppTheme?.fonts?.PoppinsMedium,
    fontSize: AppTheme?.WP(3),
    fontWeight: AppTheme?.fontWeights?.medium,
    color: AppTheme?.DefaultPalette()?.text.primary,
  },
  textStyle: {
    fontFamily: AppTheme?.fonts?.PoppinsMedium,
    fontSize: AppTheme?.WP(3),
    fontWeight: AppTheme?.fontWeights?.medium,
    color: AppTheme?.DefaultPalette()?.text.primary,
  },
  placeholderStyle: {
    fontFamily: AppTheme?.fonts?.PoppinsMedium,
    fontSize: AppTheme?.WP(3),
    fontWeight: AppTheme?.fontWeights?.medium,
    color: AppTheme?.DefaultPalette()?.grey[600],
  },
  searchContainerStyle: {
    borderBottomColor: 'transparent',
  },
  searchTextInputStyle: {
    borderWidth: 1,
    borderColor: AppTheme?.DefaultPalette().borders?.inputBorder,
    color: AppTheme?.DefaultPalette().grey[800],
    fontSize: AppTheme?.WP(3),
    fontFamily: AppTheme?.fonts?.PoppinsMedium,
  },
  dropDownContainerStyle: boxTop => ({
    borderColor: AppTheme?.DefaultPalette()?.borders?.inputBorder,
    zIndex: 2000,
  }),
});
export {DropDown};
