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
      newLeftWidth < 25 ? 25 : newLeftWidth > 75 ? 75 : newLeftWidth;
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
  background-color: #e8edf6;
  height: 100vh;
  display: flex;
  padding: 16px;
  width: 100%;
  overflow: auto;
  overscroll-behavior: contain;
  -webkit-overflow-scrolling: touch;
`;

interface IResizer {
  resizerWidth: number;
}

const Resizer = styled.div<IResizer>`
  background-color: rebeccapurple;
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
