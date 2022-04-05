import './TextEditor.css';
import { useState, useEffect, useRef } from "react";
import MDEditor from "@uiw/react-md-editor";

const TextEditor: React.FC = () => {
    const ref = useRef<HTMLDivElement | null>(null);
    const [editing, setEditing] = useState(false);
    const [value, setValue] = useState('# Header')
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
        return <div className='text-editor' ref={ref}>
            <MDEditor value={value} onChange={(v) => setValue(v || '')/*if v is undefined default it to be a string*/} />
        </div>
    }
    // if not editing return the preview version of the component:
return <div className='text-editor card' onClick={() => setEditing(true)}>
    <div className='card-content'>
    <MDEditor.Markdown source={value} />
    </div>
</div>
};

export default TextEditor