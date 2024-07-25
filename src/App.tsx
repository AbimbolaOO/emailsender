import { useState } from 'react';

import MonacoIde from './components/ide/MonacoIde';
import ViewResizer from './components/viewResizer/ViewResizer';
import ViewResizerLeftCell from './components/viewResizer/ViewResizerLeftCell';
import ViewResizerRightCell from './components/viewResizer/ViewResizerRightCell';
import { defaultHtmlValue } from './utils/utils';

function App() {
  const [content, setContent] = useState(defaultHtmlValue);

  return (
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
  );
}

export default App;
