import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Html, useProgress } from '@react-three/drei';
import Shoe from './models/Shoe'; 
import "./index.css";
import { proxy, useSnapshot } from 'valtio';
import { HexColorPicker } from 'react-colorful';

const Loader = () => {
  const { progress } = useProgress();
  return (
     <Html 
        center
        style={{
           color: '#FFFFFF',
        }}
     >
        {Math.round(progress * 100) / 100}% Loaded
     </Html>
  );
};

const Picker = (props) => {
   const snap = useSnapshot(props.state)
   return (
   <div style={{ display: snap.current ? "block" : "none" }}>
      <HexColorPicker 
         className="picker" 
         color={snap.items[snap.current]} 
         onChange={(color) => (props.state.items[snap.current] = color)} 
      />
      <h1>{snap.current}</h1>
   </div>
   );
};

export default function App() {
   const state = proxy({
      current: null,
      items: {
        laces: "#ff0000",
        mesh: "#ffffff",
        caps: "#ffffff",
        inner: "#ffffff",
        sole: "#ffffff",
        stripes: "#ffffff",
        band: "#ffffff",
        patch: "#ffffff",
      },
   });

   return (
      <>
         <Picker state={state} />
         <Canvas
            camera={{ position: [2, 0, 12.25], fov: 15 }}
            style={{
               backgroundColor: '#111a21',
               width: '70vw',
               height: '60vh',
            }}
         >
            <ambientLight intensity={0.5} />
            <Suspense fallback={<Loader />}>
              <Shoe state={state}/>
            </Suspense>
            <OrbitControls />
         </Canvas>
      </>
   );
};