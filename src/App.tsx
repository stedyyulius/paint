import { useState } from "react";
import CanvasDraw from "react-canvas-draw";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import './App.css';

import { DragDropContainer } from "./components/DragDropContainer";
import { PaintNavigator } from "./components/PaintNavigator";


interface BoxMap {
	[key: string]: { top: number; left: number; title: string; type: string }
}

function App() {

  const [boxes, setBoxes] = useState<BoxMap>({
		// a: { top: 20, left: 80, title: 'Drag me around', type: 'circle' },
		// b: { top: 180, left: 20, title: 'Drag me too', type: 'triangle' },
	})

  const handleIconClick = (iconName: string) => {

      if (iconName === 'pencil') {
      
      } 

      if (iconName === 'rectangle') {
        const newBoxes = boxes;
        newBoxes[Object.keys(boxes).length] = { top: 20, left: 80, title: 'Drag me around', type: 'rectangle' }
        setBoxes({ ...newBoxes })
      }

      if (iconName === 'triangle') {
    
      } 

      if (iconName === 'circle') {
 
      }

      if (iconName === 'upload') {
       
      }
  }

  return (
    <DndProvider backend={HTML5Backend}>
        <PaintNavigator 
          onIconClick={(iconName: string) => handleIconClick(iconName)} 
        />
        <DragDropContainer snap boxes={boxes} setBoxes={setBoxes} />
        {/* <CanvasDraw
          disabled={!isDraw}
          hideGrid={true}
          imgSrc={uploadedImage}
          brushRadius={1}
          hideInterface={true}
            style={{
              margin: '5% auto',
              border: '2px solid black',
              width: '100%'
            }}
          /> */}
    </DndProvider>
  );
}

export default App;
