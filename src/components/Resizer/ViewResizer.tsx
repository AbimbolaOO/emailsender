import React, { useRef, useState } from 'react';

import styled from '@emotion/styled';

import ViewResizerLeftCell from './ViewResizerLeftCell';
import ViewResizerRightCell from './ViewResizerRightCell';

interface IViewResizer {
  children: React.ReactNode[];
}
const ViewResizer: React.FC<IViewResizer> = ({ children }) => {
  const [leftWidth, setLeftWidth] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const isResizing = useRef<boolean>(false);
  const [resizeDetector, setResizeDetector] = useState<Boolean>(false);

  const resizerWidth = 12;
  const lowerBounds = 20;
  const upperBounds = 80;

  const handleMouseDown = (e: any) => {
    isResizing.current = true;
    setResizeDetector(true);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleMouseMove = (e: any) => {
    if (!isResizing.current || !containerRef.current) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    let newLeftWidth =
      ((e.clientX - containerRect.left) / containerRect.width) * 100;
    newLeftWidth =
      newLeftWidth < lowerBounds
        ? lowerBounds
        : newLeftWidth > upperBounds
        ? upperBounds
        : newLeftWidth;
    setLeftWidth(newLeftWidth);
  };

  const handleMouseUp = () => {
    isResizing.current = false;
    setResizeDetector(false);
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  };
  return (
    <Container ref={containerRef}>
      {React.Children.map(children, (child: any) => {
        if (child.type === ViewResizerLeftCell) {
          return React.cloneElement(child, {
            ...child.props,
            leftWidth,
            resizeDetector,
            resizerWidth,
          });
        }
      })}
      <Resizer resizerWidth={12}>
        <Handle onMouseDown={handleMouseDown}>
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index}></div>
          ))}
        </Handle>
      </Resizer>
      {React.Children.map(children, (child: any) => {
        if (child.type === ViewResizerRightCell) {
          return React.cloneElement(child, {
            ...child.props,
            leftWidth,
            resizeDetector,
            resizerWidth,
          });
        }
      })}
    </Container>
  );
};

export default ViewResizer;

const Container = styled.div`
  background-color: ${({ theme }) => theme.palette.secondaryColor};
  height: calc(100vh - var(--header-height));
  display: flex;
  padding: 16px;
  width: 100%;
`;

interface IResizer {
  resizerWidth: number;
}

const Resizer = styled.div<IResizer>`
  background-color: ${({ theme }) => theme.palette.mainColor};
  width: ${({ resizerWidth }) => `${resizerWidth}px`};
  display: grid;
  place-content: center;

  & > * {
    cursor: col-resize;
  }
`;

const Handle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3px;
  width: 10px;
  height: fit-content;

  & > * {
    width: 10px;
    height: 8px;
    border-radius: 4px;
    background-color: white;
  }
`;
