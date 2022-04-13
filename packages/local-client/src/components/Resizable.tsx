import '../scss/Resizable.scss';
import { ResizableBox, ResizableBoxProps } from "react-resizable";
import { useEffect, useState } from 'react';

interface ResizableProps {
   direction: 'horizontal' | 'vertical';
}
const Resizable: React.FC<ResizableProps> = ({ direction, children }) => {
   let resizableProps: ResizableBoxProps;
   const [innerHeight, setInnerHeight] = useState(window.innerHeight);
   const [innerWidth, setInnerWidth] = useState(window.innerWidth);
   const [width, setWidth] = useState(window.innerWidth * 0.75);

   // event listener for user resizing of window:
   useEffect(() => {
      // debouncing:
      let timer: any;
      const listener = () => {
         if (timer) {
            clearTimeout(timer);
         }
         timer = setTimeout(() => {
            setInnerHeight(window.innerHeight);
            setInnerWidth(window.innerWidth);
            // to fix issue when user shrinks window and minConstraints are overwritten by width state:
            if (window.innerWidth * 0.75 < width)
               setWidth(window.innerWidth * 0.75);
         }, 100);
      };
      window.addEventListener('resize', listener);
      return () => window.removeEventListener('resize', listener);
   }, [width]);

   if (direction === 'horizontal') {
      resizableProps = {
         className: 'resize-horizontal',
        height: Infinity, //take up as much vertical space as possible
        width: width, //horizontal width of 75% of the browser window width
        resizeHandles: ['e'], // e is for east (right)
        maxConstraints: [innerWidth * 0.85, Infinity],
         minConstraints: [innerWidth * 0.2, Infinity],
        onResizeStop: (event, data) => {setWidth(data.size.width)} // a callback function to update the width state of the ResizableBox child component)
      };
   } else {
      resizableProps = {
         height: 300,
      width: Infinity, //take up as much horizontal space as possible
      resizeHandles: ['s'], // s is for south (bottom)
      maxConstraints: [Infinity, innerHeight * 0.9], //max vertical height of 90% of the browser window height
      minConstraints: [Infinity, 50]
      };
   }
   return <ResizableBox
      {...resizableProps}
   >{children}</ResizableBox>
};

export default Resizable;