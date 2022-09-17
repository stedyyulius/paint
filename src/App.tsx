import React, { useState } from "react";
import CanvasDraw from "react-canvas-draw";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import './App.css';

import { BoxMap, DragDropContainer } from "./components/DragDropContainer";
import { PaintNavigator } from "./components/PaintNavigator";

import bucket from './assets/fill-bucket.png';


function App() {
  const [isDraw, setIsDraw] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<undefined | string>(undefined);
  const [boxes, setBoxes] = useState<BoxMap>({})
  const [selectedColor, setSelectedColor] = useState('');
  const [canvasColor, setCanvasColor] = useState('transparent');
  const [selectedIcon, setSelectedIcon] = useState('');

  const createNewBox = (type: string) => {
    const newBoxes = boxes;
    newBoxes[Object.keys(boxes).length] = { top: 20, left: 80, color: 'black', type };
    setBoxes({ ...newBoxes });
  }

  const handleIconClick = (iconName: string, event?: React.ChangeEvent<HTMLInputElement>) => {

      setIsDraw(false);
      setSelectedIcon(iconName);

      if (iconName === 'pencil') {
        setIsDraw(true);
      } 

      if (iconName === 'rectangle') {
        createNewBox('rectangle');
      }

      if (iconName === 'triangle') {
        createNewBox('triangle');
      } 

      if (iconName === 'circle') {
        createNewBox('circle');
      }

      if (iconName === 'color' && event) {
        setSelectedColor(event.target.value);
      }

      if (iconName === 'upload' && event && event.target && event.target.files) {
          let reader = new FileReader();
          let file = event.target.files[0];
      
          reader.onload = (upload: any) => {
              setUploadedImage(upload.target.result);
          };
          reader.readAsDataURL(file);
      }
  }

  const handleDeleteImage = (e: React.KeyboardEvent<HTMLDivElement>) => {

    if (e.code === 'Backspace') {
      setUploadedImage(undefined);
    }
  }

  return (
    <DndProvider backend={HTML5Backend}>
        <PaintNavigator 
          onIconClick={(iconName: string, event?: React.ChangeEvent<HTMLInputElement>) => handleIconClick(iconName, event)}
          selectedColor={selectedColor}
          setSelectedIcon={setSelectedIcon}
          selectedIcon={selectedIcon}
        />
        <div 
        tabIndex={0}
        onClick={() => selectedColor ? setCanvasColor(selectedColor) : null}
        onKeyDown={handleDeleteImage}
        style={{
          cursor: selectedColor && selectedIcon === 'color' ? `url(${bucket}), auto` : '',
        }}
        >
           <DragDropContainer 
           snap 
           boxes={boxes} 
           setBoxes={setBoxes} 
           selectedColor={selectedColor}
           selectedIcon={selectedIcon}          
           />
        </div>
          <CanvasDraw
            disabled={!isDraw}
            hideGrid={true}
            imgSrc={uploadedImage}
            brushRadius={1}
            hideInterface={true}
              style={{
                width: '99.8%',
                zIndex: isDraw ? 3 : 1,
                backgroundColor: canvasColor,
                border: '1px solid black',
                margin:'auto',
                position: 'absolute'
              }}
            />
    </DndProvider>
  );
}

export default App;
