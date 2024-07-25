import { useRef, useState } from 'react';

import styled from '@emotion/styled';

import LogoIcon from './components/icons/LogoIcon';

function App() {
  const [content, setContent] = useState();
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
    const newLeftWidth =
      ((e.clientX - containerRect.left) / containerRect.width) * 100;
    setLeftWidth(newLeftWidth);
  };

  const handleMouseUp = () => {
    isResizing.current = false;
    setResizeDetector(false);
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  };

  const onChange = (e: any) => {
    setContent(e.target.value);
  };

  return (
    <Container ref={containerRef}>
      <LeftCell
        style={{ width: `calc(${leftWidth}% - ${resizerWidth / 2}px)` }}
      >
        <TextArea onChange={onChange} value={content} />
      </LeftCell>
      <Resizer resizerWidth={12}>
        <Handle onMouseDown={handleMouseDown}></Handle>
      </Resizer>
      <RightCell
        style={{ width: `calc(${100 - leftWidth}% - ${resizerWidth / 2}px)` }}
      >
        {resizeDetector ? (
          <ResizerStatePlaceHolder>
            <LogoIcon />
          </ResizerStatePlaceHolder>
        ) : (
          <iframe
            frameBorder="0"
            srcDoc={content}
            sandbox="allow-scripts"
            width="100%"
            height="100%"
          />
        )}
      </RightCell>
    </Container>
  );
}

export default App;

const Container = styled.div`
  background-color: #e8edf6;
  height: 100vh;
  /* display: grid;
  grid-template-columns: 1fr auto 1fr; */
  display: flex;
  /* gap: 16px; */
  /* justify-content: space-between; */
  padding: 16px;
  width: 100%;
`;

const LeftCell = styled.div`
  display: flex;
  border: 2px solid rebeccapurple;
  /* flex: 1; */
`;

const TextArea = styled.textarea`
  border: none;
  outline: none;
  height: 100%;
  width: 100%;
  resize: none;
`;

const RightCell = styled.div`
  background-color: white;
  border: 2px solid rebeccapurple;
  /* flex: 1; */
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
  width: 8px;
  height: 48px;
  background-color: red;
`;

const ResizerStatePlaceHolder = styled.div`
  display: grid;
  place-content: center;
  background-color: #e8edf6;
  height: 100%;
`;
