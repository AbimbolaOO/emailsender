import React from 'react';

import styled from '@emotion/styled';

import LogoIcon from '../Icons/LogoIcon';

interface IPlaceHolderCard {
  //   children: React.ReactNode;
  className?: string;
}

const PlaceHolderCard: React.FC<IPlaceHolderCard> = ({ className }) => {
  return (
    <Container className={className}>
      <LogoIcon />
    </Container>
  );
};

export default PlaceHolderCard;

const Container = styled.div`
  display: grid;
  place-content: center;
  background-color: ${({ theme }) => theme.palette.secondaryColor};
  height: 100%;

  &.purple-bg {
    background-color: ${({ theme }) => theme.palette.mainColor};
  }
`;
