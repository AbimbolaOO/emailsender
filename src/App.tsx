import { useState } from 'react';

import { MenuOutlined } from '@ant-design/icons';
import styled from '@emotion/styled';

import MonacoIde from './components/ide/MonacoIde';
import ViewResizer from './components/viewResizer/ViewResizer';
import ViewResizerLeftCell from './components/viewResizer/ViewResizerLeftCell';
import ViewResizerRightCell from './components/viewResizer/ViewResizerRightCell';
import { defaultHtmlValue } from './utils/utils';

function App() {
  const [content, setContent] = useState(defaultHtmlValue);
  const [revealMenu, setRevealMenu] = useState(false);

  const handleOnMenuClick = () => {
    setRevealMenu(!revealMenu);
  };

  return (
    <Container>
      <Header>
        <HamburgerStyle onClick={handleOnMenuClick}>
          <MenuOutlined />
        </HamburgerStyle>
        SendMail
      </Header>
      <Content>
        <MenuContainer className={revealMenu ? 'reveal' : ''}>
          let have it
        </MenuContainer>
        <CodeViewArea className={revealMenu ? 'reveal' : ''}>
          <ViewResizer>
            <ViewResizerLeftCell>
              <MonacoIde
                onChange={(value) => {
                  setContent(value);
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

const Header = styled.div`
  background-color: rebeccapurple;
  height: var(--header-height);

  font-size: 28px;
  display: flex;
  gap: 16px;
  padding-left: 16px;
  align-items: center;
  color: white;
`;

const HamburgerStyle = styled.div`
  cursor: pointer;
`;

const Content = styled.div`
  display: flex;
`;

const MenuContainer = styled.div`
  background-color: rebeccapurple;
  z-index: 1;
  width: var(--menu-width);
  height: calc(100vh - var(--header-height));
  position: absolute;

  transform: translateX(-320px);
  transition-property: transform;
  transition-duration: 0.3s;
  transform-origin: left;

  &.reveal {
    transform: translateX(0px);
  }
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
