import { useState } from 'react';

import styled from '@emotion/styled';

import MonacoIde from './components/Ide/MonacoIde';
import ViewResizer from './components/ViewResizer/ViewResizer';
import ViewResizerLeftCell from './components/ViewResizer/ViewResizerLeftCell';
import ViewResizerRightCell from './components/ViewResizer/ViewResizerRightCell';
import Header from './Header';
import Menu from './Menu';
import { defaultHtmlValue } from './utils/utils';

function App() {
  const [content, setContent] = useState(defaultHtmlValue);
  const [revealMenu, setRevealMenu] = useState(false);

  const handleOnMenuClick = () => {
    setRevealMenu(!revealMenu);
  };

  const handMonacoOnContentChange = (value: string) => {
    setContent(value);
  };

  return (
    <Container>
      <Header onMenuClick={handleOnMenuClick} emailContent={content} />
      <Content>
        <Menu revealMenu={revealMenu} />
        <CodeViewArea className={revealMenu ? 'reveal' : ''}>
          <ViewResizer>
            <ViewResizerLeftCell>
              <MonacoIde
                onChange={(value) => {
                  handMonacoOnContentChange(value);
                }}
                value={content}
              />
            </ViewResizerLeftCell>
            <ViewResizerRightCell>
              <iframe
                title="email renderer"
                frameBorder="0"
                srcDoc={content}
                sandbox="allow-scripts"
                width="100%"
                height="100%"
              />
            </ViewResizerRightCell>
          </ViewResizer>
        </CodeViewArea>
      </Content>
    </Container>
  );
}

export default App;

const Container = styled.div`
  --header-height: 52px;
  --menu-width: 320px;
  display: flex;
  flex-direction: column;
  height: 100vh;
  /* border: 2px solid red; */

  overflow: hidden;
  overscroll-behavior: contain;
  -webkit-overflow-scrolling: touch;
`;

const Content = styled.div`
  display: flex;
`;

const CodeViewArea = styled.div`
  display: flex;
  width: 100%;
  margin-left: 0;

  transition-property: margin-left;
  transition-duration: 0.3s;

  &.reveal {
    margin-left: var(--menu-width);
  }
`;
