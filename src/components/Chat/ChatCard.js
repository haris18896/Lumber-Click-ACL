import React from 'react';

// ** Utils
import {
  theme as AppTheme,
  theme as Apptheme,
} from '../../@core/infrustructure/theme';

// ** Custom Components
import {
  ChatCardContainer,
  ChatCardDetails,
  ChatCardWrapper,
} from '../../styles/components/ChatCard';
import {Avatar} from '../Avatar/Avatar';
import {TextItem} from '../../styles/typography';
import {RowStart, UnReadDot} from '../../styles/infrustucture';

const ChatCard = ({read, image, name, recent, time}) => {
  return (
    <ChatCardWrapper>
      <ChatCardContainer unread={!read}>
        <Avatar size={6.2} avatarSize={15} image={image} name={name} />

        <ChatCardDetails>
          <TextItem
            size={4}
            weight={'semiBold'}
            family={'PoppinsSemiBold'}
            style={{marginBottom: AppTheme?.WP(1)}}
            color={AppTheme?.DefaultPalette()?.grey[800]}>
            {name}
          </TextItem>

          <TextItem
            size={3.5}
            weight={'regular'}
            family={'PoppinsRegular'}
            color={AppTheme?.DefaultPalette()?.grey[600]}>
            {recent}
          </TextItem>
        </ChatCardDetails>
        {!read && <UnReadDot />}
      </ChatCardContainer>
    </ChatCardWrapper>
  );
};
export {ChatCard};
