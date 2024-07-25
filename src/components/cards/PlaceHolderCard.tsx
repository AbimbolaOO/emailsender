import React from 'react';

import styled from '@emotion/styled';

import LogoIcon from '../icons/LogoIcon';

interface IPlaceHolderCard {
  //   children: React.ReactNode;
}

const PlaceHolderCard: React.FC<IPlaceHolderCard> = () => {
  return (
    <Container>
      <LogoIcon />
    </Container>
  );
};

export default PlaceHolderCard;

const Container = styled.div`
  display: grid;
  place-content: center;
  background-color: #e8edf6;
  height: 100%;
`;
