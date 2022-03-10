import './CodeEditor.css';
import './syntax.css';
import { useRef } from 'react';
import MonacoEditor, {
  EditorDidMount /*a type definition file*/,
} from '@monaco-editor/react';
import prettier from 'prettier';
import parser from 'prettier/parser-babel'; //to parse javascript code
// following packages are for syntax highlighting - will only work if downgrade react-scripts to 4.0.3, and then resolve to the right MonicoEditor version:
// import Highlighter from 'monaco-jsx-highlighter';
// import {parse} from '@babel/parser';
// import traverse from '@babel/traverse';

interface CodeEditorProps {
  initialValue: string;
  onChange(value: string): void; // a function that takes an input type of string and doesnt return anything
}

const CodeEditor: React.FC<CodeEditorProps> = ({ onChange, initialValue }) => {
  const editorRef = useRef<any>();

  //a function to be called when editor is first displayed on the screen:
  const onEditorDidMount: EditorDidMount = (getValue, monacoEditor) => {
    editorRef.current = monacoEditor;
    // getting told if the content is being changed inside the editor in some way:
    monacoEditor.onDidChangeModelContent(() => {
      onChange(getValue()); //getValue is a function that returns a string
    });
    monacoEditor.getModel()?.updateOptions({ tabSize: 2 }); // change tab size to 2 spaces

    //highlight jsx syntax on editor:
    // const highlighter = new Highlighter(
    //   //@ts-ignore
    //   window.monaco,
    //   parse,
    //   traverse,
    //   monacoEditor
    // );
    // highlighter.highLightOnDidChangeModelContent(100); //whenever the content of the editor changes apply syntax highlighting to it
  };

  const onFormatClick = () => {
    // get current value from editor:
    const unformatted = editorRef.current.getModel().getValue();
    // format value with prettier:
    const formatted = prettier
      .format(unformatted, {
        parser: 'babel',
        plugins: [parser],
        useTabs: false,
        semi: true, //add semicolons at the end of line
        singleQuote: true,
      })
      .replace(/\n$/, ''); //remove auto new line at the end
    // set the formatted value back in the editor:
    editorRef.current.setValue(formatted);
  };

  // customizing features of the code editor:
  return (
    <div className="editor-wrapper">
      <button
        className="button button-format is-primary is-small"
        onClick={onFormatClick}
      >
        Format
      </button>
      <MonacoEditor
        editorDidMount={onEditorDidMount}
        value={initialValue}
        theme="dark"
        language="javascript"
        height="500px"
        options={{
          wordWrap: 'on',
          minimap: { enabled: false },
          showUnused: false, //not to fade out unused import statements
          folding: false, //remove extra spacing to save space on the screen
          lineNumbersMinChars: 3,
          fontSize: 16,
          scrollBeyondLastLine: false,
          automaticLayout: true, //allows the user to shrink and grow the editor while maintaining a correct layout
        }}
      />
    </div>
  );
};

export default CodeEditor;
