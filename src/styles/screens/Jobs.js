import styled from 'styled-components';
import {TouchableOpacity, View} from 'react-native';

export const JobButtonContainer = styled(View)`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: ${props =>
    props?.justifyContent ? props?.justifyContent : 'space-between'};
`;

export const JobsButtonWrapper = styled(View)`
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  border-width: 1px;
  border-radius: ${props => props?.theme?.WP(2)}px;
  border-color: ${props => props?.theme?.DefaultPalette()?.primary?.main};
`;

export const JobButton = styled(TouchableOpacity)`
  background-color: ${props =>
    props?.active
      ? props?.theme?.DefaultPalette()?.secondary?.light
      : 'transparent'};
  padding-left: ${props => props?.theme?.WP(3)}px;
  padding-right: ${props => props?.theme?.WP(3)}px;
  padding-top: ${props => props?.theme?.WP(1.3)}px;
  padding-bottom: ${props => props?.theme?.WP(1.3)}px;
`;

export const SearchBar = styled(View)`
  padding-bottom: ${props => props?.theme?.WP(4)}px;
  padding-right: ${props => props?.theme?.WP(1)}px;
`;
