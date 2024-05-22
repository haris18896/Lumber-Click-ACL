/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, StatusBar, StyleSheet, Pressable, Platform} from 'react-native';

// ** Utils
import {navigateTo} from '../../navigation/utils';
import {theme as AppTheme} from '../infrustructure/theme';

// ** Third Party Packages
import {IconButton} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

// ** Custom Components
import {
  LayoutArea,
  LayoutContainer,
  SafeArea,
} from '../../styles/infrustucture/index';

// ** Store && Actions
import {useDispatch} from 'react-redux';
import {Logout} from '../../redux/Auth';

const LayoutModel = ({children, MT = 5, customStyles, showLogout, bg}) => {
  const dispatch = useDispatch();

  const handleLogout = async () => {
    dispatch(Logout());
    navigateTo('Auth');
    await AsyncStorage.removeItem('token');
  };

  return (
    <LayoutArea>
      <View style={styles.logoContainer}>
        {showLogout && (
          <View style={styles.logoutButton}>
            <IconButton
              icon="logout"
              size={AppTheme.WP(5)}
              onPress={handleLogout}
              iconColor={AppTheme.DefaultPalette().primary.contrastText}
            />
          </View>
        )}
      </View>
      <View style={[styles.layoutContainer(MT), customStyles]}>
        <StatusBar
          barStyle={Platform.OS === 'ios' ? 'light-content' : 'dark-content'}
          backgroundColor={'#fefefe'}
          translucent={false}
          hidden={false}
        />
        <SafeArea>
          <LayoutContainer bg={bg}>{children}</LayoutContainer>
        </SafeArea>
      </View>
    </LayoutArea>
  );
};

export {LayoutModel};

const styles = StyleSheet.create({
  layoutContainer: MT => ({
    flexGrow: 1,
    marginTop: AppTheme?.WP(MT),
    position: 'relative',
  }),
  logoContainer: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoutButton: {
    position: 'absolute',
    right: AppTheme.WP(0.5),
    top: AppTheme.WP(2.5),
    zIndex: 100,
  },
});
