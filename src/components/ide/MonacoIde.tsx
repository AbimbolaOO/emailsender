import React from 'react';

import Editor from '@monaco-editor/react';

interface MonacoProps {
  theme?: string;
  language?: string;
  value?: string;
  width?: number | string;
  height?: number | string;
  defaultValue?: string;
  onChange: (...arg: any) => void;
}

export const MonacoIde: React.FC<MonacoProps> = ({
  language = 'html',
  value,
  defaultValue,
  height,
  width,
  onChange,
}) => {
  return (
    <Editor
      defaultLanguage={language}
      defaultValue={defaultValue}
      value={value}
      height={height}
      width={width}
      // options={options}
      options={{
        // wordWrap: 'on',
        minimap: { enabled: false },
        // showUnused: false,
        // folding: false,
        // lineNumbersMinChars: 3,
        fontFamily: 'Menlo, Consolas, monospace, sans-serif',
        fontSize: 14,
        scrollBeyondLastLine: false,
        automaticLayout: true,
      }}
      onChange={onChange}
    />
  );
};

export default MonacoIde;
