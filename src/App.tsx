import { useEffect, useMemo, useState } from "react";
import CanvasDraw from "react-canvas-draw";

import './App.css';

import { PaintNavigator } from "./components/PaintNavigator";

function App() {

  const [isDraw, setIsDraw] = useState(false);
  const [uploadedImage, setUploadedImage] = useState('');

  useEffect(() => {
    console.log(isDraw)
  }, [isDraw])

  return (
    <div className="App">
      <PaintNavigator 
        onDrawClick={() => setIsDraw(!isDraw)} 
      />
      <CanvasDraw
        disabled={!isDraw}
        hideGrid={true}
        imgSrc={uploadedImage}
        brushRadius={1}
          style={{
            margin: '5% auto',
            border: '2px solid black',
            width: '60%'
          }}
        />
    </div>
  );
}

export default App;
