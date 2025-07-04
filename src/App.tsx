import { useState } from 'react';
import { Viewer } from './components/Viewer';
import { Frame } from './components/Frame';

const App = () => {
  const pcdFiles = [
    './assets/chicken.pcd',
    './assets/rhino.pcd',
  ];

  const [currentFrame, setCurrentFrame] = useState(0);

  return (
    <div>
      <Viewer fileUrls={pcdFiles} currentFrame={currentFrame} />
      <Frame fileUrls={pcdFiles} setCurrentFrame={setCurrentFrame}/>
    </div>
  );
};

export default App;