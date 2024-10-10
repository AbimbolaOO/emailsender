import { useEffect, useRef, useState } from 'react';

import styled from '@emotion/styled';

import MonacoIde from './components/Monaco/MonacoIde';
import ViewResizer from './components/Resizer/ViewResizer';
import ViewResizerLeftCell from './components/Resizer/ViewResizerLeftCell';
import ViewResizerRightCell from './components/Resizer/ViewResizerRightCell';
import {
  SegmentedView,
  SegmentedViewController,
  SegmentedViewData,
} from './components/SegmentedViewController';
import Header from './Header';
import Menu from './Menu';
import {
  defaultHtmlValue,
  readFromIndexDB,
  writeToIndexDB,
} from './utils/utils';

const segmentedViewControllerTitle = [{ title: 'Code' }, { title: 'Preview' }];

function App() {
  const [editorContent, setEditorContent] = useState<string>(defaultHtmlValue);
  const [iframeContent, setIframeContent] = useState<string>(defaultHtmlValue);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [revealMenu, setRevealMenu] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const data = await readFromIndexDB();
      setEditorContent(data || defaultHtmlValue);
      setIframeContent(data || defaultHtmlValue);
    };
    fetchData();
  }, []);

  const handMonacoOnContentChange = (value: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      setIframeContent(value);
      writeToIndexDB('htmlContent', value);
    }, 500);

    setEditorContent(value);
  };

  const handleOnMenuClick = () => {
    setRevealMenu(!revealMenu);
  };

  return (
    <Container>
      <Header onMenuClick={handleOnMenuClick} emailContent={editorContent} />
      <Content>
        <Menu revealMenu={revealMenu} />
        <CodeViewArea className={revealMenu ? 'reveal' : ''}>
          <ViewResizer>
            <ViewResizerLeftCell>
              <MonacoIde
                onChange={(value) => {
                  handMonacoOnContentChange(value);
                }}
                value={editorContent}
              />
            </ViewResizerLeftCell>
            <ViewResizerRightCell>
              <iframe
                title='email renderer'
                frameBorder='0'
                srcDoc={iframeContent}
                sandbox='allow-scripts'
                width='100%'
                height='100%'
              />
            </ViewResizerRightCell>
          </ViewResizer>
        </CodeViewArea>
        <CodeViewAreaTabAndPhones>
          <SegmentedView>
            <SegmentedViewController
              segmentedViewControllerTitle={segmentedViewControllerTitle}
            />
            <SegmentedViewData>
              <div>
                <MonacoIde
                  onChange={(value) => {
                    handMonacoOnContentChange(value);
                  }}
                  value={editorContent}
                />
              </div>
              {/* Iframe area */}
              <div>
                <iframe
                  title='email renderer'
                  frameBorder='0'
                  srcDoc={iframeContent}
                  sandbox='allow-scripts'
                  width='100%'
                  height='100%'
                />
              </div>
            </SegmentedViewData>
          </SegmentedView>
        </CodeViewAreaTabAndPhones>
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

  @media screen and (max-width: 884px) {
    display: none;
  }
`;

const CodeViewAreaTabAndPhones = styled.div`
  display: none;
  @media screen and (max-width: 884px) {
    display: block;
    width: 100%;
    height: calc(100vh - 70px);
    margin: 0 16px;
    /* border: 4px solid rebeccapurple; */
  }
`;
