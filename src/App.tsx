import CodeCell from "./components/CodeCell";
import TextEditor from "./components/TextEditor";

function App() {

  return (
    <div>
      <TextEditor />
      <CodeCell />
    </div>
  ); // pre tag is used to format the content as code lines
}

export default App;
