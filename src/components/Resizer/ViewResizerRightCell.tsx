import React from 'react';

import styled from '@emotion/styled';

import PlaceHolderCard from '../Card/PlaceHolderCard';

interface IViewResizerRightCell {
  leftWidth?: number;
  resizerWidth?: number;
  resizeDetector?: boolean;
  children?: React.ReactNode;
}

const ViewResizerRightCell: React.FC<IViewResizerRightCell> = ({
  leftWidth = 50,
  resizerWidth = 8,
  resizeDetector,
  children,
}) => {
  return (
    <Container
      style={{ width: `calc(${100 - leftWidth}% - ${resizerWidth / 2}px)` }}
    >
      {resizeDetector ? <PlaceHolderCard /> : children}
    </Container>
  );
};

export default ViewResizerRightCell;

const Container = styled.div`
  background-color: white;
  border: 2px solid ${({ theme }) => theme.palette.mainColor};
`;
