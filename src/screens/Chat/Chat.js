import React from 'react';
import {View, StyleSheet, Platform} from 'react-native';

// **  Utils
import {theme as AppTheme} from '../../@core/infrustructure/theme';

// ** Third Party Components
import {useNavigation} from '@react-navigation/native';

// ** Custom Components
import {BarHeader} from '../../components';
import {TextItem} from '../../styles/typography';
import {LayoutModel} from '../../@core/layout/LayoutModel';

const Chat = () => {
  // ** navigation
  const navigation = useNavigation();

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
        <TextItem>Chat</TextItem>
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
});

export {Chat};
