import { useTypedSelector } from "./use-typed-selector";

export const useCumulativeCode = (cellId: string) => {
   // a selector for bundling cumulative code from all previous cells - for sharing functions between code cells:
   return useTypedSelector(state => {
      const { data, order } = state.cells;
      const orderedCells = order.map(id => data[id]);
      // a function for showing values on preview window + importing React & ReactDOM to show jsx:
      const showFunc =
         `
        import _React from 'react';
        import _ReactDOM from 'react-dom';
      var show = (value) => {
        const root = document.querySelector('#root');
        if (typeof value === 'object') {
          if (value.$$typeof && value.props) {
            _ReactDOM.render(value, root);
          } else {
            root.innerHTML = JSON.stringify(value);
          }  
        } else {
          root.innerHTML = value;
        }
      };
      `;
      const showFuncNoop = 'var show = () => {}';
      const cumulativeCode = [];
      for (let curCell of orderedCells) {
         if (curCell.type === 'code') {
            // the preview of showFunc will only display in the current code cell, otherwise use the empty showFuncNoop:
            if (curCell.id === cellId) {
               cumulativeCode.push(showFunc);
            } else {
               cumulativeCode.push(showFuncNoop);
            }
            cumulativeCode.push(curCell.content);
         }
         if (curCell.id === cellId) break;
      };
      return cumulativeCode;
   }).join('\n'); //bundle all code strings joined from array with a new line separation
};