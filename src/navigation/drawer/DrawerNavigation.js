import React, {useContext} from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';

// ** Utils
import {theme as AppTheme} from '../../@core/infrustructure/theme';
import {getAllowedRoutes, permissions} from '../../@core/auth/acl';

// ** Custom Components
import SideMenu from './sideMenu';

// ** Screens
import {Jobs} from '../../screens/Jobs';
import {Profile} from '../../screens/Profile';
import {Chat, ChatHub} from '../../screens/Chat';
import {Dashboard} from '../../screens/Dashboard';
import {Notifications} from '../../screens/Notifications';
import {JobBidding} from '../../screens/Jobs/JobBidding';

// ** Context
import {AuthContext} from '../../@core/infrustructure/context/AuthContext';

const Drawer = createDrawerNavigator();

const routes = [
  {
    name: 'Dashboard',
    component: Dashboard,
    permission: permissions.CAN_VIEW_DASHBOARD_PAGE,
  },
  {
    name: 'Jobs',
    component: Jobs,
    permission: permissions.CAN_VIEW_JOBS_PAGE,
  },
  {
    name: 'Profile',
    component: Profile,
    permission: permissions.CAN_VIEW_PROFILE_PAGE,
  },
  {
    name: 'Notifications',
    component: Notifications,
    permission: permissions.CAN_VIEW_NOTIFICATION_PAGE,
  },
  {
    name: 'ChatHub',
    component: ChatHub,
    permission: permissions.CAN_VIEW_CHAT_HUB_PAGE,
  },
  {
    name: 'JobBidding',
    component: JobBidding,
    permission: permissions.CAN_VIEW_JOB_BIDDING_PAGE,
  },
  {
    name: 'Chat',
    component: Chat,
    permission: permissions.CAN_VIEW_CHAT_PAGE,
  },
];

export function MyDrawer() {
  const {role} = useContext(AuthContext);

  const allowedRoutes = getAllowedRoutes(role, routes);

  return (
    <Drawer.Navigator
      backBehavior={'history'}
      // initialRouteName={'Dashboard'}
      initialRouteName={`${allowedRoutes[0]?.name}`}
      drawerContent={props => <SideMenu role={role} {...props} />}
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          backgroundColor: AppTheme?.DefaultPalette()?.primary?.main,
          paddingVertical: AppTheme?.WP(5),
          width: AppTheme?.scrWidth / 1.3,
        },
      }}>
      {allowedRoutes.map((route, index) => (
        <Drawer.Screen
          key={index}
          name={route.name}
          component={route?.component}
        />
      ))}
    </Drawer.Navigator>
  );
}
