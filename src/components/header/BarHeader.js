import {TouchableOpacity, StyleSheet} from 'react-native';
import React, {useContext} from 'react';

// ** Utils
import {theme as AppTheme} from '../../@core/infrustructure/theme';

// ** Third Party Components
import {Badge} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';

// ** Custom Components
import {
  HeaderWrapper,
  IconCountWrapper,
  HeaderDetailWrapper,
  HeaderImage,
} from '../../styles/components';
import {appImages} from '../../assets';

// ** SVGs
import Bar from '../../assets/svgs/bar.svg';
import Chat from '../../assets/svgs/chat.svg';
import Bell from '../../assets/svgs/bell.svg';
import ChevronLeft from '../../assets/svgs/chevron-left.svg';
import {
  hasPermission,
  permissions,
  ProtectedComponent,
} from '../../@core/auth/acl';
import {AuthContext} from '../../@core/infrustructure/context/AuthContext';

const BarHeader = props => {
  // ** Props
  const {
    onBack,
    user,
    customStyles,
    onPressBar,
    backIconColor,
    showChat = true,
    showNotification = true,
  } = props;

  // ** navigation
  const navigation = useNavigation();

  // ** Context
  const {role} = useContext(AuthContext);

  return (
    <HeaderWrapper style={customStyles}>
      {onPressBar && (
        <TouchableOpacity
          style={styles.leftItem(backIconColor)}
          left={2}
          onPress={onPressBar}>
          <Bar width={AppTheme?.WP(6)} height={AppTheme?.WP(6)} />
        </TouchableOpacity>
      )}

      {onBack && (
        <TouchableOpacity
          style={styles.leftItem(backIconColor)}
          onPress={onBack}>
          <ChevronLeft width={AppTheme?.WP(6)} height={AppTheme?.WP(6)} />
        </TouchableOpacity>
      )}

      <HeaderDetailWrapper>
        <ProtectedComponent
          role={role}
          requiredPermission={permissions?.CAN_VIEW_MESSAGES}>
          <IconCountWrapper onPress={() => navigation.navigate('ChatHub')}>
            <Badge size={AppTheme?.WP(5)} style={styles.badge}>
              3
            </Badge>
            <Chat width={AppTheme?.WP(6)} height={AppTheme?.WP(6)} />
          </IconCountWrapper>
        </ProtectedComponent>

        <ProtectedComponent
          role={role}
          requiredPermission={permissions?.CAN_VIEW_NOTIFICATIONS}>
          <IconCountWrapper
            onPress={() => navigation.navigate('Notifications')}>
            <Badge size={AppTheme?.WP(5)} style={styles.badge}>
              4
            </Badge>
            <Bell width={AppTheme?.WP(6)} height={AppTheme?.WP(6)} />
          </IconCountWrapper>
        </ProtectedComponent>

        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          <HeaderImage
            width={user?.width}
            height={user?.height}
            source={appImages?.Logo}
            resizeMode={'cover'}
          />
        </TouchableOpacity>
      </HeaderDetailWrapper>
    </HeaderWrapper>
  );
};

const styles = StyleSheet.create({
  leftItem: backIconColor => ({
    zIndex: 2,
    borderRadius: AppTheme?.WP(1),
    backgroundColor: backIconColor
      ? AppTheme?.DefaultPalette()?.primary.main
      : 'transparent',
  }),
  badge: {
    position: 'absolute',
    zIndex: 2,
    top: AppTheme?.WP(-1),
    right: AppTheme?.WP(-1.5),
    backgroundColor: AppTheme?.DefaultPalette()?.error?.main,
  },
});

export {BarHeader};
