import React from 'react';

import styled from '@emotion/styled';

interface IViewResizerRightCell {
  leftWidth?: number;
  resizerWidth?: number;
  resizeDetector?: boolean;
  children?: React.ReactNode;
}

const ViewResizerLeftCell: React.FC<IViewResizerRightCell> = ({
  leftWidth = 50,
  resizerWidth = 8,
  resizeDetector,
  children,
}) => {
  return (
    <Container style={{ width: `calc(${leftWidth}% - ${resizerWidth / 2}px)` }}>
      {children}
    </Container>
  );
};

export default ViewResizerLeftCell;

const Container = styled.div`
  display: flex;
  border: 2px solid rebeccapurple;
`;
