import React from 'react';

// ** Utils
import {navigateTo} from '../utils';
import {resizeMode} from '../../utils/constants';
import {getAllowedRoutes, permissions} from '../../@core/auth/acl';
import {theme as AppTheme} from '../../@core/infrustructure/theme';

// ** Third Party Packages
import {DrawerActions} from '@react-navigation/native';

// ** Custom Components
import {
  UserDetail,
  MenuItemText,
  DrawerFooter,
  DrawerWrapper,
  UserDetailWrapper,
  MenuItemComponent,
  DrawerListWrapper,
  DrawerAvatarWrapper,
  DrawerAvatarContainer,
  DrawerLogout,
} from '../../styles/components';
import {appImages} from '../../assets';
import {TextItem} from '../../styles/typography';
import {LogoComponent} from '../../@core/components/logo';
import {ProfileImage, ProfileImageWrapper} from '../../styles/screens';

// ** Store && Actions
import {useSelector} from 'react-redux';

// ** SVGs
import Jobs from '../../assets/svgs/jobs.svg';
import Home from '../../assets/svgs/home_tab.svg';
import Logout from '../../assets/svgs/logout.svg';

const SideMenu = ({state, navigation, role}) => {
  // ** Store
  const {userMe} = useSelector(data => data?.auth);

  const onClose = () => {
    navigation.dispatch(DrawerActions.closeDrawer());
  };

  const gotoProfileScreen = () => {
    onClose();
    navigation.navigate('Profile');
  };

  const menu = [
    {
      id: 1,
      name: 'Dashboard',
      screen: 'Dashboard',
      permission: permissions.CAN_VIEW_DASHBOARD_PAGE,
      icon: <Home width={AppTheme?.WP(6)} height={AppTheme?.WP(6)} />,
      iconActive: <Home width={AppTheme?.WP(6)} height={AppTheme?.WP(6)} />,
      list: ['Dashboard', 'MyDrawer', 'BottomTab'],
    },

    {
      id: 2,
      name: 'Jobs',
      screen: 'Jobs',
      permission: permissions.CAN_VIEW_JOBS_PAGE,
      icon: <Jobs width={AppTheme?.WP(6)} height={AppTheme?.WP(6)} />,
      iconActive: <Jobs width={AppTheme?.WP(6)} height={AppTheme?.WP(6)} />,
      list: ['Jobs', 'JobBidding'],
    },
  ];

  const allowedRoutes = getAllowedRoutes(role, menu);

  return (
    <DrawerWrapper>
      <LogoComponent
        padding={{left: 6, right: 6}}
        alignItems={'flex-start'}
        height={22}
        width={22}
        margin={{top: 2, bottom: 2}}
      />
      {allowedRoutes.length > 0 && (
        <DrawerListWrapper
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}>
          {allowedRoutes.map((item, index) => {
            const isActive = item.list.includes(state.routes[state.index].name);
            return (
              <MenuItemComponent
                key={index}
                active={isActive}
                onPress={() =>
                  navigation.navigate('Drawer', {screen: item?.screen})
                }>
                {isActive ? item?.iconActive : item?.icon}
                <MenuItemText active={isActive} fontWeight={400}>
                  {item?.name}
                </MenuItemText>
              </MenuItemComponent>
            );
          })}
        </DrawerListWrapper>
      )}

      <DrawerFooter>
        <DrawerLogout onPress={() => navigateTo('Auth')}>
          <Logout width={AppTheme?.WP(6)} height={AppTheme?.WP(7)} />
          <TextItem
            style={{marginLeft: AppTheme?.WP(2)}}
            color={'white'}
            weight={'semiBold'}
            size={4.5}>
            Logout
          </TextItem>
        </DrawerLogout>

        <DrawerAvatarWrapper onPress={gotoProfileScreen}>
          <DrawerAvatarContainer>
            <ProfileImageWrapper
              bg={AppTheme?.DefaultPalette()?.grey[50]}
              size={{width: 14, height: 14}}>
              <ProfileImage source={appImages?.Logo} resizeMode={resizeMode} />
            </ProfileImageWrapper>

            <UserDetailWrapper>
              <UserDetail marginBottom={0.5}>
                <TextItem weight={'semiBold'} size={4} color={'white'}>
                  Haris Ahmad Khan
                </TextItem>
              </UserDetail>
              <UserDetail>
                <TextItem weight={'semiBold'} size={4} color={'white'}>
                  Supplier
                </TextItem>
              </UserDetail>
            </UserDetailWrapper>
          </DrawerAvatarContainer>
        </DrawerAvatarWrapper>
      </DrawerFooter>
    </DrawerWrapper>
  );
};
export default SideMenu;
