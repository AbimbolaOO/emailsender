import { useRef, useState } from 'react';

import styled from '@emotion/styled';

import LogoIcon from './components/icons/LogoIcon';
import MonacoIde from './components/ide/MonacoIde';

const defaultHtmlValue = `
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Document</title>
  </head>

  <body>
      <h1>Welcome</h1>
  </body>
</html>
`;

function App() {
  const [content, setContent] = useState(defaultHtmlValue);
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
      <LeftCell
        style={{ width: `calc(${leftWidth}% - ${resizerWidth / 2}px)` }}
      >
        <MonacoIde
          onChange={(value) => {
            setContent(value);
          }}
          value={content}
        />
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
            title="email renderer"
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
  display: flex;
  padding: 16px;
  width: 100%;
`;

const LeftCell = styled.div`
  display: flex;
  border: 2px solid rebeccapurple;
`;

const RightCell = styled.div`
  background-color: white;
  border: 2px solid rebeccapurple;
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
