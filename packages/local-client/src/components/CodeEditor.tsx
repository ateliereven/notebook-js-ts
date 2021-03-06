import '../scss/CodeEditor.scss';
import '../scss/syntax.scss';
import { useRef } from 'react';
import MonacoEditor, {
  EditorDidMount /*a type definition file*/,
} from '@monaco-editor/react';
import prettier from 'prettier';
import parser from 'prettier/parser-babel'; //to parse javascript code
// following packages are for syntax highlighting - will only work if downgrade react-scripts to 4.0.3, and then resolve to the right MonicoEditor version, and/or upgrade monaco-jsx-highlighter to v 1 or higher :
//  import Highlighter from 'monaco-jsx-highlighter';
//  import {parse} from '@babel/parser';
//  import traverse from '@babel/traverse';

interface CodeEditorProps {
  initialValue: string;
  onChange(value: string): void;
  editorLanguage: 'javascript' | 'typescript'
}

const CodeEditor: React.FC<CodeEditorProps> = ({ onChange, initialValue, editorLanguage }) => {
  const editorRef = useRef<any>();

  //a function to be called when editor is first displayed on the screen:
  const onEditorDidMount: EditorDidMount = (getValue, monacoEditor) => {
    editorRef.current = monacoEditor;
    // getting told if the content is being changed inside the editor in some way:
    monacoEditor.onDidChangeModelContent(() => {
      onChange(getValue()); //getValue returns a string
    });
    monacoEditor.getModel()?.updateOptions({ tabSize: 2 }); // change tab size to 2 spaces

    //highlight jsx syntax on editor:
  //   const highlighter = new Highlighter(
  //     //@ts-ignore
  //     window.monaco,
  //     parse,
  //     traverse,
  //     monacoEditor
  //   );
  //   highlighter.highLightOnDidChangeModelContent(100, () => { }, () => { }, undefined, () => { });
  //whenever the content of the editor changes apply syntax highlighting to it
  //   highlighter.addJSXCommentCommand();
   };

  
  // formatting cell content:
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

  // clearing cell content
  const onClearClick = () => {
    editorRef.current.setValue('');
  }

  // customizing features of the code editor:
  return (
    <div className="editor-wrapper">
      <button
        className="button button-format is-danger is-rounded is-small is-hovered"
        onClick={onFormatClick}
      >
        Format
      </button>
      <button
        className="button button-format is-primary is-rounded is-small is-hovered"
        onClick={onClearClick}
      >
        Clear
      </button>
      <MonacoEditor
        editorDidMount={onEditorDidMount}
        value={initialValue}
        theme="dark"
        language={editorLanguage}
        height="100%"
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
