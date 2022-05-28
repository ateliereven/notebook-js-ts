import '../scss/ActionBar.scss';
import { useActions } from '../hooks/use-actions';
import IconButton from './IconButton';
import { useState } from 'react';
import { useTypedSelector } from '../hooks/use-typed-selector';
import { useCumulativeCode } from '../hooks/use-cumulative-code';
import { CellTypes } from '../state/cell';

interface ActionBarProps {
   id: string;
   type: CellTypes;
   content: string;
}

const ActionBar: React.FC<ActionBarProps> = ({ id, type, content }) => {
   //for dispatching user actions:
   const { moveCell, deleteCell, duplicateCell, createBundle } = useActions();
   // for pulling state out of the redux store:
   const languageLoader = useTypedSelector((state) => state.bundles[id]?.loader);
   const cumulativeCode = useCumulativeCode(id);
   // selected coding language loader:
   const [language, setLanguage] = useState(languageLoader !== 'tsx' ? 'jsx' : 'tsx');
   // re-bundle when coding language changes:
   const onLanguageSelect = (loader: 'tsx' | 'jsx') => {
      setLanguage(loader);
      createBundle(id, cumulativeCode, loader);
   }
   // toggle class on mouse hover:
   const [isHovered, setIsHovered] = useState<boolean>(false);

   return <div className='action-bar'>
      {type === 'code' &&
         <div
            className={`language-selector dropdown ${isHovered && 'is-active'}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
         >
            <button className='button is-outlined is-small' aria-haspopup='true' aria-controls='dropdown-menu'>
               <span>Select language</span>
               <span className='icon is-small'>
               <i className='fa fa-angle-down'></i>
               </span>
            </button>
         
         <div className='dropdown-menu' role='menu'>
            <div className='dropdown-content'>
               <a
                  className={`dropdown-item ${language === 'jsx' && `is-active`}`}
                  onClick={() => onLanguageSelect('jsx')}
               >JavaScript
               </a>
               <a
                  className={`dropdown-item ${language === 'tsx' && `is-active`}`}
                  onClick={() => onLanguageSelect('tsx')}
               >TypeScript
               </a>
            </div>
         </div>
      </div>}
      <div className='actions'>
         <IconButton onClick={() => duplicateCell(id, type, content)} icon='fas fa-clone' tooltipText="Duplicate" />
         <IconButton onClick={() => moveCell(id, 'up')} icon='fas fa-arrow-up' tooltipText="Up" />
         <IconButton onClick={() => moveCell(id, 'down')} icon='fas fa-arrow-down' tooltipText="Down" />
         <IconButton onClick={() => deleteCell(id)} icon='fas fa-times' tooltipText="Delete" />
   </div>
      </div>
}

export default ActionBar;