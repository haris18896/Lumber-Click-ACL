import {View, Text} from 'react-native';
import React from 'react';
import {
  AvatarImage,
  UserAvatarName,
  UserAvatarNameText,
  UserAvatarWrapper,
} from '../../styles/components/Avatar';
import {appImages} from '../../assets';

const Avatar = props => {
  // ** props
  const {avatarSize, image, name, size} = props;

  return (
    <UserAvatarWrapper size={avatarSize}>
      {image ? (
        <AvatarImage source={image ? image : appImages?.Logo} />
      ) : (
        <UserAvatarName>
          <UserAvatarNameText size={size}>{`${name
            .trim()[0]
            .toUpperCase()}${name
            .trim()[1]
            .toUpperCase()}`}</UserAvatarNameText>
        </UserAvatarName>
      )}
    </UserAvatarWrapper>
  );
};
export {Avatar};
