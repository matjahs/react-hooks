// useRef and useEffect: DOM interaction
// http://localhost:3000/isolated/exercise/05.tsx

import * as React from 'react'
// eslint-disable-next-line no-unused-vars
import VanillaTilt from 'vanilla-tilt'

interface VanillaTiltDiv extends HTMLDivElement {
  vanillaTilt: VanillaTilt;
}

function Tilt({children}: any) {
  const tiltRef = React.useRef<VanillaTiltDiv>(null);

  React.useEffect(() => {
    const tiltNode = tiltRef.current;
    if(!tiltNode) {
      return;
    }
    VanillaTilt.init(tiltNode, {
      max: 25,
      speed: 400,
      glare: true,
      "max-glare": 0.5
    });

    return () => tiltNode.vanillaTilt.destroy();
  }, [])

  return (
    <div className="tilt-root" ref={tiltRef}>
      <div className="tilt-child">{children}</div>
    </div>
  )
}

function App() {
  return (
    <Tilt>
      <div className="totally-centered">vanilla-tilt.js</div>
    </Tilt>
  )
}

export default App
