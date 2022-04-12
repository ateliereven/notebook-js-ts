import '../scss/TextEditor.scss';
import { useState, useEffect, useRef } from "react";
import MDEditor from "@uiw/react-md-editor";

import { Cell } from '../state';
import { useActions } from '../hooks/use-actions';

interface TextEditorProps {
  cell: Cell
}

const TextEditor: React.FC<TextEditorProps> = ({cell}) => {
    const ref = useRef<HTMLDivElement | null>(null);
    const [editing, setEditing] = useState(false);
    //for dispatching the text the user types-in:
    const { updateCell } = useActions();
useEffect(() => {
    // whenever the user clicks anywhere inside the document the listener function gets called:
const listener = (event: MouseEvent) => {
    // checking if the user clicked inside the MDEditor:
    if (ref.current && event.target && ref.current.contains(event.target as Node /*for avoiding typescript error */)) {
        // if inside the editor simply return:
        return;
    }
setEditing(false);
}
document.addEventListener('click', listener, {capture: true});
return () => {
    document.removeEventListener('click', listener, {capture: true})
}
}, []);
// if editing return the text editor component:
    if (editing) {
        return <div className='text-editor card' ref={ref}>
            <MDEditor value={cell.content} onChange={(v) => updateCell(cell.id, v || '')/*if v is undefined default it to be a string*/} />
        </div>
    }
    // if not editing return the preview version of the component:
return <div className='text-editor card' onClick={() => setEditing(true)}>
    <div className='card-content'>
    <MDEditor.Markdown source={cell.content || 'Click to edit'} />
    </div>
</div>
};

export default TextEditor